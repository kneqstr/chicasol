"use server";

import { connectDB } from "@/lib/db";
import UserCourse from "@/models/usercourse.model";
import Course from "@/models/course.model";
import { revalidatePath } from "next/cache";

export async function markVideoAsCompleted(
  userId: string,
  courseSlug: string,
  videoSlug: string,
  completed: boolean,
) {
  try {
    await connectDB();

    const course = await Course.findOne({ name: courseSlug });
    if (!course) throw new Error("Course not found");

    const userCourse = await UserCourse.findOne({
      user: userId,
      course: course._id,
    });

    if (!userCourse) throw new Error("User course not found");

    let completedLessons: string[] = userCourse.completedLessons || [];

    if (completed) {
      if (!completedLessons.includes(videoSlug)) {
        completedLessons.push(videoSlug);
      }
    } else {
      completedLessons = completedLessons.filter((slug) => slug !== videoSlug);
    }

    const totalVideos = await Course.countDocuments({ _id: course._id });
    const progress =
      totalVideos > 0 ? Math.round((completedLessons.length / totalVideos) * 100) : 0;

    await UserCourse.updateOne(
      { _id: userCourse._id },
      {
        completedLessons,
        progress,
        isCompleted: progress === 100,
      },
    );

    revalidatePath(`/my-courses/${courseSlug}`);
    revalidatePath(`/my-courses/${courseSlug}/${videoSlug}`);

    return { success: true };
  } catch (error) {
    console.error("Error marking video as completed:", error);
    throw error;
  }
}
