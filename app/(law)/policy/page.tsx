import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності | Yoga Courses",
  description: "Політика конфіденційності сайту з продажу курсів йоги та духовних практик",
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-20 bg-linear-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Політика конфіденційності</h1>
          <p className="text-lg text-gray-600">Останнє оновлення: {currentDate}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Загальні положення</h2>
            <p className="text-gray-700 leading-relaxed">
              Ця Політика конфіденційності визначає порядок обробки та захисту персональних даних
              користувачів сайту <strong>Yoga Courses</strong> (далі – «Сайт»), який належить та
              адмініструється [Ім&apos;я автора/Назва компанії] (далі – «Адміністрація»). Ми
              поважаємо вашу конфіденційність та прагнемо захистити ваші персональні дані.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Які дані ми збираємо</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Ми можемо збирати наступні типи даних:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Особисті дані:</strong> ім&apos;я, прізвище, електронна адреса, номер
                  телефону, країна проживання
                </li>
                <li>
                  <strong>Дані для доступу:</strong> логін, пароль (у зашифрованому вигляді)
                </li>
                <li>
                  <strong>Платіжна інформація:</strong> дані для оплати курсів (обробляються
                  платіжними системами)
                </li>
                <li>
                  <strong>Технічні дані:</strong> IP-адреса, тип браузера, операційна система, дані
                  про відвідування Сайту (cookies)
                </li>
                <li>
                  <strong>Дані про здоров&apos;я:</strong> інформація про ваш рівень підготовки в
                  йозі, цілі практики (заповнюється добровільно для персоналізації курсів)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Мета збору даних</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Ваші персональні дані використовуються для:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Надання доступу до курсів йоги та інших практик</li>
                <li>Обробки оплат та підтвердження покупок</li>
                <li>Персоналізації навчального досвіду</li>
                <li>Надсилання інформаційних листів та повідомлень</li>
                <li>Підтримки технічної роботи Сайту</li>
                <li>Вдосконалення якості наших послуг</li>
                <li>Дотримання вимог законодавства</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Обробка платіжної інформації
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Усі платежі обробляються через безпечні платіжні системи (LiqPay, Fondy, Stripe тощо).
              Ми не зберігаємо дані вашої банківської картки на своїх серверах. Платіжні дані
              передаються в зашифрованому вигляді та обробляються відповідно до стандартів PCI DSS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Використання cookies</h2>
            <p className="text-gray-700 leading-relaxed">Ми використовуємо cookies для:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Збереження сесії користувача</li>
              <li>Запам&aposятовування налаштувань</li>
              <li>Аналізу відвідуваності Сайту</li>
              <li>Персоналізації контенту</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Ви можете вимкнути cookies у налаштуваннях вашого браузера, але це може обмежити
              функціональність Сайту.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Захист персональних даних
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">Ми вживаємо таких заходів захисту:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Шифрування даних при передачі (SSL/TLS)</li>
                <li>Регулярне оновлення програмного забезпечення</li>
                <li>Обмежений доступ до даних співробітників</li>
                <li>Регулярне резервне копіювання</li>
                <li>Захист від кібератак</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Ваші права</h2>
            <p className="text-gray-700 leading-relaxed">Ви маєте право:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-800">
              <li>Знати, які ваші дані ми обробляємо</li>
              <li>Отримати доступ до ваших даних</li>
              <li>Вимагати виправлення неточних даних</li>
              <li>Вимагати видалення ваших даних («право на забуття»)</li>
              <li>Відмовитися від отримання маркетингових повідомлень</li>
              <li>Відкликати згоду на обробку даних</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Передача даних третім особам
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ми не передаємо ваші персональні дані третім особам, крім випадків, коли це необхідно
              для:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Виконання зобов&apos;язань (платіжні системи)</li>
              <li>Вимог законодавства</li>
              <li>Захисту наших законних прав</li>
              <li>Надання послуг (хостинг, email-розсилка)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Контактна інформація</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                З усіх питань щодо обробки персональних даних звертайтеся:
              </p>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <strong>Адміністрація Сайту:</strong> [Ім&apos;я автора/Назва компанії]
                </p>
                <p className="text-gray-800">
                  <strong>Електронна адреса:</strong> privacy@yogacourses.com
                </p>
                <p className="text-gray-800">
                  <strong>Телефон:</strong> +380 XX XXX XX XX
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Зміни до Політики конфіденційності
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ми залишаємо за собою право вносити зміни до цієї Політики конфіденційності. Про
              будь-які зміни ми повідомимо на цій сторінці та, за необхідності, надішлемо
              повідомлення на вашу електронну адресу.
            </p>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="text-gray-800">
                <strong>Важливо:</strong> Використовуючи наш Сайт та придбаваючи курси, ви
                підтверджуєте, що ознайомлені з цією Політикою конфіденційності та даєте згоду на
                обробку ваших персональних даних.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Ця Політика конфіденційності розроблена відповідно до Закону України «Про захист
            персональних даних» та GDPR.
          </p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} Yoga Courses. Всі права захищено.
          </p>
        </div>
      </div>
    </div>
  );
}
