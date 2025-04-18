import React from 'react';
import { Link } from 'react-router-dom';

const PageBanner = () => {
  return (
    <section className="w-full h-96 bg-gradient-to-r from-[#f4f7ed] to-[#eef2dc] py-20 px-4 text-center relative overflow-hidden">
      {/* Optional grid pattern background */}
      <div className="absolute inset-0 bg-[url('	https://probid-wp.egenstheme.com/wp-content/plugin…theme-options/images/breadcrumb/breadcrumb-bg.png')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 mt-20">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <div className="mt-2 text-sm">
          <Link to="/" className="text-green-600 text-2xl hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-500">→</span>
          <span className="text-gray-600 text-2xl">About Us</span>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
