import { Post } from "@/types/post";
import { useState } from "react";
import Image from "next/image";
import { createPost } from "@/api/posts";

interface PostFormProps {
  onSubmit: (post: any) => void;
  onClose: () => void;
  userId: string;
  username: string;
}

const PostForm = ({ onSubmit, onClose, userId, username }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    // const post = { title, content, userId, username };
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("username", username);
    if (file) {
      formData.append("file", file);
    }

    try {
      console.log(formData);
      onSubmit(formData);
      // await createPost(formData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        setMessage("Please select a valid image file");
      }
    }
  };

  const removeImage = () => {
    setFile(null);
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

          <div className="flex">
            <div className="w-3/4">
              <p className="mb-1 flex items-center justify-center bg-white text-[12px] text-red-500">
                {message}
              </p>
              <div className="relative h-32 w-full cursor-pointer items-center overflow-hidden">
                <input
                  type="file"
                  onChange={handleFile}
                  className="absolute z-10 h-full w-full opacity-0"
                  name="file"
                />
                <div>
                  <div className="flex flex-col text-black">
                    <p className="text-xl">
                      Drag image here or click to select file
                    </p>
                    <p className="text-sm">
                      Attach an image file, not exceeding 5MB in size
                    </p>
                  </div>
                </div>
              </div>
              {file && (
                <div className="flex h-16 w-full items-center justify-between rounded p-3">
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-12 w-12">
                      <Image
                        alt="Selected image"
                        className="h-full w-full"
                        src={URL.createObjectURL(file)}
                        width={500}
                        height={500}
                      />
                    </div>
                    <span className="w-44 truncate">{file.name}</span>
                  </div>
                  <div
                    onClick={removeImage}
                    className="flex h-6 w-6 px-2 cursor-pointer items-center justify-center rounded-sm bg-red-400"
                  >
                    X
                  </div>
                </div>
              )}
            </div>
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
