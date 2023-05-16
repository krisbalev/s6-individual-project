import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);