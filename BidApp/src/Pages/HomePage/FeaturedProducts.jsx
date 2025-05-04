import React, { useEffect, useState } from "react";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    fetch("https://auctoria-online-auction-platform.onrender.com/featuredProducts")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedAuctions(data);
        setFilteredAuctions(data);
      })
      .catch((error) =>
        console.error("Error fetching featured auctions:", error)
      );
  }, []);

  useEffect(() => {
    let results = featuredAuctions.filter((auction) =>
      auction?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category !== "All") {
      results = results.filter((auction) => auction.category === category);
    }

    setFilteredAuctions(results);
  }, [searchTerm, category, featuredAuctions]);

  return (
    <div className="">
      <h2 className="lg:text-4xl text-3xl mt-24 dark:text-[#4D55CC]  font-bold text-center mb-4">
        Featured Products
      </h2>
      <p className="text-xl dark:text-white text-center">
        Explore our top-picked featured items loved by shoppers across the
        country.
      </p>

      <div className="grid mt-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-7 mx-3 lg:mx-0">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <FeaturedProductCard key={auction._id} auction={auction} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No auctions found
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
