import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import { verifyAccessToken } from "@/lib/auth";
import Course from "@/models/course.model";
import Video from "@/models/video.model";
import UserCourse from "@/models/usercourse.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CoursePlayer from "@/components/my-courses/player";
import CourseSidebar from "@/components/my-courses/sidebar";

export default async function CourseVideoPage({
  params,
}: {
  params: Promise<{ slug: string; videoSlug: string }>;
}) {
  const { slug, videoSlug } = await params;

  await connectDB();
  const lang = await getLanguage();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  const { sub: userId } = await verifyAccessToken(token);

  const course = await Course.findOne({ name: slug }).lean();
  if (!course) redirect("/404");

  const userCourse = await UserCourse.findOne({
    user: userId,
    course: course._id,
    isActive: true,
  }).lean();

  if (!userCourse) redirect("/access-denied");

  const videos = await Video.find({ courseId: course._id }).sort({ order: 1 }).lean();

  const activeVideo = videos.find((v) => v.slug === videoSlug) ?? videos[0];

  if (!activeVideo) redirect(`/my-courses/${slug}/${videos[0].slug}`);

  const videosDTO = videos.map((v) => ({
    id: v._id.toString(),
    slug: v.slug,
    title: v.title,
    description: v.description,
    subdescription: v.subdescription,
    durationMinutes: v.durationMinutes,
    order: v.order,
  }));

  return (
    <div className="flex min-h-screen mt-20">
      <div className="flex-1 p-6">
        <CoursePlayer video={activeVideo} lang={lang} />
      </div>

      <CourseSidebar
        courseSlug={slug}
        videos={videosDTO}
        activeVideoSlug={activeVideo.slug}
        completedLessons={userCourse.completedLessons}
        lang={lang}
      />
    </div>
  );
}
