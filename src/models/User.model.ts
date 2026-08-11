import {
  isValidPassword,
  PASSWORD_REQUIREMENTS_MESSAGE,
} from "@/lib/auth";
import { IUser } from "@/types/user.types";
import mongoose, { Document, models } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Omit<IUser, "_id">, Document {
  comparePass(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
    },
    mobile: {
      type: String,
      minlength: [10, "min 10 characters required"],
      maxlength: [10, "max 10 characters required"],
      match: [/^\d{10}$/, "Mobile number must contain 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: isValidPassword,
        message: PASSWORD_REQUIREMENTS_MESSAGE,
      },
      select: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.comparePass = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
const userModel = models.user || mongoose.model<UserDocument>("user", userSchema);

export default userModel;
