import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 ">
      <div className="w-full max-w-md p-8 mx-auto text-center ">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="text-9xl font-extrabold text-white opacity-20 ">
              404
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl ">
            Page Not Found
          </h1>

          <p
            className="text-neutral-100 max-w-xs mx-auto "
            style={{ animationDelay: "200ms" }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mt-4 "
            style={{ animationDelay: "400ms" }}
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
