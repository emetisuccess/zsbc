import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200 text-white text-center px-6">
            <h1 className="text-8xl font-extrabold text-[#0061a1]">404</h1>
            <h2 className="text-3xl font-semibold mt-4 text-black">Page Not Found</h2>
            <p className="mt-2 text-gray-800 max-w-md">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 bg-[#0061a1] rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-300"
            >
                Go Home
            </Link>
        </div>
    )
}

export default NotFound