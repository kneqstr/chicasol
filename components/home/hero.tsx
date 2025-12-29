"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Ratio, Star, Users } from "lucide-react";

type HeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  rating?: string;
  ratingLabel?: string;
  students?: string;
  studentsLabel?: string;
  certificateLabel?: string;
  features?: { icon: string; text: string }[];
};

export function Hero({ content }: { content: HeroProps }) {
  const {
    title,
    subtitle,
    image,
    primaryCta,
    secondaryCta,
    rating,
    ratingLabel,
    students,
    studentsLabel,
    certificateLabel,
    features,
  } = content;
  return (
    <section className={`mx-auto px-4 pb-8 sm:px-6 max-w-7xl `}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 bg-linear-to-t rounded-4xl lg:bg-none from-background to-card">
          <AspectRatio ratio={16 / 9} className="overflow-hidden ">
            <Image
              src={image}
              alt={subtitle || title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
              quality={90}
            />
          </AspectRatio>
        </div>

        <div className=" lg:col-span-6 bg-primary-foreground p-12  rounded-4xl bg-linear-to-b lg:bg-linear-to-r from-background to-card">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight ">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-4 text-sm sm:text-base text-muted-foreground">{subtitle}</p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {primaryCta ? (
                <Link href={primaryCta.href} className="w-full sm:w-auto ">
                  <Button className="w-full cursor-pointer" size="lg">
                    {primaryCta.label}
                  </Button>
                </Link>
              ) : null}

              {secondaryCta ? (
                <Link href={secondaryCta.href} className="w-full sm:w-auto cursor-pointer">
                  <Button variant="outline" className="w-full sm:w-auto cursor-pointer" size="lg">
                    {secondaryCta.label}
                  </Button>
                </Link>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
              {rating && (
                <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-primary/10 text-primary">
                  <span className="font-semibold">{rating}</span>
                  <span className="text-muted-foreground">{ratingLabel}</span>
                  <Star className="h-4 w-4 shrink-0 text-primary" />
                </div>
              )}
              {students && (
                <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-primary/10 text-primary">
                  <span className="font-semibold">{students}</span>
                  <span className="text-muted-foreground">{studentsLabel}</span>
                  <Users className="h-4 w-4 shrink-0 text-primary" />
                </div>
              )}
              <div className="text-muted-foreground">{certificateLabel}</div>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {features?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Ratio className="h-4 w-4 shrink-0 text-primary" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
