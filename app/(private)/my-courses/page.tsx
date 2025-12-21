import { getUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { getLanguage } from "@/lib/translations/language";
import { UserCourseLean } from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";

export default async function MyCourses() {
  await connectDB();
  const userId = await getUser();
  const lang = await getLanguage();
  const purchases = await UserCourse.find({ user: userId })
    .populate("course")
    .lean<UserCourseLean[]>();
  const courses = purchases
    .filter((p) => p.course)
    .map((p) => ({
      ...p.course,
      _id: p.course._id.toString(),
    }));

  return (
    <div className="mt-20 min-h-screen">
      <h1>My Courses</h1>
      {purchases.map((p) => (
        <p key={p._id.toString()}>{p.progress}</p>
      ))}
      {courses.map((p) => (
        <p key={p._id.toString()}>
          {" "}
          {p.name} {p.description[lang]}
        </p>
      ))}
    </div>
  );
}
