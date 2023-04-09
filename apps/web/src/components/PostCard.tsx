import { Post } from '../types/post';

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {post.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
