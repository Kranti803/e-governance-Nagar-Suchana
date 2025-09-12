import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  municipalityId: string;
  ward: string;
  role: "admin" | "citizen";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    municipalityId: { type: String, required: true },
    ward: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "citizen"], default: "citizen" },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
