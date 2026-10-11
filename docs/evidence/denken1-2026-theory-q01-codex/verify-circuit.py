"""Exact nodal solves of the original graph, independent of the official key."""

from fractions import Fraction as F
import hashlib
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

def solve(edges, fixed):
    nodes = sorted({node for u, v, _, _ in edges for node in (u, v)} - fixed.keys())
    index = {node: i for i, node in enumerate(nodes)}
    matrix = [[F(0) for _ in range(len(nodes) + 1)] for _ in nodes]
    for u, v, resistance, rise in edges:
        g = 1 / resistance
        for a, b, source in ((u, v, rise), (v, u, -rise)):
            if a in fixed:
                continue
            row = matrix[index[a]]
            row[index[a]] += g
            if b in fixed:
                row[-1] += g * fixed[b]
            else:
                row[index[b]] -= g
            row[-1] -= g * source
    for col in range(len(nodes)):
        pivot = next(row for row in range(col, len(nodes)) if matrix[row][col])
        matrix[col], matrix[pivot] = matrix[pivot], matrix[col]
        divisor = matrix[col][col]
        matrix[col] = [value / divisor for value in matrix[col]]
        for row in range(len(nodes)):
            if row != col:
                factor = matrix[row][col]
                matrix[row] = [a - factor * b for a, b in zip(matrix[row], matrix[col])]
    voltage = dict(fixed) | {node: matrix[index[node]][-1] for node in nodes}
    currents = {(u, v): (voltage[u] - voltage[v] + rise) / resistance for u, v, resistance, rise in edges}
    for node in nodes:
        residual = sum(value if u == node else -value if v == node else F(0)
                       for (u, v), value in currents.items())
        assert residual == 0
    return voltage, currents

left_branches = (("a", "h"), ("h", "g"), ("g", "f"), ("f", "e"), ("h", "i"), ("f", "i"))
rows = []
cases = ((2, 3, 5, 1, 24, (7, 11, 13, 17, 19, 23)),
         (5, 2, 7, 3, 15, (2, 3, 5, 7, 11, 13)),
         (3, 7, 2, F(1, 2), 36, (31, 29, 23, 19, 17, 13)),
         (F(3, 2), F(5, 3), F(7, 4), F(2, 3), F(11, 2), (1, 4, 2, 8, 3, 9)))
for r1, r2, r3, lam, emf, left_values in cases:
    r1, r2, r3, lam, emf = map(F, (r1, r2, r3, lam, emf))
    left = [(u, v, F(r), F(0)) for (u, v), r in zip(left_branches, left_values, strict=True)]
    right = [("a", "b", lam * r1, F(0)), ("b", "i", r1, F(0)),
             ("i", "d", r3, F(0)), ("d", "e", lam * r3, F(0)),
             ("b", "c", r2, F(0)), ("c", "d", r2, F(0))]
    _, original = solve(left + right, {"a": emf, "e": F(0)})
    moved = [(u, v, r, emf if (u, v) == ("b", "c") else source) for u, v, r, source in left + right]
    volts, reciprocal = solve(moved, {"a": F(0), "e": F(0)})
    i1 = reciprocal[("a", "b")]
    i2 = reciprocal[("b", "c")]
    i0 = reciprocal[("a", "b")] + reciprocal[("a", "h")]
    assert volts["a"] == volts["e"] == volts["i"] == 0
    assert all(reciprocal[branch] == 0 for branch in left_branches)
    assert original[("b", "c")] == i0 == i1
    assert i2 == (lam + 1) * i1
    assert lam * (r1 + r3) * i1 + 2 * r2 * i2 - emf == 0
    assert lam * (r1 + r3) * i1 + (r1 + r3) * (i1 - i2) == 0
    assert original[("b", "c")] == emf / (lam * (r1 + r3) + 2 * r2 * (lam + 1))
    if lam == 1:
        assert original[("b", "c")] == emf / (r1 + 4 * r2 + r3)
    new_source_checks = []
    for source_branch in left_branches:
        moved_left = [(u, v, r, emf if (u, v) == source_branch else F(0)) for u, v, r, _ in left + right]
        _, final = solve(moved_left, {"a": F(0), "e": F(0)})
        assert final[("b", "c")] == 0
        new_source_checks.append({"branch": list(source_branch), "finalBcCurrent": str(final[("b", "c")])})
    rows.append({"R1": str(r1), "R2": str(r2), "R3": str(r3), "lambda": str(lam), "E": str(emf),
                 "unknownLeftResistors": list(left_values), "originalI2": str(original[("b", "c")]),
                 "reciprocalI0": str(i0), "reciprocalI1": str(i1), "reciprocalI2": str(i2),
                 "leftSourceChecks": new_source_checks, "kirchhoffResidual": "0"})

result = {"method": "Exact Fraction nodal solves using all 12 resistor edges, not the official answer labels",
          "sourceRiseConvention": "(Vu - Vv + E)/R for a source that raises potential along u to v",
          "cases": rows, "ordinarySourceCircuitSolves": 8, "leftSourceCircuitSolves": 24,
          "totalIndependentSolves": 32, "officialKeyWasNotInput": True, "allPass": True,
          "symbolicDerivation": ["S = R1 + R3", "I2' = (lambda + 1) I1'", "I0' = I1'",
                                 "I2 = E / [lambda S + 2 R2 (lambda + 1)]",
                                 "lambda = 1: I2 = E / (R1 + 4 R2 + R3)",
                                 "Every original left branch has zero transfer current, hence I2'' = 0"],
          "limits": "Finite exact solves corroborate the written algebra; they are not an independent publication verdict."}
out = HERE / "INDEPENDENT-NODAL-CALCULATION.json"
out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"solves": 32, "pass": True, "sha256": hashlib.sha256(out.read_bytes()).hexdigest()}))
