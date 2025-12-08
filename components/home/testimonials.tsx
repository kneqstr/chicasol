"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  text: string;
  rating: number;
  avatar: string;
  date?: string;
  course?: string;
};

type TestimonialsProps = {
  heading: string;
  items: Testimonial[];
  students: string;
  rating: string;
  recommend: string;
  reviews: string;
};

export function Testimonials({ content }: { content: TestimonialsProps }) {
  const { heading, students, rating, recommend, reviews, items } = content;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 md:left-10 w-24 h-24 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-5 md:right-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{heading}</h2>
        </motion.div>

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <TestimonialCard item={item} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard item={item} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <TestimonialCard item={item} index={index} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative h-10 w-10 rounded-full border bg-background shadow-sm hover:shadow-md" />
              <div className="flex items-center gap-1">
                {items.slice(0, 3).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
                ))}
              </div>
              <CarouselNext className="relative h-10 w-10 rounded-full border bg-background shadow-sm hover:shadow-md" />
            </div>
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">{students}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">{rating}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">{recommend}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-sm text-muted-foreground">{reviews}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <Card
      className={cn(
        "h-full yoga-card border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden",
        "shadow-sm hover:shadow-lg",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-background shadow-lg">
              <Image
                src={item.avatar}
                alt={item.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Heart className="h-3 w-3 text-white fill-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{item.name}</h4>

            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-1">{item.rating}.0</span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              {item.course && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {item.course}
                </span>
              )}
              {item.date && <span className="text-xs text-muted-foreground">{item.date}</span>}
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
        </div>
      </CardContent>

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}
