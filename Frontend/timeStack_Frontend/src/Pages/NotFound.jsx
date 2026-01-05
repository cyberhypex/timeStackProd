
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-6xl font-bold text-blue-700">404</h1>
      <p className="text-lg text-blue-600 mt-2">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
    
  );
}
