import React, { useEffect, useState } from "react";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    fetch("hhttp://localhost:5000/featuredProducts")
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
      <h2 className="lg:text-4xl text-3xl  mt-10 font-bold text-center mb-4">
        Featured Products
      </h2>
      <p className="text-xl text-center">
        Explore our top-picked featured items loved by shoppers across the
        country.
      </p>
      {/* 
      <div className="text-center my-5 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search auctions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border w-[400px] p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-[250px] rounded"
        >
          <option value="All">All</option>
          <option value="Antiques">Antiques</option>
          <option value="Electronics">Electronics</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Watches">Watches</option>
          <option value="Art">Art</option>
        </select>
      </div> */}

      <div className="grid mt-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
