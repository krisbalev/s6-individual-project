import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
  username: String,
});

export const Post = mongoose.model("Post", postSchema);
