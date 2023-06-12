import { Post } from "../types/post";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY || "http://localhost:8080";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${GATEWAY_URL}/post`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const posts = await response.json();
  return posts.collection;
};

export const createPost = async (post: Post): Promise<Post> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();;

  const response = await fetch(`${GATEWAY_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(post),
  });
  const newPost = await response.json();
  return newPost;
};
