import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Відмова від відповідальності | Yoga Courses",
  description:
    "Дисклеймер: відмова від відповідальності для сайту з курсами йоги та духовних практик",
};

export default function DisclaimerPage() {
  const currentDate = new Date().toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ownerName = "[Ім'я автора/Назва компанії]";
  const ownerEmail = "support@yogacourses.com";
  const ownerPhone = "+380 XX XXX XX XX";
  const websiteUrl = "https://yogacourses.com";

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-amber-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ВІДМОВА ВІД ВІДПОВІДАЛЬНОСТІ</h1>
          <p className="text-lg text-gray-600">(Дисклеймер)</p>
          <p className="text-gray-500 mt-2">Останнє оновлення: {currentDate}</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                УВАГА: ЖИТТЄВО ВАЖЛИВА ІНФОРМАЦІЯ
              </h3>
              <p className="text-gray-800">
                Будь ласка, уважно прочитайте цей дисклеймер перед використанням будь-яких
                матеріалів, курсів або практик, представлених на нашому сайті. Ваше здоров&apos;я та
                благополуччя - це ваша особиста відповідальність.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              1. ЗАГАЛЬНЕ ПОЛОЖЕННЯ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Цей документ «Відмова від відповідальності» (далі — «Дисклеймер») регулює відносини
                між власником сайту <strong>{websiteUrl}</strong>
                <strong> {ownerName}</strong> (далі — «Ми», «Наш», «Адміністрація») та користувачами
                сайту (далі — «Ви», «Користувач», «Учасник»).
              </p>
              <p>
                Використовуючи наш сайт, курси, матеріали або будь-які послуги, ви автоматично
                погоджуєтеся з умовами цього Дисклеймера.
              </p>
              <p className="font-medium text-amber-700">
                Якщо ви не погоджуєтеся з будь-якою частиною цього Дисклеймера, будь ласка, негайно
                припиніть використання нашого сайту та послуг.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              2. МЕДИЧНИЙ ДИСКЛЕЙМЕР
            </h2>
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-800 mb-3">2.1. НЕ МЕДИЧНІ ПОСЛУГИ</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ми НЕ надаємо медичні, психіатричні, психологічні або інші професійні медичні
                  послуги. Наші курси йоги, медитації та духовних практик НЕ є:
                </p>
                <ul className="list-disc pl-8 mt-3 space-y-2 text-gray-700">
                  <li>Медичним лікуванням або терапією</li>
                  <li>Заміною професійної медичної допомоги</li>
                  <li>Діагностикою захворювань</li>
                  <li>Призначенням ліків або лікувальних процедур</li>
                  <li>Психологічною або психіатричною терапією</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  2.2. Консультація з лікарем обов&apos;язкова
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Перед початком будь-яких фізичних практик, включаючи йогу, ви ОБОВ&apos;ЯЗКОВО
                  повинні:
                </p>
                <ul className="list-disc pl-8 mt-3 space-y-2 text-gray-700">
                  <li>Проконсультуватися з кваліфікованим лікарем</li>
                  <li>Пройти медичний огляд, якщо це необхідно</li>
                  <li>Отримати дозвіл лікаря на заняття фізичними вправами</li>
                  <li>Повідомити лікаря про всі ваші захворювання та стани</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">2.3. Протипоказання</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Особливої обережності потребують особи з такими станами:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Фізичні стани:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li>Серцево-судинні захворювання</li>
                      <li>Гіпертонія або гіпотонія</li>
                      <li>Проблеми з хребтом</li>
                      <li>Артрит, артроз</li>
                      <li>Вагітність та лактація</li>
                      <li>Недавні операції</li>
                      <li>Епілепсія</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Психічні стани:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      <li>Тривожні розлади</li>
                      <li>Депресія</li>
                      <li>Психози</li>
                      <li>Посттравматичний синдром</li>
                      <li>Шизофренія</li>
                      <li>Біполярний розлад</li>
                      <li>Серйозні стресові стани</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              3. ВАША ОСОБИСТА ВІДПОВІДАЛЬНІСТЬ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Ви повністю та безумовно приймаєте на себе відповідальність за:</p>

              <div className="bg-blue-50 p-5 rounded-lg mt-4">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Власне здоров&apos;я та безпеку:
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Слухати своє тіло та не перевищувати можливості</li>
                  <li>Негайно припинити практику при болі, запамороченні, нудоті</li>
                  <li>Використовувати належне спортивне обладнання</li>
                  <li>Забезпечити безпечне місце для занять</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Вибір практик:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Вибір відповідного вашому рівню курсу</li>
                  <li>Дотримання правил виконання вправ</li>
                  <li>Поступове збільшення навантаження</li>
                  <li>Відмова від небезпечних для вас практик</li>
                </ul>
              </div>

              <p className="mt-4 font-medium text-gray-800">
                Ми не можемо контролювати, як ви виконуєте практики вдома, тому вся відповідальність
                за правильність виконання лежить на вас.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              4. ОБМЕЖЕННЯ ВІДПОВІДАЛЬНОСТІ
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  4.1. Відмова від відповідальності
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Ми, наші інструктори, співробітники та представники НЕ несемо відповідальності за:
                </p>
                <ul className="list-disc pl-8 mt-3 space-y-2 text-gray-700">
                  <li>Будь-які травми, пошкодження або проблеми зі здоров&apos;ям</li>
                  <li>Погіршення існуючих захворювань</li>
                  <li>Психологічні або емоційні розлади</li>
                  <li>Матеріальні збитки</li>
                  <li>Втрату доходів або прибутків</li>
                  <li>Будь-які інші прямі, непрямі або випадкові збитки</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  4.2. Очікування результатів
                </h3>
                <p className="text-gray-700 leading-relaxed">Ми НЕ гарантуємо:</p>
                <ul className="list-disc pl-8 mt-3 space-y-2 text-gray-700">
                  <li>Конкретних результатів від практик</li>
                  <li>Покращення здоров&apos;я або лікування захворювань</li>
                  <li>Духовного просвітлення або трансформації</li>
                  <li>Емоційного або психічного оздоровлення</li>
                  <li>Досягнення будь-яких конкретних цілей</li>
                </ul>
                <p className="mt-4 text-gray-700 italic">
                  Результати залежать від індивідуальних особливостей, регулярності практик, стану
                  здоров&apos;я та багатьох інших факторів, які ми не контролюємо.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              5. ДУХОВНІ ТА ЕНЕРГЕТИЧНІ ПРАКТИКИ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-purple-50 p-5 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">Важливе застереження</h4>
                <p>
                  Деякі наші курси можуть містити духовні, енергетичні або езотеричні практики. Ми
                  повідомляємо, що:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Ці практики не є науково підтвердженими</li>
                  <li>Результати можуть бути суб&apos;єктивними</li>
                  <li>Практики не замінюють психологічної допомоги</li>
                  <li>Індивідуальна реакція може відрізнятися</li>
                </ul>
              </div>

              <p className="mt-4">
                Якщо ви маєте психічні розлади або схильні до психозів, будьте особливо обережні з
                духовними практиками або повністю утримайтесь від них.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              6. ІНФОРМАЦІЙНИЙ ХАРАКТЕР КОНТЕНТУ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Вся інформація на нашому сайті має виключно інформаційний та освітній характер:</p>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Ми не даємо медичних порад або рекомендацій</li>
                <li>Всі описи результатів є прикладами, а не гарантіями</li>
                <li>Відгуки користувачів відображають особистий досвід</li>
                <li>Наукові посилання надаються для ознайомлення</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700 italic">
                  «Це не є медичною порадою. Зверніться до кваліфікованого медичного працівника для
                  діагностики та лікування будь-яких медичних проблем.»
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              7. ТЕХНІЧНІ АСПЕКТИ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Ми не несемо відповідальності за:</p>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Технічні проблеми з доступом до курсів</li>
                <li>Втрату даних або прогресу навчання</li>
                <li>Несправності вашого обладнання або інтернет-з&apos;єднання</li>
                <li>Тимчасову недоступність сайту</li>
                <li>Втрату доступу через порушення умов використання</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              8. ЗАСТЕРЕЖЕННЯ ЩОДО ЗАЛЕЖНОСТЕЙ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-orange-50 p-5 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3">
                  Увага: ризик формування залежностей
                </h4>
                <p>
                  Деякі практики (особливо медитація та духовні техніки) можуть сприяти формуванню
                  психологічних залежностей або втечі від реальності.
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Не використовуйте практики для уникнення реальних проблем</li>
                  <li>Практикуйте помірно та збалансовано</li>
                  <li>Не замінюйте соціальне життя практиками</li>
                  <li>Зверніться до психолога, якщо відчуваєте проблеми</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">9. ПРИЙНЯТТЯ УМОВ</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Використовуючи наш сайт, курси або будь-які матеріали, ви підтверджуєте, що:</p>
              <ul className="list-disc pl-8 mt-3 space-y-2">
                <li>Уважно прочитали та зрозуміли цей Дисклеймер</li>
                <li>Приймаєте всю відповідальність за своє здоров&apos;я та благополуччя</li>
                <li>Проконсультувалися з лікарем (якщо це необхідно)</li>
                <li>Не маєте протипоказань до занять</li>
                <li>Здійснюєте практики на свій страх і ризик</li>
                <li>Не будете пред&apos;являти претензій у разі проблем</li>
              </ul>

              <div className="mt-6 p-4 bg-white rounded-lg border">
                <p className="text-center font-semibold text-gray-800">
                  «Я розумію та приймаю, що всі практики виконуються мною на власний страх і ризик,
                  і я несу повну відповідальність за будь-які наслідки.»
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              10. КОНТАКТНА ІНФОРМАЦІЯ ТА ПІДТВЕРДЖЕННЯ
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Якщо у вас виникли запитання щодо цього Дисклеймера або ви не розумієте якісь
                положення, будь ласка, зверніться до нас перед використанням сайту:
              </p>

              <div className="bg-gray-50 p-5 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-800 mb-3">Контактна інформація:</h4>
                <ul className="space-y-2">
                  <li>
                    <strong>Власник сайту:</strong> {ownerName}
                  </li>
                  <li>
                    <strong>Електронна пошта:</strong> {ownerEmail}
                  </li>
                  <li>
                    <strong>Телефон:</strong> {ownerPhone}
                  </li>
                  <li>
                    <strong>Сайт:</strong> {websiteUrl}
                  </li>
                </ul>
              </div>

              <p className="mt-4">
                Цей Дисклеймер може періодично оновлюватися. Ваше продовження використання сайту
                після змін означає прийняття нової версії.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
            Цей документ складно відповідно до вимог законодавства та з турботою про безпеку
            користувачів.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} {ownerName}. Всі права захищено.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Інформація на цій сторінці не є юридичною порадою. Для юридичних консультацій зверніться
            до кваліфікованого юриста.
          </p>
        </div>
      </div>
    </div>
  );
}
