import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";
import Course from "@/models/course.model";
import Video from "@/models/video.model";
import UserCourse from "@/models/usercourse.model";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string; videoSlug: string }> },
) {
  const { courseSlug, videoSlug } = await context.params;
  await connectDB();

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub: userId } = await verifyAccessToken(token);

  const { action, watchedTime, duration } = await req.json();

  const course = await Course.findOne({ name: courseSlug });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const video = await Video.findOne({ slug: videoSlug, courseId: course._id });
  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }
  const userCourse = await UserCourse.findOne({
    user: userId,
    course: course._id,
  });

  let updateResult;

  switch (action) {
    case "like":
      const hasLiked = userCourse?.likedVideos?.includes(videoSlug) || false;

      if (!hasLiked) {
        updateResult = await Promise.all([
          Video.updateOne({ _id: video._id }, { $inc: { likes: 1 } }),
          UserCourse.updateOne(
            { user: userId, course: course._id },
            { $addToSet: { likedVideos: videoSlug } },
          ),
        ]);
      } else {
        updateResult = await Promise.all([
          Video.updateOne({ _id: video._id }, { $inc: { likes: -1 } }),
          UserCourse.updateOne(
            { user: userId, course: course._id },
            { $pull: { likedVideos: videoSlug } },
          ),
        ]);
      }
      break;

    case "view":
      const watchPercentage = (watchedTime / duration) * 100;

      if (watchPercentage >= 70) {
        const hasViewed = userCourse?.viewedVideos?.includes(videoSlug) || false;

        if (!hasViewed) {
          updateResult = await Promise.all([
            Video.updateOne({ _id: video._id }, { $inc: { views: 1 } }),
            UserCourse.updateOne(
              { user: userId, course: course._id },
              {
                $addToSet: {
                  viewedVideos: videoSlug,
                  completedLessons: videoSlug,
                },
              },
            ),
          ]);
        }
      }
      break;

    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const updatedVideo = await Video.findById(video._id).lean();

  return NextResponse.json({
    success: true,
    likes: updatedVideo?.likes || video.likes,
    views: updatedVideo?.views || video.views,
  });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string; videoSlug: string }> },
) {
  const { courseSlug, videoSlug } = await context.params;
  await connectDB();

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sub: userId } = await verifyAccessToken(token);

  const course = await Course.findOne({ name: courseSlug });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const video = await Video.findOne({ slug: videoSlug, courseId: course._id }).lean();
  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  const userCourse = await UserCourse.findOne({
    user: userId,
    course: course._id,
  }).lean();

  return NextResponse.json({
    video: {
      likes: video.likes,
      views: video.views,
      durationMinutes: video.durationMinutes,
    },
    userInteractions: {
      hasLiked: userCourse?.likedVideos?.includes(videoSlug) || false,
      hasViewed: userCourse?.viewedVideos?.includes(videoSlug) || false,
    },
  });
}
