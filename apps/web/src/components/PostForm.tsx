import { Post } from "@/types/post";
import { useState } from "react";

interface PostFormProps {
  onSubmit: (post: Post) => void;
  onClose: () => void;
}

const PostForm = ({ onSubmit, onClose }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = { title, content };
    onSubmit(post);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <div className="bg-white rounded-lg p-8 z-10 w-1/3">
        <h2 className="text-2xl font-medium mb-4 text-black text-center">
          Add New Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 font-bold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block mb-2 font-bold text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
