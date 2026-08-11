import {
  isValidEmail,
  isValidPassword,
  normalizeEmail,
  normalizeMobile,
  normalizeString,
  PASSWORD_REQUIREMENTS_MESSAGE,
  setAuthCookie,
} from "@/lib/auth";
import { generateToken } from "@/lib/jwt";
import { mongoDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoDB();
    const body: RegisterBody = await req.json();

    const name = normalizeString(body.name);
    const email = normalizeEmail(body.email);
    const mobile = normalizeMobile(body.mobile);
    const password = normalizeString(body.password);

    if (!name || !email || !password) {
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

    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "please enter a valid email address",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: PASSWORD_REQUIREMENTS_MESSAGE,
        },
        {
          status: 400,
        },
      );
    }

    if (mobile && mobile.length !== 10) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "mobile number must contain 10 digits",
        },
        {
          status: 400,
        },
      );
    }

    const isExisted = await userModel.exists({ email });
    if (isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "user already exists",
        },
        {
          status: 409,
        },
      );
    }
    const newUser = await userModel.create({
      name,
      email,
      password,
      mobile: mobile || undefined,
    });
    const token = generateToken({ userId: newUser._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "user registered successfully",
        data: {
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        },
      },
      {
        status: 201,
      },
    );
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.log("error in register api", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "user already exists",
        },
        { status: 409 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
      },
      { status: 500 },
    );
  }
}
