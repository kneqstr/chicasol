import ProtectedVideo from "@/components/protected-component";
import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import Course from "@/models/course.model";
import Video, { IVideo } from "@/models/video.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string; video: string }>;
}) {
  await connectDB();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  const { roles } = await verifyAccessToken(accessToken);
  const parsedRoles = JSON.parse(roles);

  try {
    if (!parsedRoles.includes("admin")) {
      redirect("/");
    }
  } catch {
    redirect("/login");
  }

  const { slug, video } = await params;
  const lang = await getLanguage();

  const courseDoc = await Course.findOne({ name: slug }).lean();
  if (!courseDoc) return <div className="p-10">Course not found</div>;

  const videoDoc: IVideo = await Video.findOne({
    slug: video,
  }).lean();

  if (!videoDoc) return <div className="p-10">Video not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{videoDoc.title[lang]}</h1>

      <p className="text-gray-700">{videoDoc.description[lang]}</p>

      <ProtectedVideo videoId={videoDoc.videoId} />

      <div className="text-gray-500 text-sm">{videoDoc.subdescription[lang]}</div>

      <div className="flex flex-wrap gap-2 mt-4">
        {videoDoc.tags.map((t, i) => (
          <span key={i} className="text-xs px-2 py-1  rounded">
            {t[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}
