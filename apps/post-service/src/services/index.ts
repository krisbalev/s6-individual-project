import * as db from "../repositories/index";
import {
  sendData,
  closeConnection,
  connectQueue,
} from "../message-broker/index";

async function sendMessageAndGetResponse(data: any) {
  let response = null;


  // Send data and get the response
  try {
    await connectQueue();
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

  const userIds: any = posts.map((post) => post.userId);

  const replyData = await sendMessageAndGetResponse(userIds) as string;

  const data = JSON.parse(replyData);

  console.log(data, "SHTE EBA");

  const formattedPosts: {}[] = [];

  for (const post of posts) {
    const matchingUser = data.find((user: any) => user.id === post.userId);
    const formattedPost = { title: post.title, content: post.content, username: matchingUser?.username };
    formattedPosts.push(formattedPost);
  }  

  return formattedPosts;
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
