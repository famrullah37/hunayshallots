"use client";

import { useState, useRef } from "react";
import { Upload, Trash2, CheckCircle, AlertCircle, Film, Check } from "lucide-react";
import { updateGalleryVideo, updateGalleryVideoTitle, getVideoUploadSignature } from "@/actions/videos";

interface Video {
  slot: number;
  titleId: string;
  titleEn: string;
  videoUrl: string | null;
}

interface UploadState {
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
}

export default function VideoManager({ initialVideos }: { initialVideos: Video[] }) {
  const [videos, setVideos] = useState(initialVideos);
  const [uploads, setUploads] = useState<Record<number, UploadState>>({});
  const [titleSaved, setTitleSaved] = useState<Record<number, boolean>>({});
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const setUpload = (slot: number, state: Partial<UploadState>) =>
    setUploads((prev) => ({ ...prev, [slot]: { ...prev[slot] ?? { progress: 0, status: "idle" }, ...state } }));

  function handleTitleChange(slot: number, field: "titleId" | "titleEn", value: string) {
    setVideos((prev) => prev.map((v) => (v.slot === slot ? { ...v, [field]: value } : v)));
    setTitleSaved((prev) => ({ ...prev, [slot]: false }));
  }

  async function handleTitleSave(slot: number) {
    const video = videos.find((v) => v.slot === slot);
    if (!video) return;
    await updateGalleryVideoTitle(slot, video.titleId, video.titleEn);
    setTitleSaved((prev) => ({ ...prev, [slot]: true }));
  }

  async function handleFile(slot: number, file: File) {
    if (!file.type.startsWith("video/")) {
      setUpload(slot, { status: "error", error: "File harus berformat video (mp4, mov, webm)" });
      return;
    }
    if (file.size > 500_000_000) {
      setUpload(slot, { status: "error", error: "Ukuran file maksimal 500 MB" });
      return;
    }

    setUpload(slot, { status: "uploading", progress: 0, error: undefined });

    try {
      const sig = await getVideoUploadSignature(slot);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sig.apiKey);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("signature", sig.signature);
      formData.append("public_id", sig.publicId);
      formData.append("overwrite", "true");
      formData.append("folder", "hunay/videos");

      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUpload(slot, { progress: Math.round((e.loaded / e.total) * 100) });
          }
        };
        xhr.onload = () => {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status === 200) resolve(res.secure_url);
          else reject(new Error(res.error?.message ?? "Upload gagal"));
        };
        xhr.onerror = () => reject(new Error("Koneksi terputus"));
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`);
        xhr.send(formData);
      });

      await updateGalleryVideo(slot, url);
      setVideos((prev) => prev.map((v) => (v.slot === slot ? { ...v, videoUrl: url } : v)));
      setUpload(slot, { status: "success", progress: 100 });
    } catch (err) {
      setUpload(slot, { status: "error", error: err instanceof Error ? err.message : "Upload gagal" });
    }
  }

  async function handleDelete(slot: number) {
    if (!confirm("Hapus video ini?")) return;
    await updateGalleryVideo(slot, null);
    setVideos((prev) => prev.map((v) => (v.slot === slot ? { ...v, videoUrl: null } : v)));
    setUpload(slot, { status: "idle", progress: 0 });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        const up = uploads[video.slot] ?? { status: "idle", progress: 0 };
        const isUploading = up.status === "uploading";

        return (
          <div key={video.slot} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Thumbnail / Preview */}
            <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
              {video.videoUrl ? (
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Film className="w-10 h-10" />
                  <span className="text-sm">Belum ada video</span>
                </div>
              )}

              {/* Upload progress overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-3/4 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${up.progress}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{up.progress}%</span>
                </div>
              )}

              {/* Slot badge */}
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
                Video {video.slot}
              </div>
            </div>

            {/* Info & Actions */}
            <div className="p-4 space-y-3">
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={video.titleId}
                  onChange={(e) => handleTitleChange(video.slot, "titleId", e.target.value)}
                  placeholder="Judul (Indonesia)"
                  className="w-full font-semibold text-gray-900 text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={video.titleEn}
                  onChange={(e) => handleTitleChange(video.slot, "titleEn", e.target.value)}
                  placeholder="Title (English)"
                  className="w-full text-gray-500 text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => handleTitleSave(video.slot)}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  {titleSaved[video.slot] ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Tersimpan
                    </>
                  ) : (
                    "Simpan Judul"
                  )}
                </button>
              </div>

              {/* Status feedback */}
              {up.status === "success" && (
                <div className="flex items-center gap-1.5 text-green-600 text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>Berhasil diupload</span>
                </div>
              )}
              {up.status === "error" && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>{up.error}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                <input
                  ref={(el) => { fileRefs.current[video.slot] = el; }}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(video.slot, file);
                    e.target.value = "";
                  }}
                />
                <button
                  onClick={() => fileRefs.current[video.slot]?.click()}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white text-sm font-medium py-2 px-3 rounded-lg transition"
                >
                  <Upload className="w-4 h-4" />
                  {isUploading ? "Uploading..." : video.videoUrl ? "Ganti" : "Upload"}
                </button>
                {video.videoUrl && (
                  <button
                    onClick={() => handleDelete(video.slot)}
                    disabled={isUploading}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition disabled:opacity-40"
                    title="Hapus video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* URL info */}
              {video.videoUrl && (
                <p className="text-xs text-gray-400 truncate" title={video.videoUrl}>
                  {video.videoUrl.split("/").pop()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
