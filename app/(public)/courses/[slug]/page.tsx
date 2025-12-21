import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { getLanguage } from "@/lib/translations/language";
import Video, { IVideo } from "@/models/video.model";
import Course, { ICourse } from "@/models/course.model";
import VideosAccordion from "@/components/courses/videos-accordion";
import CourseHero from "@/components/courses/course-hero";
import CourseDescription from "@/components/courses/course-description";

export default async function CourseDetails({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();

  const lang = await getLanguage();
  const { slug } = await params;

  const course: ICourse = await Course.findOne({ name: slug }).lean();
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
    <div className="max-w-5xl mx-auto mt-20 px-4">
      <CourseHero
        title={course.title[lang]}
        subtitle={course.subtitle[lang]}
        previewVideo={course.previewVideo}
      />
      <CourseDescription
        description={course.description[lang]}
        price={course.price}
        id={course._id.toString()}
      />

      <VideosAccordion videos={videos} lang={lang} />
    </div>
  );
}
