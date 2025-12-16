import Link from "next/link";

export default function PaymentErrorPage({
  searchParams,
}: {
  searchParams: { message?: string; orderReference?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto py-12 mt-20 px-4 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">❌</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Помилка оплати</h1>

      {searchParams.message && <p className="text-gray-600 mb-4">{searchParams.message}</p>}

      {searchParams.orderReference && (
        <p className="text-sm text-gray-500 mb-4">
          Номер замовлення: {searchParams.orderReference}
        </p>
      )}

      <div className="space-x-4 mt-6">
        <Link href="/courses" className="px-6 py-3 bg-black text-white rounded-lg inline-block">
          Повернутися до курсів
        </Link>
        <Link
          href="/my-courses"
          className="px-6 py-3 border border-gray-300 rounded-lg inline-block"
        >
          До моїх курсів
        </Link>
      </div>
    </div>
  );
}
