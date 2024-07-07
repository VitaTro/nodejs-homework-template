import mongoose from "mongoose";
const { Schema } = mongoose;

const users = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      required: true,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", users);
