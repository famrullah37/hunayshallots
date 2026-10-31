"use client";

import { useTransition } from "react";
import { STATUSES, type StatusOption } from "@/lib/status";

export default function StatusSelect({
  status,
  handledBy,
  onChange,
  options = STATUSES,
}: {
  status: string;
  handledBy: string | null;
  onChange: (status: string) => Promise<void>;
  options?: readonly StatusOption[];
}) {
  const [pending, startTransition] = useTransition();
  const current = options.find((s) => s.value === status) ?? options[0];

  return (
    <div className="flex items-center gap-2 text-xs">
      <select
        value={current.value}
        disabled={pending}
        onChange={(e) => startTransition(() => onChange(e.target.value))}
        className={`rounded-full px-3 py-1 font-semibold border-0 cursor-pointer disabled:opacity-60 ${current.className}`}
        aria-label="Status"
      >
        {options.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {handledBy && status !== options[0].value && <span className="text-gray-400">oleh {handledBy}</span>}
    </div>
  );
}
