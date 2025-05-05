import React, { useEffect, useState } from "react";
import {
  FaGem, // Jewelry
  FaPaintBrush, // Art
  FaCar, // Cars
  FaClock, // Watches
  FaShoppingBag, // Luxury Bags
  FaLaptop, // Electronics
  FaCrown, // Collectibles
  FaLandmark,
  FaBullseye, // Antiques
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ShareComponents/Loading/LoadingSpinner";

const categoryIcons = {
  Collectibles: <FaCrown size={40} className="text-yellow-500" />,
  Art: <FaPaintBrush size={40} className="text-pink-500" />,
  Cars: <FaCar size={40} className="text-blue-500" />,
  Jewelry: <FaGem size={40} className="text-purple-500" />,
  Watches: <FaClock size={40} className="text-green-500 " />,
  Antiques: <FaLandmark size={40} className="text-red-500" />,
  "Luxury Bags": <FaShoppingBag size={40} className="text-orange-500" />,
  Electronics: <FaLaptop size={40} className="text-gray-600" />,
};

const CategoryCards = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(FaBullseye);
  const navigate = useNavigate();
  console.log("category data", categories);
  useEffect(() => {
    fetch("https://auctoria-online-auction-platform.onrender.com/categorySummary")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    console.log("Clicked category:", categoryName);
    navigate(`/categoryProduct/${categoryName}`);
  };
  // if (isLoading) return <LoadingSpinner />;
  return (

    <div className="p-6 cursor-pointer">
      <div className="mb-6 dark:text-[#4D55CC]">


        {" "}
        <h2 className="lg:text-4xl text-3xl text-center font-bold mb-3 ">
          Category Summary
        </h2>
        <p className=" text-center text-base dark:text-white text-gray-700">
          Discover top picks in this category, place your bids, and win
          limited-time treasures before they’ <br /> re gone. Your next great
          find is just one bid away!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {categories?.map((cat, idx) => (
          <div
            key={idx}
            onClick={() => handleCategoryClick(cat.category)}
            className="bg-white/10 shadow-md rounded-2xl dark:text-white dark:hover:text-gray-700 text-gray-700 overflow-hidden hover:shadow-xl hover:bg-blue-300 transition duration-300 text-center p-6  "
          >
            <div className="mb-4 flex justify-center transition-all duration-700 hover:scale-110 ">
              {categoryIcons[cat.category] || (
                <div className="text-gray-400">No Icon</div>
              )}
            </div>
            <h3 className="text-lg font-semibold">{cat.category}</h3>
            <p className="">{cat.count} items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
