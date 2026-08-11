import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { clearAuthCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json<ApiResponse>(
    {
      success: true,
      message: "logged out successfully",
    },
    {
      status: 200,
    },
  );

  clearAuthCookie(response);

  return response;
}
