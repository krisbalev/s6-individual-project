import * as db from "../repositories/index";
import {
  sendData,
  closeConnection,
  connectQueue,
} from "../message-broker/index";

async function sendMessageAndGetResponse(data: any) {
  let response = null;

  connectQueue();
  // Send data and get the response
  try {
    response = await sendData(data);
  } catch (error) {
    console.error("Error while sending data:", error);
  }

  // Close the connection
  await closeConnection();

  return response;
}

export async function GetPosts() {
  const posts = await db.GetPosts();

  const test = await sendMessageAndGetResponse(posts);

  console.log(test, "SHTE EBA");

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
