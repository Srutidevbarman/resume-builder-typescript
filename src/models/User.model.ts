import { IUser } from "@/types/user.types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    mobile: {
      type: String,
      minlength: [10, "min 10 characters required"],
      maxlength: [10, "max 10 characters required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(String(this.password), 10);
});
userSchema.methods.comparePass = function (candidatePassword: string): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};
const userModel = mongoose.model("user", userSchema);

export default userModel;
