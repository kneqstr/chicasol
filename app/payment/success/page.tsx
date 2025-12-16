import { getCurrentUser } from "@/lib/auth";
import UserCourse from "@/models/userscourse.model";
import Purchase from "@/models/purchase.model";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ICourse } from "@/models/course.model";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { orderReference?: string };
}) {
  await connectDB();
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  // Если есть orderReference в параметрах - находим конкретную покупку
  if (searchParams.orderReference) {
    const purchase = await Purchase.findOne({
      wayforpayOrderReference: searchParams.orderReference,
      user: user._id,
      status: "paid",
    }).populate("course");

    if (purchase) {
      return (
        <div className="max-w-2xl mx-auto py-12 mt-20 px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Оплата успішна!</h1>
            <p className="text-gray-600">
              Ваш платіж був успішно оброблений. Доступ до курсу відкрито.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
              <p className="font-medium">Деталі замовлення:</p>
              <p>Номер: {purchase.wayforpayOrderReference}</p>
              <p>
                Сума: {purchase.amount} {purchase.currency}
              </p>
              <p>Дата: {purchase.paidAt?.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Куплений курс:</h2>
            <div className="p-6 border border-green-200 bg-green-50 rounded-xl">
              <h3 className="font-bold text-lg mb-2">{(purchase.course as ICourse).title.uk}</h3>
              <p className="text-gray-600 mb-4">{(purchase.course as ICourse).description.uk}</p>
              <a
                href={`/my-courses`}
                className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Перейти до навчання
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  // Если нет конкретного orderReference, показываем последнюю покупку
  const purchase = await Purchase.findOne({
    user: user._id,
    status: "paid",
  })
    .sort({ paidAt: -1 })
    .populate("course");

  // Если нет покупок, редирект на курсы
  if (!purchase) {
    redirect("/courses");
  }

  // Получить доступные курсы пользователя
  const userCourses = await UserCourse.find({ user: user._id }).populate("course");

  return (
    <div className="max-w-2xl mx-auto py-12 mt-20 px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Оплата успішна!</h1>
        <p className="text-gray-600">
          Ваш платіж був успішно оброблений. Доступ до курсу відкрито.
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
          <p className="font-medium">Деталі замовлення:</p>
          <p>Номер: {purchase.wayforpayOrderReference}</p>
          <p>
            Сума: {purchase.amount} {purchase.currency}
          </p>
          <p>Дата: {purchase.paidAt?.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Куплений курс:</h2>
        <div className="p-6 border border-green-200 bg-green-50 rounded-xl">
          <h3 className="font-bold text-lg mb-2">{(purchase.course as ICourse).title.uk}</h3>
          <p className="text-gray-600 mb-4">{(purchase.course as ICourse).description.uk}</p>
          <a
            href={`/my-courses`}
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Перейти до навчання
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Всі ваші курси:</h2>
        <ul className="space-y-3">
          {userCourses.map((uc) => (
            <li key={uc._id.toString()} className="p-4 border rounded-xl hover:bg-gray-50">
              <h3 className="font-medium">{(uc.course as ICourse).title.uk}</h3>
              <p className="text-sm text-gray-500">
                Придбано: {new Date(uc.purchasedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">Прогрес: {uc.progress}%</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
