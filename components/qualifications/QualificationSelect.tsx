"use client";

import { useState } from "react";
import { groupQualifications, qualificationDisplayKey, qualificationGroupKey, qualificationGroupLabel } from "@/lib/qualifications/groups";

type Option = { key: string; name: string; count?: number };

export function QualificationSelect({ items, value, onChange, label, emptyLabel, className, fieldClass }: {
  items: readonly Option[];
  value: string;
  onChange: (exam: string) => void;
  label: string;
  emptyLabel: string;
  className?: string;
  fieldClass: string;
}) {
  const [pendingGroup, setPendingGroup] = useState("");
  const rows = groupQualifications(items, item => item.key);
  const missingValue = value && !items.some(item => item.key === value);
  const groupValue = value ? missingValue ? value : qualificationDisplayKey(value) : pendingGroup;
  const groupRow = rows.find(row => "group" in row && qualificationGroupKey(row.group.slug) === groupValue);
  return <div className={className}>
    <label className="block min-w-0">
      {label}
      <select value={groupValue} className={fieldClass} onChange={event => {
        const key = event.target.value;
        const isGroup = rows.some(row => "group" in row && qualificationGroupKey(row.group.slug) === key);
        setPendingGroup(isGroup ? key : "");
        onChange(isGroup ? "" : key);
      }}>
        <option value="">{emptyLabel}</option>
        {missingValue && <option value={groupValue}>{value}</option>}
        {rows.map(row => "group" in row
          ? <option key={qualificationGroupKey(row.group.slug)} value={qualificationGroupKey(row.group.slug)}>{qualificationGroupLabel(row.group, row.children.length)}</option>
          : <option key={row.item.key} value={row.item.key}>{row.item.name}{row.item.count === undefined ? "" : ` (${row.item.count})`}</option>)}
      </select>
    </label>
    {groupRow && "group" in groupRow && <label className="mt-2 block min-w-0">
      {groupRow.group.selectLabel}
      <select value={value} className={fieldClass} onChange={event => {
        setPendingGroup(event.target.value ? "" : groupValue);
        onChange(event.target.value);
      }}>
        <option value="">{groupRow.group.selectLabel}を選ぶ</option>
        {groupRow.children.map(({ item, label }) => <option key={item.key} value={item.key}>{label}{item.count === undefined ? "" : ` (${item.count})`}</option>)}
      </select>
    </label>}
  </div>;
}
