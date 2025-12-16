import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // WayForPay отправляет данные как formData
    const formData = await request.formData();

    // Получаем orderReference (WayForPay может отправлять его в разных полях)
    const orderReference =
      (formData.get("orderReference") as string) || (formData.get("orderRef") as string);

    console.log("WayForPay return POST received, orderReference:", orderReference);

    // Просто делаем редирект на страницу курсов
    // Все статусы уже обработаны в вебхуке
    return NextResponse.redirect(new URL("/my-courses", request.url), { status: 302 });
  } catch (error) {
    console.error("Payment return error:", error);
    // В случае ошибки все равно редиректим на курсы
    return NextResponse.redirect(new URL("/my-courses", request.url), { status: 302 });
  }
}

// Также обрабатываем GET на всякий случай
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/my-courses", request.url), { status: 302 });
}
