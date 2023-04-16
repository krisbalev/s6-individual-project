import { Post } from '../types/post';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:3002/post');
  const posts = await response.json();
  return posts;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await fetch('http://localhost:3002/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const newPost = await response.json();
  return newPost;
}
