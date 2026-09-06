// Shared currency helpers. Product/shipping prices are stored in IDR (the
// currency Hunay actually settles in); the USD figure shown to international
// visitors is a display-only conversion using the admin-configured rate.
export const DEFAULT_USD_RATE = 15800;

export function formatIDR(amountIdr: number): string {
  return `Rp ${Math.round(amountIdr).toLocaleString("id-ID")}`;
}

export function formatUSD(amountIdr: number, usdRate: number): string {
  return `$${(amountIdr / usdRate).toFixed(2)}`;
}

/** Format an IDR amount for display: Rupiah for `id`, USD (converted) for `en`. */
export function formatPrice(amountIdr: number, language: "id" | "en", usdRate: number): string {
  return language === "id" ? formatIDR(amountIdr) : formatUSD(amountIdr, usdRate);
}

/** Both currencies together, e.g. for the WhatsApp order message admins read. */
export function formatDual(amountIdr: number, language: "id" | "en", usdRate: number): string {
  return language === "id"
    ? formatIDR(amountIdr)
    : `${formatUSD(amountIdr, usdRate)} (${formatIDR(amountIdr)})`;
}
