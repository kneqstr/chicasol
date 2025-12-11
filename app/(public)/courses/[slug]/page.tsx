import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { getLanguage } from "@/lib/translations/language";
import Video, { IVideo } from "@/models/video.model";
import Course from "@/models/course.model";
import VideosAccordion from "@/components/courses/videos-accordion";

export default async function CourseDetails({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();

  const lang = await getLanguage();
  const { slug } = await params;

  const course = await Course.findOne({ name: slug }).lean();
  if (!course) {
    return <div className="mt-20">Course not found</div>;
  }

  const rawVideos: IVideo[] = await Video.find({
    courseId: new mongoose.Types.ObjectId(course._id),
  })
    .sort({ order: 1 })
    .lean();

  const videos = JSON.parse(JSON.stringify(rawVideos));

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <VideosAccordion videos={videos} lang={lang} courseName={course.name} />
    </div>
  );
}
