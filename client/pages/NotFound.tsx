import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-aadhaar-orange mb-4">404</h1>
          <p className="text-2xl text-aadhaar-blue font-semibold mb-4">
            Oops! Page not found
          </p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist in the Aadhaar System
            Intelligence Engine.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-aadhaar-orange to-yellow-500 hover:from-aadhaar-blue hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
          >
            Return to Executive Dashboard
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
