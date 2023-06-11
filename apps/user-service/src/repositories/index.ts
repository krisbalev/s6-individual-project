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
    console.log(error);
    return null;
  });
  return user;
}

export async function DeleteUser(id: string) {
  const user = await User.findByIdAndDelete(id);
  return user;
}

export async function CheckIfUserExists(email: string) {
  const user = await User.findOne({ email: email })

  if (user) {
    return user.id;
  }
  return false;
}

export async function GetUsernamesPerId(ids: string[]) {
  const users = await User.find({ _id: { $in: ids } });
  const usernames: {}[] = [];

  users.forEach((user) => {
    const res = {
      username: user.username,
      id: user.id,
    }
    usernames.push(res);
  });
  return usernames;
}
