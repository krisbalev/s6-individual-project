import * as prisma from "../repositories/index";

export async function GetPosts() {
  const posts = await prisma.GetPosts();

  return posts;
}

export async function GetPostById(id: string) {
  const post = await prisma.GetPostById(id);

  return post;
}

export async function CreatePost(data: any) {
  const post = await prisma.CreatePost(data);

  return post;
}

export async function UpdatePosts(id: string, data: any) {
  const post = await prisma.UpdatePost(id, data);

  return post;
}

export async function DeletePosts(id: string) {
  const post = await prisma.DeletePost(id);

  return post;
}
