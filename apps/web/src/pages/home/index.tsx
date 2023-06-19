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
import PostPopup from "@/components/PostPopup";

// interface HomePageProps {
//   posts: Post[];
// }

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const router = useRouter();
  const user = useUser();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPostsAsync = async () => {
    setPosts([]);
    const posts = await fetchPosts();
    const reversedPosts = posts.length > 0 ? [...posts].reverse() : [];
    setPosts(reversedPosts);
  };

  const checkUser = async () => {
    const check: any = await checkIfUserExists(user.user?.email!);

    if (!check.result) {
      setIsUserModalOpen(true);
    } else {
      const user: any = await getUserById(check.result);
      setLoggedInUser(user);
    }
  };

  useEffect(() => {
    if (user && !user.isLoading) {
      checkUser();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    fetchPostsAsync();
  }, []);

  const handleAddPost = async (post: any) => {
    console.log(post);
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

  const handlePostModalOpen = (post: Post) => {
    setIsPostModalOpen(true);
    setSelectedPost(post);
  };

  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
    fetchPostsAsync();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>MyTap</title>
        <link rel="icon" href="/" />
      </Head>

      <Navbar />

      {loggedInUser ? (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="mt-10 grid gap-6">
            {posts.reverse().map((post: Post) => (
              <span key={post._id} onClick={() => handlePostModalOpen(post)}>
                <PostCard key={post._id} post={post} />
              </span>
            ))}
          </div>

          {isPostModalOpen && selectedPost && (
            <PostPopup post={selectedPost} onClose={handlePostModalClose} />
          )}

          <button
            onClick={handleModalOpen}
            className="fixed bottom-4 right-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Add Post
          </button>

          {isModalOpen && (
            <PostForm
              onSubmit={handleAddPost}
              onClose={handleModalClose}
              userId={loggedInUser._id}
              username={loggedInUser.username}
            />
          )}

          {isUserModalOpen && (
            <UserFirstLoginForm
              onSubmit={handleCreateUser}
              onClose={handleUserModalClose}
            />
          )}
        </main>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-black font-bold text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
