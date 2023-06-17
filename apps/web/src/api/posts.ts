import { Post } from "../types/post";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY || "http://localhost:8080";

export const fetchPosts = async (): Promise<Post[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/post`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const posts = await response.json();
  return posts.collection;
};

export const createPost = async (post: Post): Promise<Post> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

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

export const fetchPostsByUser = async (userId: string): Promise<Post[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/post/posts/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const posts = await response.json();
  return posts.collection;
};

export const likePost = async (
  postId: string,
  userId: string
): Promise<Post> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(
    `${GATEWAY_URL}/post/like/${postId}/userId/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData,
      },
    }
  );

  const post = await response.json();
  return post;
};

export const getPostLikes = async (postId: string): Promise<string[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/post/likes/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const likes = await response.json();
  return likes.collection;
};

export const unlikePost = async (
  postId: string,
  userId: string
): Promise<Post> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(
    `${GATEWAY_URL}/post/unlike/${postId}/userId/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData,
      },
    }
  );

  const post = await response.json();
  return post;
};
