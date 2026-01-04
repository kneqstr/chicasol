"use client";

import { IVideo } from "@/models/video.model";
import { Language } from "@/lib/translations/language";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideosAccordionProps {
  videos: IVideo[];
  lang: Language;
}

export default function VideosAccordion({ videos, lang }: VideosAccordionProps) {
  return (
    <section className="my-20 space-y-6">
      <Accordion type="single" collapsible className="space-y-4">
        {videos.map((video, index) => (
          <AccordionItem
            key={video._id.toString()}
            value={video._id.toString()}
            className="rounded-2xl border bg-card px-2 shadow-sm"
          >
            <AccordionTrigger className="px-4 py-4 text-left hover:no-underline  cursor-pointer">
              <div className="flex w-full items-center justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold leading-tight">
                  {index + 1}. {video.title[lang]}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Clock className="h-4 w-4" />
                  <span>{video.durationMinutes} {lang === 'ru' ? 'мин' : 'хв'}</span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 pb-5">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {video.description[lang]}
                </p>

                <p className="text-sm">
                  {video.subdescription[lang]}
                </p>

                {video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {video.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs"
                      >
                        <Tags className="mr-1 h-3 w-3" />
                        {tag[lang]}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
