import { generateSecureVideoUrl } from "@/lib/bunny";

async function getVideoUrl(videoId: string) {
  "use server";
  return generateSecureVideoUrl(videoId, 7200);
}

export default async function ProtectedVideo({ videoId }: { videoId: string }) {
  const url = await getVideoUrl(videoId);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <div className="aspect-video w-full">
        <iframe
          src={url}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          title="Protected Video"
        />
      </div>
    </div>
  );
}
