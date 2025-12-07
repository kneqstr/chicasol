import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type BenefitsProps = {
  titlebenefits: string;
  cardsbenefits: Array<{
    title: string;
    subtitle: string;
    items: string[];
  }>;
};

export default function CourseBenefits({ content }: { content: BenefitsProps }) {
  const { titlebenefits, cardsbenefits } = content;
  return (
    <section className="w-full py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">{titlebenefits}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {cardsbenefits.map((card, index) => (
          <Card key={index} className="rounded-2xl shadow-sm p-6">
            <CardContent>
              <div className="space-y-1">
                <h4 className="text-md font-semibold leading-none">{card.title}</h4>
                <p className="text-muted-foreground text-xs">{card.subtitle}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-4 text-xs font-sm lg:text-sm lg:font-medium">
                {card.items.map((item, idx) => (
                  <div className="flex h-5 items-center space-x-4" key={idx}>
                    {idx > 0 && <Separator orientation="vertical" />}
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
