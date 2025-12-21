import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import Course from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Video from "@/models/video.model";
import { redirect } from "next/navigation";

export default async function CourseEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  await connectDB();
  const userId = await getUser();

  const course = await Course.findOne({ name: slug }).lean();
  if (!course) redirect("/404");

  const userCourse = await UserCourse.findOne({
    user: userId,
    course: course._id,
  }).lean();

  if (!userCourse) redirect("/access-denied");

  const videos = await Video.find({ courseId: course._id }).sort({ order: 1 }).lean();

  if (!videos.length) redirect("/404");

  let targetVideo = videos[0];

  if (userCourse.completedLessons?.length > 0) {
    const lastCompletedSlug = userCourse.completedLessons[userCourse.completedLessons.length - 1];
    const lastCompletedIndex = videos.findIndex((v) => v.slug === lastCompletedSlug);

    if (lastCompletedIndex >= 0 && lastCompletedIndex + 1 < videos.length) {
      targetVideo = videos[lastCompletedIndex + 1];
    } else {
      targetVideo = videos.find((v) => !userCourse.completedLessons?.includes(v.slug)) || videos[0];
    }
  }

  redirect(`/my-courses/${slug}/${targetVideo.slug}`);
}
