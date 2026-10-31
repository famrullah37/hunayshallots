import { Mail, MessageCircle, Clock } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import SectionHeading from "@/components/SectionHeading";
import { CONTACT_EMAIL, WA_DISPLAY, WA_NUMBER } from "@/lib/contact";

const waText = encodeURIComponent(
  "Hello Hunay, I'm interested in importing your products.\nCompany:\nCountry:\nProduct:\nEstimated volume (kg/month):"
);

export default function QuotationSection() {
  return (
    <section id="quotation" className="scroll-mt-24 bg-[#f5f1e8] py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Request a quotation"
            title="Get Pricing for"
            highlight="Your Market"
            subtitle="For importers, distributors and food businesses. Tell us your product, volume and destination — we reply with a quotation."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8 lg:col-span-2">
              <InquiryForm sourcePage="home" />
            </div>

            <aside className="space-y-4">
              <div className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <Clock className="shrink-0 text-forest-green" />
                <p className="text-gray-700">Reply by email within <strong>1–2 working days</strong>.</p>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <Mail className="shrink-0 text-forest-green" />
                <span className="break-all text-gray-700">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${waText}&type=phone_number`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <MessageCircle className="shrink-0 text-forest-green" />
                <span className="text-gray-700">WhatsApp {WA_DISPLAY}</span>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
