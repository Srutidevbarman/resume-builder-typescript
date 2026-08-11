import { getCurrentUser } from "@/lib/getCurrentUser";
import { mongoDB } from "@/lib/mongodb";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoDB();

    const userId = await getCurrentUser();

    const resumes = await resumeModel
      .find({ user_id: userId })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt")
      .lean();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resumes retrieved successfully",
        data: resumes,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "unauthorized") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    console.log("error in retrieving resumes", error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "error in retrieving resumes",
      },
      {
        status: 500,
      },
    );
  }
}
