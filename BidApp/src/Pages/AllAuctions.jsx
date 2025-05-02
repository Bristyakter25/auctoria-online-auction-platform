import { useEffect, useState } from "react";
import AllAuctionCard from "./HomePage/AllAuctionCard";
import { motion, AnimatePresence } from "framer-motion";
const AllAuctions = () => {
  const [allAuctions, setAllAuctions] = useState([]);
  console.log("auction id", allAuctions);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

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
    <div >
      <h2 className="lg:text-4xl text-3xl pt-24  dark:text-[#4D55CC]  font-bold text-center mb-4">
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
          className="border dark:text-white text-black p-2 rounded lg:w-3/12 bg-white/10"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border dark:text-white dark:bg-gray-800 text-black p-2 rounded lg:w-2/12 "
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        <AnimatePresence>
          {filteredAuctions.length > 0 ? (
            filteredAuctions.map((auction, idx) => (
              <motion.div
                key={auction?._id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: idx * 0.05,
                }}
                whileHover={{ scale: 1.03 }}
                className="relative group block p-2 h-full w-full"
              >
                <AllAuctionCard key={idx} auction={auction} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No auctions found</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllAuctions;
