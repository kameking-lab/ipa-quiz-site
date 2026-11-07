import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
export function assertListenerOwner(port, pid) {
  assert.ok(Number.isInteger(Number(port)) && Number(port) >= 1024 && Number(port) <= 65535);
  if (process.platform !== 'win32') throw new Error('This local attestation currently supports Windows only');
  const raw = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', `(Get-NetTCPConnection -State Listen -LocalPort ${Number(port)} -ErrorAction SilentlyContinue).OwningProcess | Sort-Object -Unique | ConvertTo-Json -Compress`], { encoding: 'utf8', windowsHide: true }).trim();
  const owners = raw ? [JSON.parse(raw)].flat() : [];
  assert.deepEqual(owners, [pid], 'Measured listener must belong to the isolated production server');
}
