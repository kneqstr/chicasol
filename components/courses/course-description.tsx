import { PaymentButton } from "../payment-button";

interface CourseDescriptionProps {
  description: string;
  price: number;
  id: string;
}

export default function CourseDescription({ description, price, id }: CourseDescriptionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start my-4">
      <PaymentButton courseId={id} coursePrice={price} className="w-full py-4 text-lg" />
      <blockquote className="mt-6 border-l-2 pl-6 italic">{description}</blockquote>
    </section>
  );
}
