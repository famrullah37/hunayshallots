"use client";

import { useTransition } from "react";
import { STATUSES } from "@/lib/status";

export default function StatusSelect({
  status,
  handledBy,
  onChange,
}: {
  status: string;
  handledBy: string | null;
  onChange: (status: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const current = STATUSES.find((s) => s.value === status) ?? STATUSES[0];

  return (
    <div className="flex items-center gap-2 text-xs">
      <select
        value={current.value}
        disabled={pending}
        onChange={(e) => startTransition(() => onChange(e.target.value))}
        className={`rounded-full px-3 py-1 font-semibold border-0 cursor-pointer disabled:opacity-60 ${current.className}`}
        aria-label="Status"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {handledBy && status !== "new" && <span className="text-gray-400">oleh {handledBy}</span>}
    </div>
  );
}
