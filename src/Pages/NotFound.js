import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist. You can visit another
        pages.
      </p>
      <button
        onClick={redirectToHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
