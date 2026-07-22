import { mongoDB } from "@/lib/mongodb";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  try {
    await mongoDB();
    let body: RegisterBody = await req.json();

    let { name, email, mobile, password } = body;

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
  } catch (error) {
    console.log("error in register api", error);
  }
}
