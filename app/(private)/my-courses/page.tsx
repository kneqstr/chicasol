import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getLanguage } from "@/lib/translations/language";
import Course, { ICourse } from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "@/components/my-courses/progress";

export default async function MyCoursesPage() {
  await connectDB();
  await Course.findOne({});
  const userId = await getUser();
  const lang = await getLanguage();

  const purchases = await UserCourse.find({ user: userId, isActive: true })
    .populate("course")
    .lean();

  if (!purchases?.length) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">У вас пока нет курсов</h1>
          <p className="text-gray-600">Приобретите свой первый курс, чтобы начать обучение</p>
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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Мои курсы</h1>
          <p className="text-gray-600 mt-2">Продолжайте обучение с того места, где остановились</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((p) => {
            const course = p.course as ICourse;
            return (
              <Link
                key={p._id.toString()}
                href={`/my-courses/${course.name}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 md:h-52">
                  <Image
                    src={course.thumbnailUrl || "/placeholder.jpg"}
                    alt={course.title[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
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

                  <div className="space-y-2">
                    <ProgressBar courseSlug={course.name} />
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                      Продолжить обучение
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
