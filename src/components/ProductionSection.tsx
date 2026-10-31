"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface GalleryVideoData {
  slot: number;
  titleId: string;
  titleEn: string;
  videoUrl: string | null;
}

// TODO(Hunay): confirm these steps with the production team.
const STEPS = [
  { title: "Sourcing", desc: "Biru lancor shallots bought directly from Probolinggo partner farmers and sorted on arrival." },
  { title: "Peeling & Slicing", desc: "Shallots are peeled, washed and sliced evenly for a uniform fry." },
  { title: "Frying", desc: "Fried in coconut oil until golden and crispy — no flour, no preservatives." },
  { title: "Draining & Cooling", desc: "Excess oil is drained and the product cooled before handling." },
  { title: "QC & Packing", desc: "Checked for color and crispness, then vacuum packed in retail, bulk or private-label packaging." },
];

export default function ProductionSection({ galleryVideos }: { galleryVideos?: GalleryVideoData[] }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = (galleryVideos ?? []).filter((v) => v.videoUrl);

  return (
    <section id="produksi" className="relative overflow-hidden bg-[#fefdfb] py-20">
      <div className="pattern-dots absolute inset-0"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our production process"
            title="From Farm to"
            highlight="Finished Goods"
            subtitle="Real footage from our facility in Dringu, Probolinggo."
          />

          <ol className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-[#e8dcc4] bg-white p-6 pt-10 shadow-md">
                <span className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-forest-green font-bold text-white shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </li>
            ))}
          </ol>

          {videos.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <button
                  key={video.slot}
                  type="button"
                  onClick={() => setSelectedVideo(video.videoUrl)}
                  className="group relative overflow-hidden rounded-2xl text-left shadow-lg transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative aspect-video bg-gray-200">
                    <video src={video.videoUrl!} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 group-hover:bg-black/60">
                      <div className="rounded-full bg-white/90 p-4 transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-forest-green" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{video.titleEn}</h3>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
          >
            <X className="h-8 w-8 text-white" />
          </button>
          <div className="relative aspect-video w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <video src={selectedVideo} className="h-full w-full rounded-lg" controls autoPlay />
          </div>
        </div>
      )}
    </section>
  );
}
