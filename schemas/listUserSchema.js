import mongoose from "mongoose";

const ListUserSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const ListUser = mongoose.model("listUser", ListUserSchema);
