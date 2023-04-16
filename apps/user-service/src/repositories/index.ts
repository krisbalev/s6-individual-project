import { PrismaClient } from "database";
const prisma = new PrismaClient();

export async function GetUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function GetUserById(id: string) {
  const user = await prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return user;
}

export async function CreateUser(data: any) {
  const user = await prisma.user
    .create({
      data: data,
    })
    .catch(() => {
      return null;
    });
  return user;
}

export async function UpdateUser(id: string, data: any) {
  const user = await prisma.user
    .update({
      where: {
        id: id,
      },
      data: data,
    })
    .catch(() => {
      return null;
    });
  return user;
}

export async function DeleteUser(id: string) {
  const user = await prisma.user
    .delete({
      where: {
        id: id,
      },
    })
    .catch(() => {
      return null;
    });
  return user;
}
