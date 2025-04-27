import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllAuctionCard from "./HomePage/AllAuctionCard";
import { cn } from "../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
const AllAuctions = () => {
  const [allAuctions, setAllAuctions] = useState([]);
  console.log("auction id", allAuctions);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/addProducts")
      .then((res) => res.json())
      .then((data) => {
        setAllAuctions(data);
        setFilteredAuctions(data);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  }, []);

  useEffect(() => {
    let results = allAuctions.filter(
      (auction) =>
        auction?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ Prevent undefined error
    );

    if (category !== "All") {
      results = results.filter((auction) => auction.category === category);
    }

    setFilteredAuctions(results);
  }, [searchTerm, category, allAuctions]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-10 pt-10 mb-5">
        All Auctions
      </h2>

      {/* Search & Filter Section */}
      <div className="text-center my-5 flex flex-wrap justify-center gap-4 ">
        {/* <FaSearch className="" /> */}
        <input
          type="text"
          placeholder="Search auctions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded lg:w-3/12"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded lg:w-2/12  "
        >
          <option value="All">All</option>
          <option value="Antiques">Antiques</option>
          <option value="Electronics">Electronics</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Cars">Cars</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Watches">Watches</option>
          <option value="Art">Art</option>
        </select>
      </div>
      <div
        className={cn(
          "max-w-7xl mx-auto gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 "
        )}
      >
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction, idx) => (
            <div
              key={auction?._id || idx} // Use auction _id as key if available, fallback to index
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-stone-800/[0.8] block rounded-3xl"
                    layoutId="hoverBackground" // Keep layoutId for animation
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              <AllAuctionCard key={idx} auction={auction} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No auctions found</p>
        )}
      </div>
    </div>
  );
};

export default AllAuctions;
