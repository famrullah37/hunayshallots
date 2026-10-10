"use client";

import { useActionState, useEffect } from "react";
import { submitInquiry, type InquiryState } from "@/actions/inquiry";

export type InquiryLabels = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  productOptions: string[];
  volume: string;
  packaging: string;
  packagingOptions: string[];
  message: string;
  submit: string;
  sending: string;
  success: string;
  errors: { missing: string; email: string; rate: string; server: string };
  required: string;
};

export const INQUIRY_LABELS_EN: InquiryLabels = {
  name: "Your name",
  company: "Company",
  email: "Business email",
  phone: "Phone / WhatsApp (optional)",
  country: "Destination country",
  product: "Product",
  productOptions: ["Fried shallots", "Fried garlic", "Both", "Private label / OEM"],
  volume: "Estimated volume (e.g. 200 kg / month)",
  packaging: "Packaging",
  packagingOptions: ["Retail packs", "Bulk", "Private label", "Not sure yet"],
  message: "Message (optional)",
  submit: "Send inquiry",
  sending: "Sending…",
  success: "Thank you — we received your inquiry and will reply by email within 1–2 working days.",
  errors: {
    missing: "Please fill in all required fields.",
    email: "Please enter a valid email address.",
    rate: "Too many requests. Please try again later or contact us by email.",
    server: "Something went wrong. Please email us directly.",
  },
  required: "required",
};

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

const field =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest-green/40";

export default function InquiryForm({
  labels = INQUIRY_LABELS_EN,
  sourcePage,
}: {
  labels?: InquiryLabels;
  sourcePage: string;
}) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { ok: false });

  useEffect(() => {
    if (state.ok) window.umami?.track("rfq_submitted", { page: sourcePage });
  }, [state.ok, sourcePage]);

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-green-900" role="status">
        {labels.success}
      </div>
    );
  }

  const req = <span className="text-red-500" aria-label={labels.required}>*</span>;

  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
      <input type="hidden" name="sourcePage" value={sourcePage} />
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.name} {req}</span>
        <input name="name" required className={field} autoComplete="name" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.company} {req}</span>
        <input name="company" required className={field} autoComplete="organization" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.email} {req}</span>
        <input name="email" type="email" required className={field} autoComplete="email" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.phone}</span>
        <input name="phone" type="tel" className={field} autoComplete="tel" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.country} {req}</span>
        <input name="country" required className={field} autoComplete="country-name" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.product} {req}</span>
        <select name="product" required className={field} defaultValue={labels.productOptions[0]}>
          {labels.productOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.volume}</span>
        <input name="volume" className={field} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-700">{labels.packaging}</span>
        <select name="packaging" className={field} defaultValue={labels.packagingOptions[0]}>
          {labels.packagingOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">{labels.message}</span>
        <textarea name="message" rows={4} className={field} />
      </label>

      {state.error && (
        <p className="md:col-span-2 text-sm text-red-600" role="alert">
          {labels.errors[state.error as keyof InquiryLabels["errors"]] ?? labels.errors.server}
        </p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-forest-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition disabled:opacity-60"
        >
          {pending ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
