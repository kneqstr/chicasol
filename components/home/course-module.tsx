"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Aperture } from "lucide-react";

type CourseModule = {
  title: string;
  lessons?: string;
  duration?: string;
  bullets?: string[];
};

type CourseModulesProps = {
  heading: string;
  modules: CourseModule[];
};

export function CourseModules({ content }: { content: CourseModulesProps }) {
  const { heading, modules } = content;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {modules.map((module, index) => (
            <AccordionItem
              key={index}
              value={`module-${index}`}
              className="border rounded-xl px-4 last:border-b bg-card"
            >
              <AccordionTrigger className="text-lg font-medium cursor-pointer">
                <div className="flex flex-col w-full text-left">
                  <span>{module.title}</span>

                  {(module.lessons || module.duration) && (
                    <span className="text-sm text-muted-foreground mt-1 ">
                      {module.lessons}
                      {module.lessons && module.duration ? " · " : ""}
                      {module.duration}
                    </span>
                  )}
                </div>
              </AccordionTrigger>

              <AccordionContent>
                {module.bullets && (
                  <ul className="mt-3 space-y-2  text-sm text-muted-foreground">
                    {module.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Aperture className="h-3 w-3" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
