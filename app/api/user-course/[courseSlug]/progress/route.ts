import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import Course from "@/models/course.model";
import UserCourse from "@/models/usercourse.model";
import Video from "@/models/video.model";
import { cookies } from "next/headers";

export async function GET(req: Request, context: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await context.params;
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub: userId } = await verifyAccessToken(token);

  const course = await Course.findOne({ name: courseSlug }).lean();
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const videos = await Video.find({ courseId: course._id });

  const userCourse = await UserCourse.findOne({
    user: userId,
    course: course._id,
    isActive: true,
  }).lean();

  return NextResponse.json({
    completedLessons: userCourse?.completedLessons ?? [],
    totalLessons: videos.length,
  });
}

export async function PATCH(req: Request, context: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await context.params;
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub: userId } = await verifyAccessToken(token);
  const { videoSlug, completed } = await req.json();

  const course = await Course.findOne({ name: courseSlug });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  await UserCourse.updateOne(
    { user: userId, course: course._id },
    completed
      ? { $addToSet: { completedLessons: videoSlug } }
      : { $pull: { completedLessons: videoSlug } },
  );

  return NextResponse.json({ success: true });
}
