import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";
import { Types } from "mongoose";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const decode = verifyToken(token);

    if (
      typeof decode !== "string" &&
      typeof decode?.userId === "string" &&
      Types.ObjectId.isValid(decode.userId)
    ) {
      return decode.userId;
    }
  } catch {
    throw new Error("unauthorized");
  }

  throw new Error("unauthorized");
}
