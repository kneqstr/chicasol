import { Separator } from "../ui/separator";

export default function SeparatedTitle({ title }: { title: string }) {
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-3xl md:text-4xl font-bold">{title}</span>
      </div>
    </div>
  );
}
