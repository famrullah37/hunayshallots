"use client";

import { useEffect } from "react";
import { tagWhatsAppHref } from "@/lib/whatsapp-tag";

// Site-wide: tags every WhatsApp link to the admin number at click time, so links
// in components and in blog article markdown are all covered without editing each one.
export default function WhatsAppSourceTag() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const tagged = tagWhatsAppHref(a.href);
      if (tagged !== a.href) a.href = tagged;
    };
    // Capture phase, and auxclick for middle-click / open in new tab.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
