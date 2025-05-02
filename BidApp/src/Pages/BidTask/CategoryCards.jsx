import React, { useEffect, useState } from "react";
import {
  FaGem,           // Jewelry
  FaPaintBrush,    // Art
  FaCar,           // Cars
  FaClock,         // Watches
  FaShoppingBag,   // Luxury Bags
  FaLaptop,        // Electronics
  FaCrown,         // Collectibles
  FaLandmark       // Antiques
} from "react-icons/fa";

const categoryIcons = {
  Collectibles: <FaCrown size={40} className="text-yellow-500" />,
  Art: <FaPaintBrush size={40} className="text-pink-500" />,
  Cars: <FaCar size={40} className="text-blue-500" />,
  Jewelry: <FaGem size={40} className="text-purple-500" />,
  Watches: <FaClock size={40} className="text-green-500" />,
  Antiques: <FaLandmark size={40} className="text-red-500" />,
  "Luxury Bags": <FaShoppingBag size={40} className="text-orange-500" />,
  Electronics: <FaLaptop size={40} className="text-gray-600" />
};

const CategoryCards = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categorySummary")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="lg:text-4xl text-3xl mt-24 dark:text-[#4D55CC]  font-bold text-center mb-4">Category Summary</h2>
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
       <div
       key={idx}
       className="bg-white dark:bg-[#161179] dark:hover:bg-blue-300 shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:bg-blue-200 transition duration-300 text-center p-6"
     >
       <div className="mb-4 flex justify-center">
         {categoryIcons[cat.category] || (
           <div className="text-gray-400">No Icon</div>
         )}
       </div>
       <h3 className="text-lg font-semibold">{cat.category}</h3>
       <p className="text-gray-600">{cat.count} items</p>
     </div>
     
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
