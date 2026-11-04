"""Run the exact production Lua using lupa; Redis commands are a local fake.

Requires Python + lupa. No network, Redis server, credentials or database.
This validates Lua execution/ordering, not an Upstash deployment's configuration.
"""
from pathlib import Path
import re
from lupa import LuaRuntime

source = (Path(__file__).resolve().parents[2] / 'lib/ai/cost-guard.ts').read_text(encoding='utf8')
scripts = {name: re.search(r'export const ' + name + r' = `([\s\S]*?)`;', source)[1]
           for name in ('RESERVE_COST_LUA', 'SETTLE_COST_LUA')}
store = {}
writes = []

def command(name, *args):
    if name == 'GET':
        value = store.get(args[0])
        if isinstance(value, dict): raise RuntimeError('WRONGTYPE')
        return value
    if name == 'EXISTS': return int(args[0] in store)
    writes.append((name, args))
    if name == 'INCRBYFLOAT':
        store[args[0]] = str(float(store.get(args[0], 0)) + float(args[1]))
        return store[args[0]]
    if name == 'SET': store[args[0]] = str(args[1]); return 'OK'
    if name == 'EXPIRE': return 1
    if name == 'DEL': store.pop(args[0], None); return 1
    raise RuntimeError('Unexpected Redis command')

def fail(message): raise RuntimeError(message)
lua = LuaRuntime(unpack_returned_tuples=True)
lua.globals().redis = lua.table_from({'call': command, 'error_reply': fail})

def run(name, month='ai_cost:old-month', receipt='receipt', amount=6):
    lua.globals().KEYS = lua.table_from([month, receipt])
    lua.globals().ARGV = lua.table_from([str(amount), '50000', '6048000'])
    return lua.execute(scripts[name])

store['ai_cost:old-month'] = '49990'
admissions = [run('RESERVE_COST_LUA', receipt=f'receipt-{i}')[1] for i in range(20)]
assert sum(admissions) == 1 and float(store['ai_cost:old-month']) == 49996
run('SETTLE_COST_LUA', receipt='receipt-0', amount=.06)
once = store.copy()
run('SETTLE_COST_LUA', receipt='receipt-0', amount=.06)
assert store == once and abs(float(store['ai_cost:old-month']) - 49990.06) < .00001

# Month rollover: the admitted request settles its captured month, never the new bucket.
store['ai_cost:new-month'] = '0'
run('RESERVE_COST_LUA', receipt='old-flight', amount=2)
run('SETTLE_COST_LUA', receipt='old-flight', amount=1)
assert store['ai_cost:new-month'] == '0'

# An ambiguous settlement/outage sends no commands: retained reservation remains charged.
run('RESERVE_COST_LUA', month='outage', receipt='lost-ack', amount=6)
assert float(store['outage']) == 6
run('SETTLE_COST_LUA', month='outage', receipt='lost-ack', amount=2)
run('SETTLE_COST_LUA', month='outage', receipt='lost-ack', amount=2)
assert float(store['outage']) == 2

for invalid in ('corrupt', '-1', 'NaN', 'inf', {}):
    store['bad'] = invalid
    before = len(writes)
    try: run('RESERVE_COST_LUA', month='bad', receipt='bad-receipt')
    except Exception: pass
    else: raise AssertionError('Invalid counter was accepted')
    assert len(writes) == before and 'bad-receipt' not in store

print('PASS: exact Lua admission, duplicate settlement, month rollover, retained reservations and corrupt-state rejection')
