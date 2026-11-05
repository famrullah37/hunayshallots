"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { CERTIFICATE_DOCUMENTS, type CertificateDocument } from "@/lib/company";

// Certificates are shown as watermarked previews. The images are painted as CSS
// backgrounds under a transparent shield (no <img>, so no "Save image as"), right
// click / drag / long-press / print / Ctrl+S are blocked, and the viewer blanks
// itself when the window loses focus (e.g. a snipping tool opening).
// None of this can stop a phone camera — the watermark burned into the pixels is
// what actually protects the documents.

type Labels = { view: string; close: string; page: string; note: string };

const DEFAULT_LABELS: Labels = {
  view: "View certificate",
  close: "Close",
  page: "Page",
  note: "Watermarked preview. Official copies are sent to buyers with quotations.",
};

const src = (slug: string, page: number, thumb = false) =>
  `/certificates/${slug}-${page}${thumb ? "-thumb" : ""}.webp`;

const block = (e: React.SyntheticEvent) => e.preventDefault();

const protectedProps = {
  onContextMenu: block,
  onDragStart: block,
  onCopy: block,
  style: { WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" } as React.CSSProperties,
};

export default function CertificateGallery({
  labels = DEFAULT_LABELS,
  compact = false,
}: {
  labels?: Partial<Labels>;
  compact?: boolean;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };
  const [open, setOpen] = useState<CertificateDocument | null>(null);
  const [page, setPage] = useState(1);
  const [hidden, setHidden] = useState(false);

  const close = useCallback(() => {
    setOpen(null);
    setPage(1);
  }, []);

  useEffect(() => {
    if (!open) return;

    const hide = () => setHidden(true);
    const show = () => setHidden(false);
    const onVisibility = () => (document.hidden ? hide() : show());

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setPage((p) => Math.min(open.pages, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      // save / print / view-source / devtools shortcuts
      if ((e.ctrlKey || e.metaKey) && ["s", "p", "u"].includes(k)) e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c", "s"].includes(k)) e.preventDefault();
      if (e.key === "F12") e.preventDefault();
      // Win+Shift+S / Cmd+Shift+3/4/5: blank the viewer before the capture
      if (e.shiftKey && (e.metaKey || k === "meta")) hide();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        hide();
        navigator.clipboard?.writeText("").catch(() => {});
        setTimeout(show, 1500);
      }
    };

    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.body.style.overflow = prevOverflow;
      setHidden(false);
    };
  }, [open, close]);

  return (
    <div className="cert-protected" {...protectedProps}>
      <div className={compact ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" : "grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"}>
        {CERTIFICATE_DOCUMENTS.map((doc) => (
          <button
            key={doc.slug}
            type="button"
            onClick={() => setOpen(doc)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
            aria-label={`${t.view}: ${doc.name}`}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
              <div
                role="img"
                aria-label={`${doc.name} certificate — CV. Dua Putri Sholehah`}
                className="absolute inset-0 bg-contain bg-center bg-no-repeat transition group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${src(doc.slug, 1, true)})` }}
              />
              <div className="absolute inset-0" />
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                <ZoomIn size={14} /> {t.view}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 p-3">
              <span className="font-bold leading-tight text-gray-900">{doc.name}</span>
              <span className="text-xs text-gray-500">{doc.issuer}</span>
              <span className="mt-auto pt-1 font-mono text-[11px] text-gray-400">{doc.number}</span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="truncate font-semibold">{open.name}</p>
              <p className="truncate text-xs text-white/60">{t.note}</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-full bg-white/10 p-2 hover:bg-white/20"
              aria-label={t.close}
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            <div
              className="absolute inset-0 mx-4 mb-4 bg-contain bg-center bg-no-repeat transition-[filter] duration-150"
              style={{
                backgroundImage: `url(${src(open.slug, page)})`,
                filter: hidden ? "blur(28px) brightness(0.4)" : "none",
              }}
            />
            {/* transparent shield: whatever is right-clicked or dragged is this empty div */}
            <div className="absolute inset-0" />

            {open.pages > 1 && (
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-full bg-white/90 p-2 text-gray-900 shadow disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                  {t.page} {page} / {open.pages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(open.pages, p + 1))}
                  disabled={page === open.pages}
                  className="rounded-full bg-white/90 p-2 text-gray-900 shadow disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
