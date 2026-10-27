import nodemailer from "nodemailer";

// Gmail SMTP needs an App Password (Google Account → Security → 2-Step Verification → App passwords),
// not the normal account password. Without SMTP_USER/SMTP_PASS, mail is skipped silently.
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const NOTIFY_TO = process.env.INQUIRY_NOTIFY_TO || SMTP_USER;

const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (Number(process.env.SMTP_PORT) || 465) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export type InquiryMail = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  volume: string;
  packaging: string;
  message: string;
  sourcePage: string;
};

export async function sendInquiryNotification(q: InquiryMail): Promise<void> {
  if (!transporter || !NOTIFY_TO) return;

  const rows: [string, string][] = [
    ["Name", q.name],
    ["Company", q.company],
    ["Email", q.email],
    ["Phone / WhatsApp", q.phone],
    ["Country", q.country],
    ["Product", q.product],
    ["Volume", q.volume],
    ["Packaging", q.packaging],
    ["Source page", q.sourcePage],
  ];
  const filled = rows.filter(([, v]) => v);

  const text = [
    ...filled.map(([k, v]) => `${k}: ${v}`),
    "",
    q.message || "(no message)",
    "",
    "Reply to this email to answer the buyer directly.",
  ].join("\n");

  const html = `
    <h2 style="margin:0 0 12px">New RFQ from ${escapeHtml(q.company)} (${escapeHtml(q.country)})</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${filled
        .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td><b>${escapeHtml(v)}</b></td></tr>`)
        .join("")}
    </table>
    <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;border-left:3px solid #ddd;padding-left:12px">${escapeHtml(q.message || "(no message)")}</p>
    <p style="color:#888;font-family:sans-serif;font-size:12px">Reply to this email to answer the buyer directly.</p>`;

  await transporter.sendMail({
    from: `"Hunay RFQ" <${SMTP_USER}>`,
    to: NOTIFY_TO,
    replyTo: `"${q.name.replace(/"/g, "")}" <${q.email}>`,
    subject: `[RFQ] ${q.product} — ${q.company}, ${q.country}`,
    text,
    html,
  });
}
