"use client";

import Link from "next/link";
import clsx from "clsx";

export default function CourseVideoItem({
  href,
  title,
  duration,
  isActive,
  isCompleted,
}: {
  href: string;
  title: string;
  duration: number;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx("block px-4 py-3 hover:bg-gray-900 transition", isActive && " font-medium")}
    >
      <div className="flex justify-between items-center">
        <span className={clsx(isCompleted && "line-through text-gray-400")}>{title}</span>
        <span className="text-xs text-gray-500">{duration} min</span>
      </div>
    </Link>
  );
}
