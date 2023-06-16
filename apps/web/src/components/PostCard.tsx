import { Post } from "../types/post";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="text-sm text-gray-500 mb-2">
          Posted by <span className="font-medium">{post.username}</span>
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {post.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">{post.content}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-gray-500">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12h18"
                />
              </svg> */}
              <span>512 Likes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
