"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type GalleryItem = {
  image: string;
  title: string;
  description: string;
};

type PracticeGalleryProps = {
  items: GalleryItem[];
  sectionTitle?: string;
};

export function PracticeGallery({ content }: { content: PracticeGalleryProps }) {
  const { items, sectionTitle } = content;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        {sectionTitle && (
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">{sectionTitle}</h2>
        )}

        <Carousel className="w-full">
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItem key={i}>
                <Card className="overflow-hidden rounded-2xl shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 items-center">
                    <div>
                      <AspectRatio ratio={3 / 4} className="bg-muted rounded-xl overflow-hidden">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </AspectRatio>
                    </div>

                    <div className="flex flex-col justify-center">
                      <CardHeader className="p-0">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </CardHeader>

                      <CardContent className="p-0 mt-3 text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
