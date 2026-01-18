export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-bold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
