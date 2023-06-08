import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now },
  points: { type: Number, default: 1000 },
});

export const User = mongoose.model("User", userSchema);
