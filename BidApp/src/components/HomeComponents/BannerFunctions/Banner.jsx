import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { motion } from "framer-motion";

import pic1 from "../../../assets/vintage items picture/cars.jpeg";
import pic2 from "../../../assets/vintage items picture/clock.jpeg";
import pic3 from "../../../assets/vintage items picture/grammophone.jpeg";
import pic4 from "../../../assets/vintage items picture/lamp image.jpeg";
import pic5 from "../../../assets/vintage items picture/vintage auction.jpeg";

const Banner = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Best Bid Products",
        "Vintage Treasure",
        "Authentic Artifacts",
        "Classic Memorabilia",
        "Rare Collectibles",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  const floatVariant = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    whileHover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gradient-to-r from-yellow-100 via-lime-100 to-green-200 py-20 px-6 md:px-10 lg:px-16 relative overflow-hidden">
      {/* Decorative SVG wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 C360,0 1080,0 1440,100 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <div className="lg:w-[1024px] w-[350px] mx-auto gap-x-5 grid grid-cols-1 lg:grid-cols-2 relative z-10">
        {/* Text Content */}
        <div>
          <h2 className="text-5xl text-black font-extrabold">
            Select Your <br />
            <span className="text-5xl font-extrabold text-green-600">
              <span ref={typedRef}></span>
            </span> <br />
            At Our Auction.
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 relative z-10">
            {/* Left Section: Text and Buttons */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-snug">
                Select Your <span className="text-green-600">Best Bid Product</span> At Our Auction.
              </h2>
              <p className="mt-6 text-base md:text-lg text-black">
                Join us as we carve a path to success, driven by passion, powered by innovation, and we're here to turn them into reality.
              </p>

              <div className="flex sm:flex-row gap-4 mt-10">
                <Link to="/bidInstruction">
                  <button className="btn font-bold px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-green-700 hover:text-white transition duration-300">
                    Start A Bid!
                  </button>
                </Link>
                <Link to="/allAuctions">
                  <button className="btn font-bold px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-green-700 hover:text-white transition duration-300">
                    View All Auction
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Grid with Animation */}
            <div className="w-[530px] mt-2">
              <div className="grid grid-cols-2">
                <div>
                  <motion.img
                    src={pic1}
                    alt="Vintage car"
                    className="w-[250px] rounded-2xl mb-3 h-[120px] cursor-pointer"
                    variants={floatVariant}
                    animate="animate"
                    whileHover="whileHover"
                  />
                  <motion.img
                    src={pic2}
                    alt="Vintage clock"
                    className="w-[250px] rounded-2xl mb-3 h-[160px] cursor-pointer"
                    variants={floatVariant}
                    animate="animate"
                    whileHover="whileHover"
                  />
                  <motion.img
                    src={pic3}
                    alt="Vintage gramophone"
                    className="ml-20 rounded-2xl w-[170px] h-[120px] cursor-pointer"
                    variants={floatVariant}
                    animate="animate"
                    whileHover="whileHover"
                  />
                </div>
                <div>
                  <motion.img
                    src={pic4}
                    alt="Vintage lamp"
                    className="w-[250px] rounded-2xl mb-3 mt-2 h-[140px] cursor-pointer"
                    variants={floatVariant}
                    animate="animate"
                    whileHover="whileHover"
                  />
                  <motion.img
                    src={pic5}
                    alt="Vintage auction"
                    className="w-[250px] rounded-2xl mb-3 h-[270px] cursor-pointer"
                    variants={floatVariant}
                    animate="animate"
                    whileHover="whileHover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
