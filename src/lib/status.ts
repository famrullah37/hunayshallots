// Processing status shared by quote requests (Inquiry) and retail orders (Order).
export const STATUSES = [
  { value: "new", label: "Baru", className: "bg-red-100 text-red-700" },
  { value: "processing", label: "Diproses", className: "bg-amber-100 text-amber-700" },
  { value: "done", label: "Selesai", className: "bg-green-100 text-green-700" },
] as const;

export type Status = (typeof STATUSES)[number]["value"];

export function isStatus(value: string): value is Status {
  return STATUSES.some((s) => s.value === value);
}
