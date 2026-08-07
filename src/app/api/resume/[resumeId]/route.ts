import { getCurrentUser } from "@/lib/getCurrentUser";
import { mongoDB } from "@/lib/mongodb";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await mongoDB();
    const userId = await getCurrentUser();
    const { resumeId } = await params;

    const resume = await resumeModel.findOne({
      _id: resumeId,
      user_id: userId,
    });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "resume not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume found successfully",
        data: resume,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in creating resume", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "error in creating resume",
      },
      {
        status: 500,
      },
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    await mongoDB();
    const userId = await getCurrentUser();
    const { resumeId } = await params;
    const body = await req.json();

    const updateResume = await resumeModel.findOneAndUpdate(
      {
        _id: resumeId,
        user_id: userId,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateResume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "updated resume failed to update",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume updated successfully",
        data: updateResume,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("error in creating resume", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "error in creating resume",
      },
      {
        status: 500,
      },
    );
  }
}
