import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="w-full px-4 py-20 md:px-20 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left image */}
        <img
          src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img1.webp"
          alt="Professional"
          className="w-full h-auto rounded-md object-cover"
        />

        {/* Right content */}
        <div>
          <h2 className="text-4xl font-semibold mb-4">
            Get In <span className="italic text-gray-500">Know</span>
          </h2>
          <p className=" mb-6">
            Welcome to Auctoria – where digital innovation meets strategic excellence.
            As a dynamic force in the realm of digital marketing, we are dedicated to
            propelling businesses into the spotlight of online success with our rich
            expertise.
          </p>

          <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
            <li>✅ Start your online presence</li>
            <li>✅ Transform your business via Auction</li>
            <li>✅ Grow your audience and customers</li>
            <li>✅ See result like never before</li>
          </ul>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div>
              <p className="text-xl font-bold">3.5k+</p>
              <p className="text-sm ">Customer Trust</p>
            </div>
            <div>
              <p className="text-xl font-bold">700k</p>
              <p className="text-sm ">Active Product</p>
            </div>
            <div>
              <p className="text-xl font-bold">5.6k</p>
              <p className="text-sm ">Seller & Buyer</p>
            </div>
          </div>

         
        </div>
      </div>

      {/* Quote/testimonial section */}
      <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-2 gap-10 items-center">
        <div className=" p-6 rounded-md border-1-4 border-green-600">
          <p className="italic  mb-2">
            “I work with Alquds John on many projects, he always took aggressive key expectations with his creativity
            work and fantastic type service artwork and simple communication.”
          </p>
          <p className="font-semibold ">Leslie Alexander</p>
        </div>

        <img
          src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home1-about-img2.webp"
          alt="Art Showcase"
          className="w-full h-auto rounded-md object-cover"
        />
      </div>
    </section>
  );
};

export default AboutUs;
