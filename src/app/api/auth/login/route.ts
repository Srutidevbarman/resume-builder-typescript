import { normalizeEmail, normalizeString, setAuthCookie } from "@/lib/auth";
import { generateToken } from "@/lib/jwt";
import { mongoDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoDB();
    const body: LoginBody = await req.json();

    const email = normalizeEmail(body.email);
    const password = normalizeString(body.password);

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
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "invalid email or password",
        },
        {
          status: 401,
        },
      );
    }
    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "invalid email or password",
        },
        {
          status: 401,
        },
      );
    }

    const token = generateToken({ userId: user._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "user logged in successfully",
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      },
      {
        status: 200,
      },
    );
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.log("error in login api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
      },
      { status: 500 },
    );
  }
}
