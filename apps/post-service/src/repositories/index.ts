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
  const post = await Post.create(data).catch((error) => {
    return null;
  });
  return post;
}

export async function DeletePost(id: string) {
  const post = await Post.findByIdAndDelete(id);
  return post;
}
