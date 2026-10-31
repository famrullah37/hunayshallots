// Client for bawanghunay.com's internal orders API (Indonesian retail site, separate
// codebase and JSON storage). Lets the production team process orders from both
// sites in /admin/orders. Reached over the shared Docker network, e.g.
// BAWANGHUNAY_API_URL=http://Bawanghunay_web:3001, with the same key as its INTERNAL_API_KEY.

const API_URL = process.env.BAWANGHUNAY_API_URL;
const API_KEY = process.env.BAWANGHUNAY_API_KEY;

export type LocalOrder = {
  id: string;
  createdAt: string;
  status: string;
  handledBy?: string;
  customer?: { name?: string; phone?: string; city?: string; zone?: string };
  items?: { productName: string; qty: number; price: number }[];
  courier?: string;
  shippingCost?: number;
  shippingEstimate?: string;
  paymentMethod?: string;
  total?: number;
};

export const isLocalOrdersEnabled = Boolean(API_URL && API_KEY);

function request(init?: RequestInit) {
  return fetch(`${API_URL}/api/internal/orders`, {
    ...init,
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
}

/** null = not configured or unreachable (the page shows a warning instead of failing). */
export async function fetchLocalOrders(): Promise<LocalOrder[] | null> {
  if (!isLocalOrdersEnabled) return null;
  try {
    const res = await request();
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export async function setLocalOrderStatus(id: string, status: string, handledBy: string): Promise<boolean> {
  if (!isLocalOrdersEnabled) return false;
  try {
    const res = await request({ method: "PATCH", body: JSON.stringify({ id, status, handledBy }) });
    return res.ok;
  } catch {
    return false;
  }
}
