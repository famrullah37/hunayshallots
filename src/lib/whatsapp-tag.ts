import { WA_NUMBER } from "@/lib/contact";

const SOURCE = "Hello, I found Hunay on hunayshallots.com";
const GREETING = `${SOURCE} and would like to ask about your products.`;

// Marks WhatsApp chats that start from this website so the admin knows where the
// customer came from. A link without a message gets GREETING; a link that already
// carries a message (cart order, quote request) gets the source line on top. Links
// to other numbers (e.g. admin pages linking to a customer) are returned unchanged.
export function tagWhatsAppHref(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  const host = url.hostname.replace(/^www\./, "");
  const toAdmin =
    (host === "wa.me" && url.pathname.replace(/\//g, "") === WA_NUMBER) ||
    (host === "api.whatsapp.com" && url.searchParams.get("phone") === WA_NUMBER);
  if (!toAdmin) return href;

  const text = (url.searchParams.get("text") ?? "").trim();
  if (text.startsWith(SOURCE)) return href; // already tagged (persistent link clicked twice)

  url.searchParams.delete("text");
  const sep = url.search ? "&" : "?";
  const message = text ? `${SOURCE}.\n${text}` : GREETING;
  return `${url.toString()}${sep}text=${encodeURIComponent(message)}`;
}
