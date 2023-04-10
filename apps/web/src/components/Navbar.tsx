import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <Link href="/">
                        MyTap
                    </Link>
                </div>
                <div>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
