import { getCurrentUser } from "@/lib/getCurrentUser";
import { clearAuthCookie } from "@/lib/auth";
import { mongoDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoDB();
    const userId = await getCurrentUser();

    const user = await userModel.findById(userId).select("_id name email").lean();

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "user retrieved successfully",
        data: {
          user,
        },
      },
      {
        status: 200,
      },
    );
  } catch {
    const response = NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "unauthorized",
      },
      {
        status: 401,
      },
    );

    clearAuthCookie(response);

    return response;
  }
}
