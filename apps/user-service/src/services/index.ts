import * as prisma from "../repositories/index";

export async function GetUsers() {
  const users = await prisma.GetUsers();

  return users;
}

export async function GetUserById(id: string) {
  const user = await prisma.GetUserById(id);

  return user;
}

export async function CreateUser(data: any) {
  const user = await prisma.CreateUser(data);

  return user;
}

export async function UpdateUsers(id: string, data: any) {
  const user = await prisma.UpdateUser(id, data);

  return user;
}

export async function DeleteUsers(id: string) {
  const user = await prisma.DeleteUser(id);

  return user;
}
