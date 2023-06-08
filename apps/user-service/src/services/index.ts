import * as db from "../repositories/index";

export async function GetUsers() {
  const users = await db.GetUsers();

  return users;
}

export async function GetUserById(id: string) {
  const user = await db.GetUserById(id);

  return user;
}

export async function CreateUser(data: any) {
  const user = await db.CreateUser(data);

  return user;
}

export async function DeleteUsers(id: string) {
  const user = await db.DeleteUser(id);

  return user;
}

export async function CheckIfUserExists(email: string) {
  const user = await db.CheckIfUserExists(email);

  return user;
}
