import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="text-center max-w-md">
        
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or was moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}