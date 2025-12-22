import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import { verifyAccessToken } from "@/lib/auth";
import Course from "@/models/course.model";
import Video, { IVideo } from "@/models/video.model";
import UserCourse from "@/models/usercourse.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CoursePlayer from "@/components/my-courses/player";
import CourseSidebar from "@/components/my-courses/sidebar";
import MobileCourseNav from "@/components/my-courses/mobile-nav";

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

  const videos = await Video.find({ courseId: course._id }).sort({ order: 1 }).lean<IVideo[]>();

  const activeVideo = videos.find((v) => v.slug === videoSlug) ?? videos[0];

  if (!activeVideo) redirect(`/my-courses/${slug}/${videos[0].slug}`);

  const activeVideoDTO = {
    id: activeVideo._id.toString(),
    slug: activeVideo.slug,
    videoId: activeVideo.videoId,
    title: activeVideo.title,
    description: activeVideo.description,
    subdescription: activeVideo.subdescription,
    durationMinutes: activeVideo.durationMinutes,
    likes: activeVideo.likes,
    views: activeVideo.views,
  };

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
    <>
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 lg:pt-20">
        <MobileCourseNav
          courseSlug={slug}
          videos={videosDTO}
          activeVideoSlug={activeVideo.slug}
          completedLessons={userCourse.completedLessons}
          lang={lang}
        />
        <div className="lg:w-2/3 xl:w-3/4">
          <div className="p-4 lg:p-6">
            <CoursePlayer
              video={activeVideoDTO}
              lang={lang}
              courseSlug={slug}
              nextVideoSlug={getNextVideoSlug(videos, activeVideo.slug)}
              previousVideoSlug={getPreviousVideoSlug(videos, activeVideo.slug)}
            />
          </div>
        </div>

        <div className="lg:w-1/3 xl:w-1/4">
          <CourseSidebar
            courseSlug={slug}
            videos={videosDTO}
            activeVideoSlug={activeVideo.slug}
            completedLessons={userCourse.completedLessons}
            lang={lang}
          />
        </div>
      </div>
    </>
  );
}

function getNextVideoSlug(videos: IVideo[], currentSlug: string): string | null {
  const currentIndex = videos.findIndex((v) => v.slug === currentSlug);
  if (currentIndex >= 0 && currentIndex + 1 < videos.length) {
    return videos[currentIndex + 1].slug;
  }
  return null;
}

function getPreviousVideoSlug(videos: IVideo[], currentSlug: string): string | null {
  const currentIndex = videos.findIndex((v) => v.slug === currentSlug);
  if (currentIndex > 0) {
    return videos[currentIndex - 1].slug;
  }
  return null;
}
