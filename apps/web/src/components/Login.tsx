import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Login = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");

    }
  }, [user, router]);

  const handleLogin = () => {
    router.push("/api/auth/login?returnTo=/home");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center text-black">
      <div className="max-w-md w-full mx-auto p-8 sm:p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login to MyTap
        </h1>
        <form className="space-y-4">
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
