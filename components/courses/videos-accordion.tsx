"use client";

import { useState } from "react";
import { IVideo } from "@/models/video.model";
import { Language } from "@/lib/translations/language";
import Link from "next/link";

interface VideosAccordionProps {
  videos: IVideo[];
  lang: Language;
  courseName: string;
}

export default function VideosAccordion({ videos, lang, courseName }: VideosAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 min-h-screen space-y-4">
      {videos.map((video, index) => (
        <div key={video._id.toString()} className="border rounded-xl  shadow-sm">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-semibold text-lg">{video.title[lang]}</span>

            <span className="text-gray-500 text-sm">{video.durationMinutes} мин</span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-4 text-gray-600 space-y-2">
              <p></p>
              <Link
                href={`/courses/${courseName}/${video.slug}`}
                className="text-primary underline text-sm"
              >
                {video.description[lang]}
              </Link>
              <p className="text-sm text-gray-500">{video.subdescription[lang]}</p>

              {video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {video.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
