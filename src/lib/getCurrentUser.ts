import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("No token found");
  }
  const decode = verifyToken(token);
  if (!decode) {
    throw new Error("unauthorized");
  }
  if (typeof decode !== "string") {
    return decode.userId;
  }
}
