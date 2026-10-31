// Processing status shared by quote requests (Inquiry) and retail orders (Order).
export const STATUSES = [
  { value: "new", label: "Baru", className: "bg-red-100 text-red-700" },
  { value: "processing", label: "Diproses", className: "bg-amber-100 text-amber-700" },
  { value: "done", label: "Selesai", className: "bg-green-100 text-green-700" },
] as const;

export type Status = (typeof STATUSES)[number]["value"];

// Statuses used by bawanghunay.com orders — kept as-is so both admins stay in sync.
export const LOCAL_STATUSES = [
  { value: "baru", label: "Baru", className: "bg-red-100 text-red-700" },
  { value: "dikonfirmasi", label: "Dikonfirmasi", className: "bg-blue-100 text-blue-700" },
  { value: "dikirim", label: "Dikirim", className: "bg-purple-100 text-purple-700" },
  { value: "selesai", label: "Selesai", className: "bg-green-100 text-green-700" },
  { value: "batal", label: "Batal", className: "bg-gray-200 text-gray-600" },
] as const;

export type StatusOption = { value: string; label: string; className: string };

export function isStatus(value: string): value is Status {
  return STATUSES.some((s) => s.value === value);
}
