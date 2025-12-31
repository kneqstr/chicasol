"use client";

import { useState } from "react";
import { IVideo } from "@/models/video.model";
import { Language } from "@/lib/translations/language";

interface VideosAccordionProps {
  videos: IVideo[];
  lang: Language;
}

export default function VideosAccordion({ videos, lang }: VideosAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 min-h-screen space-y-4">
      {videos.map((video, index) => (
        <div key={video._id.toString()} className="border rounded-xl  bg-card shadow-sm">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-5 cursor-pointer py-4 rounded-xl text-left"
          >
            <span className="font-semibold text-lg">{video.title[lang]}</span>

            <span className="text-gray-500 text-sm">{video.durationMinutes} мин</span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-4 text-gray-600 space-y-2">
              <p></p>
              <div className="text-primary underline text-sm">{video.description[lang]}</div>
              <p className="text-sm text-gray-500">{video.subdescription[lang]}</p>

              {video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {video.tags.map((tag, i) => (
                    <span key={i} className=" text-gray-700 text-xs px-2 py-1 rounded">
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
