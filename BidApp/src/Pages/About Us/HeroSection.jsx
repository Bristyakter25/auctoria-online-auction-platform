
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Swiper } from 'swiper/types';

function HeroSection() {
  return (
    <div className="min-h-screen bg-base-300">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="text-left">
                  <p className="text-red-500 text-2xl font-bold">Welcome to Auction House</p>
                  <h1 className="text-5xl font-bold mb-6">
                    Discover, Bid & Win Exclusive Digital Assets
                  </h1>
                  <p className="py-6 text-gray-500">
                    Dive into the world of digital auctions! Explore rare collectibles, bid on unique NFTs,
                    and grow your digital collection with ease.
                  </p>
                  <Link
                    to="/allAuctions"
                    className="btn btn-primary bg-green-500 border-none hover:bg-red-500 text-white"
                  >
                    View All Auctions
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <img
                  src="https://bidout-nextjs.vercel.app/_next/static/media/banner2-girl.24b835ee.png"
                  className="rounded-lg"
                  alt="Auction"
                />

                {/* SVG Icons */}
                {/* <svg className="w-8 h-8 text-red-400 absolute top-1/4 right-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute top-1/2 left-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute bottom-1/4 right-1/4" ...>...</svg> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="text-left">
                  <p className="text-red-500 text-2xl font-bold">Welcome to Auction House</p>
                  <h1 className="text-5xl font-bold mb-6">
                    Discover, Bid & Win Exclusive Digital Assets
                  </h1>
                  <p className="py-6 text-gray-500">
                    Dive into the world of digital auctions! Explore rare collectibles, bid on unique NFTs,
                    and grow your digital collection with ease.
                  </p>
                  <Link
                    to="/allAuctions"
                    className="btn btn-primary bg-green-500 border-none hover:bg-red-500 text-white"
                  >
                    View All Auctions
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <img
                  src="https://bidout-nextjs.vercel.app/_next/static/media/banner2-girl.24b835ee.png"
                  className="rounded-lg"
                  alt="Auction"
                />

                {/* SVG Icons */}
                {/* <svg className="w-8 h-8 text-red-400 absolute top-1/4 right-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute top-1/2 left-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute bottom-1/4 right-1/4" ...>...</svg> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="hero min-h-screen bg-base-300">
            <div className="hero-content flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <div className="text-left">
                  <p className="text-red-500 text-2xl font-bold">Welcome to Auction House</p>
                  <h1 className="text-5xl font-bold mb-6">
                    Discover, Bid & Win Exclusive Digital Assets
                  </h1>
                  <p className="py-6 text-gray-500">
                    Dive into the world of digital auctions! Explore rare collectibles, bid on unique NFTs,
                    and grow your digital collection with ease.
                  </p>
                  <Link
                    to="/allAuctions"
                    className="btn btn-primary bg-green-500 border-none hover:bg-red-500 text-white"
                  >
                    View All Auctions
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <img
                  src="https://bidout-nextjs.vercel.app/_next/static/media/banner2-girl.24b835ee.png"
                  className="rounded-lg"
                  alt="Auction"
                />

                {/* SVG Icons */}
                {/* <svg className="w-8 h-8 text-red-400 absolute top-1/4 right-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute top-1/2 left-1/4" ...>...</svg>
                <svg className="w-8 h-8 text-red-400 absolute bottom-1/4 right-1/4" ...>...</svg> */}
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* You can duplicate SwiperSlide for more slides if needed */}
        {/* Example: Another slide with different title or image */}

      </Swiper>
    </div>
  );
}

export default HeroSection;

