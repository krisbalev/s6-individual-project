import { useEffect, useState } from "react";
import Head from "next/head";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import { Post } from "../../types/post";
import { createPost, fetchPosts } from "../../api/posts";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { createUser, getUserById, checkIfUserExists } from "@/api/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserFirstLoginForm from "@/components/UserFirstLoginForm";

// interface HomePageProps {
//   posts: Post[];
// }

const HomePage = ({ posts }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const router = useRouter();
  const user = useUser();

  const checkUser = async () => {
    const check: any = await checkIfUserExists(user.user?.email!);

    if (!check.result) {
      setIsUserModalOpen(true);
    }
  };

  if (user && !user.isLoading) {
    checkUser();
  }

  const handleAddPost = async (post: Post) => {
    try {
      if (await createPost(post)) {
        alert("Post created successfully!");
        router.reload();
      } else {
        alert("Error while creating post, please try again later.");
      }
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

  const handleCreateUser = async (username: string) => {
    const newUser = {
      ...user.user,
      username,
    };
    try {
      if (await createUser(newUser)) {
        alert("Profile setup successfully!");
        router.reload();
      } else {
        alert("Error while creating profile, please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserModalClose = () => {
    setIsUserModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>MyTap</title>
        <link rel="icon" href="/" />
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="mt-10 grid gap-6">
          {posts.collection.reverse().map((post: Post) => (
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

        {isUserModalOpen && (
          <UserFirstLoginForm
            onSubmit={handleCreateUser}
            onClose={handleUserModalClose}
          />
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
