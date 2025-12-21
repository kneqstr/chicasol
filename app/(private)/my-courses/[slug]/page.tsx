import ProtectedVideo from "@/components/protected-component";
import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import Course from "@/models/course.model";
import UserCourse, { IUserCourse } from "@/models/usercourse.model";
import Video, { IVideo } from "@/models/video.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLanguage();
  await connectDB();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/login");

  const { sub } = await verifyAccessToken(accessToken);

  const courseDoc = await Course.findOne({ name: slug }).lean();

  if (!courseDoc) return <div className="mt-20">Course not found</div>;

  const boughtCours = await UserCourse.findOne<IUserCourse>({ user: sub, course: courseDoc._id });
  if (!boughtCours?.isActive) return <div className="mt-20">access denied</div>;

  const rawVideos: IVideo[] = await Video.find({
    courseId: courseDoc._id,
  })
    .sort({ order: 1 })
    .lean();

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-6">
      <div className="flex space-x-2">
        {rawVideos.map((r) => (
          <ProtectedVideo key={r._id.toString()} videoId={r.videoId} />
        ))}
      </div>
    </div>
  );
}
