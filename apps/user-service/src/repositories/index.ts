import { User } from "../models/user";

export async function GetUsers() {
  const users = await User.find();
  return users;
}

export async function GetUserById(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function CreateUser(data: any) {
  const user = await User.create(data).catch((error) => {
    return null;
  });
  return user;
}

export async function DeleteUser(id: string) {
  const user = await User.findByIdAndDelete(id);
  return user;
}

