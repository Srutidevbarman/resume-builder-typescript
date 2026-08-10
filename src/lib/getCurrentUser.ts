import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("unauthorized");
  }

  try {
    const decode = verifyToken(token);

    if (typeof decode !== "string" && decode?.userId) {
      return decode.userId;
    }
  } catch {
    throw new Error("unauthorized");
  }

  throw new Error("unauthorized");
}
