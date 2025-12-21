"use client";

import { Language } from "@/lib/translations/language";
import { ICourse } from "@/models/course.model";
import Image from "next/image";
import Link from "next/link";
interface CourseCardProps {
  course: ICourse;
  lang: Language;
}

export default function CourseCard({ course, lang }: CourseCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 border border-gray-200">
      <Link href={`/courses/${course.name}`}>
        <div className="relative w-full h-56">
          <Image
            src={course.thumbnailUrl || "/placeholder-course.jpg"}
            alt={course.title[lang]}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900">{course.title[lang]}</h3>

          <p className="text-gray-600 mt-2 line-clamp-3">{course.description[lang]}</p>
        </div>
      </Link>
    </div>
  );
}
