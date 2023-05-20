import { useState } from "react";
import Head from "next/head";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import { Post } from "../../types/post";
import { fetchPosts, createPost } from "../../api/posts";
import Navbar from "@/components/Navbar";

interface HomePageProps {
  posts: Post[];
}

const HomePage = ({ posts }: HomePageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = (post: Post) => {
    try {
      createPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>MyTap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* <div className="flex flex-col items-center justify-center">
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to MyTap
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Gamified Social Media
          </p>
        </div> */}

        <div className="mt-10 grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>

        <button
          onClick={handleModalOpen}
          className="fixed bottom-4 right-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Post
        </button>

        {isModalOpen && (
          <PostForm onSubmit={handleAddPost} onClose={handleModalClose} />
        )}
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const posts = await fetchPosts();
  return {
    props: { posts },
  };
};

export default HomePage;
