import * as db from "../repositories/index";

export async function GetPosts() {
  const posts = await db.GetPosts();

  return posts;
}

export async function GetPostById(id: string) {
  const post = await db.GetPostById(id);

  return post;
}

export async function CreatePost(data: any) {
  const post = await db.CreatePost(data);

  return post;
}

export async function DeletePosts(id: string) {
  const post = await db.DeletePost(id);

  return post;
}

export function GetPostsByUserId(userId: string) {
  const posts = db.GetPostsByUserId(userId);

  return posts;
}

export async function updatePostUsernames(userId: string, newUsername: string) {
  try {
    await db.updatePostUsernames(userId, newUsername);
    return true;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function LikePost(postId: string, userId: string) {
  const post = await db.LikePost(postId, userId);

  return post;
}

export async function GetPostLikes(postId: string) {
  const post = await db.GetPostLikes(postId);

  return post;
}

export async function UnlikePost(postId: string, userId: string) {
  const post = await db.UnlikePost(postId, userId);

  return post;
}