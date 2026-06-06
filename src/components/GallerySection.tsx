"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


interface GalleryVideoData {
  slot: number;
  titleId: string;
  titleEn: string;
  videoUrl: string | null;
}

export default function GallerySection({ galleryVideos }: { galleryVideos?: GalleryVideoData[] }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const videos = (galleryVideos ?? []).map((v) => ({
    id: v.slot,
    title: language === "id" ? v.titleId : v.titleEn,
    titleKey: TITLE_KEYS[v.slot - 1],
    videoUrl: v.videoUrl,
  })).filter((v) => v.videoUrl);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("gallery.title")}{" "}
              <span className="text-forest-green">
                {t("gallery.titleHighlight")}
              </span>
            </h2>
            <div className="h-1 w-24 bg-golden-yellow rounded-full mx-auto mb-4"></div>
            <p className="mx-auto max-w-2xl text-gray-600">
              {t("gallery.subtitle")}
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedVideo(video.videoUrl!)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  <video
                    src={video.videoUrl!}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play
                        className="w-8 h-8 text-forest-green"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal/Lightbox */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-8 h-8 text-white" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              className="w-full h-full rounded-lg"
              controls
              autoPlay
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
