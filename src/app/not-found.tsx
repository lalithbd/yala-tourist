import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-3 text-lg text-gray-600">Destination not found</p>
      <p className="mt-1 text-sm text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
