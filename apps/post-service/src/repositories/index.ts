import { Post } from "../models/post";

export async function GetPosts() {
  const posts = await Post.find();
  return posts;
}

export async function GetPostById(id: string) {
  const post = await Post.findById(id);
  return post;
}

export async function CreatePost(data: any) {
  console.log("tuka db", data)
  const post = await Post.create(data).catch((error) => {
    console.log("error", error)
    return null;
  });
  return post;
}

export async function DeletePost(id: string) {
  const post = await Post.findByIdAndDelete(id);
  return post;
}

export async function updatePostUsernames(userId: string, newUsername: string) {
  try {
    await Post.updateMany({ userId }, { $set: { username: newUsername } });
    return true;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function GetPostsByUserId(userId: string) {
  const posts = await Post.find({ userId });
  return posts;
}

export async function LikePost(postId: string, userId: string) {
  const post = await Post.findById(postId);
  if (!post) {
    return null;
  }
  post.likes.push(userId);
  await post.save();
  return post;
}

export async function GetPostLikes(postId: string) {
  const post = await Post.findById(postId);
  if (!post) {
    return null;
  }
  return post.likes;
}

export async function UnlikePost(postId: string, userId: string) {
  const post = await Post.findById(postId);
  if (!post) {
    return null;
  }
  post.likes = post.likes.filter((like) => like !== userId);
  await post.save();
  return post;
}
