import { getCurrentUser } from "@/lib/getCurrentUser";
import { mongoDB } from "@/lib/mongodb";
import resumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoDB();
    const userId = await getCurrentUser();
    let newResume = await resumeModel.create({
      user_id: userId,
      title: "",
      summery: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      skills: [],
      certifications: [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume created successfully",
        data: newResume,
      },
      {
        status: 201,
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
