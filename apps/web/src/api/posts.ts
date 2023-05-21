import { Post } from "../types/post";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GATEWAY + "/post" ||
      "http://localhost:8080/post"
  );
  const posts = await response.json();
  return posts;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GATEWAY + "/post" ||
      "http://localhost:8080/post",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }
  );
  const newPost = await response.json();
  return newPost;
};
