import { Language } from "@/lib/translations/language";
import { PaymentButton } from "../payment-button";

interface CourseDescriptionProps {
  description: string;
  price: number;
  id: string;
  lang: Language;
}

export default function CourseDescription({
  description,
  price,
  id,
  lang,
}: CourseDescriptionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start my-4 mt-20 lg:mt-4">
      <PaymentButton courseId={id} coursePrice={price} lang={lang} />
      <blockquote className="mt-6 border-l-2 pl-6 italic">{description}</blockquote>
    </section>
  );
}
