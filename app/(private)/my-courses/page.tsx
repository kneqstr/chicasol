import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getLanguage } from "@/lib/translations/language";
import Course, { ICourse } from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Video from "@/models/video.model";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "@/components/my-courses/progress";

export default async function MyCoursesPage() {
  await connectDB();

  const userId = await getUser();
  const lang = await getLanguage();
  const initCourses = await Course.find({});
  const purchases = await UserCourse.find({
    user: userId,
    isActive: true,
  })
    .populate("course")
    .lean();

  if (!purchases?.length) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-24 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-muted-foreground">
            У вас пока нет курсов
          </h1>
          <p className="text-muted-foreground">
            Приобретите свой первый курс, чтобы начать обучение
          </p>
          <Link
            href="/courses"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Перейти к каталогу
          </Link>
        </div>
      </div>
    );
  }

  const courseIds = purchases.map((p) => (p.course as ICourse)._id);

  const videos = await Video.find({
    courseId: { $in: courseIds },
  })
    .sort({ order: 1 })
    .lean();

  const videosByCourse = new Map<string, typeof videos>();

  for (const video of videos) {
    const key = video.courseId.toString();
    if (!videosByCourse.has(key)) {
      videosByCourse.set(key, []);
    }
    videosByCourse.get(key)!.push(video);
  }

  const getTargetVideoSlug = (courseId: string, completedLessons?: string[]): string | null => {
    const courseVideos = videosByCourse.get(courseId);

    if (!courseVideos || courseVideos.length === 0) return null;

    if (!completedLessons || completedLessons.length === 0) {
      return courseVideos[0].slug;
    }

    const lastCompletedSlug = completedLessons[completedLessons.length - 1];

    const lastIndex = courseVideos.findIndex((v) => v.slug === lastCompletedSlug);

    if (lastIndex >= 0 && lastIndex + 1 < courseVideos.length) {
      return courseVideos[lastIndex + 1].slug;
    }

    return courseVideos[courseVideos.length - 1].slug;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-accent-foreground">Мои курсы</h1>
          <p className="text-accent-foreground mt-2">
            Продолжайте обучение с того места, где остановились
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
          {purchases.map((p) => {
            const course = p.course as ICourse;

            const targetVideoSlug = getTargetVideoSlug(course._id.toString(), p.completedLessons);

            if (!targetVideoSlug) return null;

            return (
              <Link
                key={p._id.toString()}
                href={`/my-courses/${course.name}/${targetVideoSlug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 md:h-52">
                  <Image
                    src={course.thumbnailUrl || "/placeholder.jpg"}
                    alt={course.title[lang]}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                      {course.title[lang]}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {course.description[lang]}
                    </p>
                  </div>

                  <ProgressBar courseSlug={course.name} />

                  <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                    Продолжить обучение →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
