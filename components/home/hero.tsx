"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type HeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  authorName?: string;
  authorAvatar?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  rating?: string;
  ratingLabel?: string;
  students?: string;
  studentsLabel?: string;
  certificateLabel?: string;
  features?: { icon: string; text: string }[];
  maxWidth?: string;
};

export function Hero({ content }: { content: HeroProps }) {
  const {
    title,
    subtitle,
    image,
    authorName,
    authorAvatar,
    primaryCta,
    secondaryCta,
    rating,
    ratingLabel,
    students,
    studentsLabel,
    certificateLabel,
    features,
    maxWidth = "max-w-7xl",
  } = content;
  return (
    <section className="pt-8 pb-12">
      <div className={`mx-auto px-4 sm:px-6 ${maxWidth}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <AspectRatio ratio={16 / 9} className="rounded-2xl overflow-hidden bg-muted">
              <Image
                src={image}
                alt={subtitle || title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
            </AspectRatio>

            <div className="mt-4 lg:mt-0 lg:relative">
              <div className="lg:absolute lg:-bottom-6 lg:left-6 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full px-3 py-2 shadow">
                {authorAvatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={authorAvatar}
                      alt={authorName || "author"}
                      quality={90}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {authorName?.slice(0, 1) ?? "A"}
                  </div>
                )}
                <div className="text-sm">
                  <div className="font-medium leading-none">{authorName ?? "Автор курсу"}</div>
                  <div className="text-xs text-muted-foreground">{certificateLabel}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-4 text-sm sm:text-base text-muted-foreground">{subtitle}</p>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {primaryCta ? (
                  <Link href={primaryCta.href} className="w-full sm:w-auto">
                    <Button className="w-full" size="lg">
                      {primaryCta.label}
                    </Button>
                  </Link>
                ) : null}

                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto" size="lg">
                      {secondaryCta.label}
                    </Button>
                  </Link>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                {rating && (
                  <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-green-50 text-green-700">
                    <span className="font-semibold">{rating}</span>
                    <span className="text-muted-foreground">{ratingLabel}</span>
                  </div>
                )}
                {students && (
                  <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-muted/40">
                    <span className="font-medium">{students}</span>
                    <span className="text-muted-foreground">{studentsLabel}</span>
                  </div>
                )}
                <div className="text-muted-foreground">{certificateLabel}</div>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {features?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5 text-md">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
