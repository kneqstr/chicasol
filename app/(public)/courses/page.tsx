import Course, { ICourse } from "@/models/course.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";
import CourseCard from "@/components/courses/course-card";

export default async function AboutCourses() {
  await connectDB();
  const lang = await getLanguage();
  const rawCourses: ICourse[] = await Course.find().sort({ createdAt: -1 }).lean();
  const courses = JSON.parse(JSON.stringify(rawCourses));

  return (
    <div className="mt-20 min-h-screen max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{lang === "ru" ? "Наши курсы" : "Наші курси"}</h1>

      {courses.length === 0 && (
        <p className="text-gray-600">
          {lang === "ru" ? "Курсы пока отсутствуют." : "Курсів поки немає."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course: ICourse) => (
          <CourseCard key={course._id.toString()} course={course} lang={lang} />
        ))}
      </div>
    </div>
  );
}
