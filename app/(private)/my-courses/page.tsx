import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import { UserCourseLean } from "@/models/course.model";
import Course from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Link from "next/link";
import Image from "next/image";

export default async function MyCourses() {
  await connectDB();
  const userId = await getUser();
  const lang = await getLanguage();
  const purchases = await UserCourse.find({ user: userId })
    .populate("course")
    .lean<UserCourseLean[]>();

  if (!purchases) {
    return (
      <div className="mt-20 min-h-screen">
        <h1>У вас не покупок</h1>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen">
      <div className="max-w-md mx-auto">
        {purchases.map((p) => (
          <div
            key={p._id.toString()}
            className="rounded-xl overflow-hidden shadow-lg  hover:shadow-xl transition-all duration-300 border"
          >
            <Link href={`/my-courses/${p.course?.name}`}>
              <div className="relative w-full h-56">
                <Image
                  src={p.course?.thumbnailUrl || "/placeholder-course.jpg"}
                  alt={p.course?.title[lang]}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{p.course?.title[lang]}</h3>

                <p className="text-gray-600 mt-2 line-clamp-3">{p.course?.description[lang]}</p>
              </div>
              <div className="p-5">PROGRESS: {p.progress} %</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
