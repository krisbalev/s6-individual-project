import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const UserFirstLoginForm = ({ onSubmit, onClose }: any) => {
  const user = useUser();
  const [username, setUsername] = useState(user.user?.nickname!);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUsername: string = username;
    onSubmit(newUsername);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <div className="bg-white rounded-lg p-8 z-10 w-1/3">
        <h2 className="text-2xl font-medium mb-4 text-black text-center">
          Welcome, {user.user?.name}!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 font-bold text-gray-700 text-center text-xl"
            >
              To finish your profile, please enter a username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFirstLoginForm;
