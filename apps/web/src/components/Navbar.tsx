import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <Link href="/home">
            <p className="text-white text-lg font-semibold">Feed</p>
          </Link>
        </div>
        {/* <div className="flex items-center justify-center flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-500 rounded-lg focus:outline-none w-full"
          />
        </div> */}
        <div className="flex items-center space-x-4">
          <Link href="/account">
            <p className="text-white">Account</p>
          </Link>
          <Link href="/api/auth/logout">
            <p className="text-white">Log Out</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
