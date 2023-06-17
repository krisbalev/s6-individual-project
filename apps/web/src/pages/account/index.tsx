import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserById, checkIfUserExists, changeUsername } from "@/api/users";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { fetchPostsByUser } from "@/api/posts";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";
import router from "next/router";
import EdintProfileForm from "@/components/EditProfileModal";

const AccountPage = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const user = useUser();
  const [posts, setPosts] = useState<any>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const checkUser = async () => {
    const check: any = await checkIfUserExists(user.user?.email!);

    const loggedUser: any = await getUserById(check.result);
    setLoggedInUser(loggedUser);
  };

  const fetchPostsAsync = async () => {
    const posts = await fetchPostsByUser(loggedInUser?._id);
    const reversedPosts = posts.length > 0 ? [...posts].reverse() : [];
    setPosts(reversedPosts);
  };

  useEffect(() => {
    if (user && !user.isLoading) {
      checkUser();
    }
  }, [user]);

  useEffect(() => {
    if (loggedInUser) {
      fetchPostsAsync();
    }
  }, [loggedInUser]);

  const editProfile = async (newUsername: string) => {
    const result = await changeUsername(loggedInUser._id, newUsername);
    if (result) {
      alert("Username changed successfully!");
      router.reload();
    } else {
      alert("Error while changing username, please try again later.");
    }
  };

  const handleModalOpen = () => {
    setIsUserModalOpen(true);
  };

  const handleUserModalClose = () => {
    setIsUserModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <article className="mt-7 mx-2 sm:mx-10 md:mx-20 flex flex-col sm:flex-row">
        <main className="w-full sm:w-1/3 sm:flex-col">
          <div className="rounded-justify-center border bg-gray-600 p-6">
            <div className="mb-6 h-64">
              <Image
                src={user.user?.picture!}
                alt="User profile image"
                height={500}
                width={500}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-center text-lg font-bold">{loggedInUser?.username}</p>
          </div>
          <button
            onClick={handleModalOpen}
            className="mt-2 flex w-full items-center justify-center roundepx-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Edit Profile
          </button>
        </main>
        <div className="w-full sm:w-2/3 pl-4">
          <main>
            <div>
              <p className="pb-2 text-xl text-black font-medium">YOUR POSTS</p>
              <hr className="border border-black" />
              <div className="my-5 mx-3 grid gap-3">
                {posts.reverse().map((post: Post) => (
                  <PostCard key={post.title} post={post} />
                ))}
              </div>
            </div>
          </main>
        </div>
        {isUserModalOpen && (
          <EdintProfileForm
            onSubmit={editProfile}
            onClose={handleUserModalClose}
            user={loggedInUser}
          />
        )}
      </article>
    </div>
  );
};

export default AccountPage;
