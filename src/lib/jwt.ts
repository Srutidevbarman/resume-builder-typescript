import { JWTPayload } from "@/types/user.types";
import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret(), {
    algorithms: ["HS256"],
  });
};
