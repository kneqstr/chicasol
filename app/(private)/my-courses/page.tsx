import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getLanguage } from "@/lib/translations/language";
import Course, { ICourse } from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Link from "next/link";
import Image from "next/image";

export default async function MyCoursesPage() {
  await connectDB();

  const userId = await getUser();
  const lang = await getLanguage();
  await Course.findOne({});
  const purchases = await UserCourse.find({ user: userId, isActive: true })
    .populate("course")
    .lean();

  if (!purchases?.length) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-xl font-semibold">У вас пока нет курсов</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-6">
      {purchases.map((p) => {
        const course = p.course as ICourse;
        return (
          <Link
            key={p._id.toString()}
            href={`/my-courses/${course.name}`}
            className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-48">
              <Image
                src={course.thumbnailUrl || "/placeholder.jpg"}
                alt={course.title[lang]}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{course.title[lang]}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description[lang]}</p>

              <div className="text-sm text-gray-500">Прогресс: {p.progress}%</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
