import { getCurrentUser } from "@/lib/auth";
import UserCourse from "@/models/userscourse.model";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ICourse } from "@/models/course.model";

export default async function PaymentSuccessPage() {
  await connectDB();
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const courses = await UserCourse.find({ user: user._id }).populate("course");

  return (
    <div className="max-w-2xl mx-auto py-12 mt-20">
      <h1 className="text-2xl font-bold mb-4">Оплата успішна 🎉</h1>

      <p className="mb-6">Вам відкрито доступ до курсів:</p>

      <ul className="space-y-3">
        {courses.map((uc) => (
          <li key={uc._id.toString()} className="p-4 border rounded-xl">
            {(uc.course as ICourse).title.uk}
          </li>
        ))}
      </ul>
    </div>
  );
}
