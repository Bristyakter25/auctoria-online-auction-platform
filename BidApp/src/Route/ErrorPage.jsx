import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../src/assets/icon/error animation.json';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
      <div className="w-80 md:w-96">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-red-600 mt-6">Oops! Page not found</h1>
      <p className="text-gray-700 text-lg mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
