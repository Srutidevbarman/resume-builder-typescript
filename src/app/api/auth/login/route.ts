import { generateToken } from "@/lib/jwt";
import { mongoDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoDB();
    let body: LoginBody = await req.json();

    let { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "all fields are required",
        },
        {
          status: 400,
        },
      );
    }
    let isExisted = await userModel.findOne({ email });
    if (!isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        },
      );
    }
    const isMatch = isExisted.comparePass(password);
    if (!isMatch) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 401,
        },
      );
    }

    let token = generateToken({ userId: isExisted._id.toString() });

    let response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "user registered successfully",
        data: {
          user: {
            _id: isExisted._id,
            name: isExisted.name,
            email: isExisted.email,
          },
        },
      },
      {
        status: 201,
      },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    console.log("error in register api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
        error: {
          error,
        },
      },
      { status: 500 },
    );
  }
}
