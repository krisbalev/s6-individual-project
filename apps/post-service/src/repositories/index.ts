import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GetPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function GetPostById(id: string) {
  const post = await prisma.post
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function CreatePost(data: any) {
  const post = await prisma.post
    .create({
      data: data,
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function UpdatePost(id: string, data: any) {
  const post = await prisma.post
    .update({
      where: {
        id: id,
      },
      data: data,
    })
    .catch(() => {
      return null;
    });
  return post;
}

export async function DeletePost(id: string) {
  const post = await prisma.post
    .delete({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return post;
}
