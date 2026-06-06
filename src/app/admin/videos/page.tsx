import { getGalleryVideos } from "@/actions/videos";
import VideoManager from "@/components/admin/VideoManager";

export const metadata = { title: "Kelola Video | Hunay Admin" };

export default async function AdminVideosPage() {
  const videos = await getGalleryVideos();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Video Galeri</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload video untuk 6 slot di halaman galeri. Hover thumbnail untuk preview.
        </p>
      </div>
      <VideoManager initialVideos={videos} />
    </div>
  );
}
