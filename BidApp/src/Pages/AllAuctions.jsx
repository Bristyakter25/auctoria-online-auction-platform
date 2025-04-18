import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AllAuctionCard from "./HomePage/AllAuctionCard";

const AllAuctions = () => {
  const [allAuctions, setAllAuctions] = useState([]);
  console.log("auction id", allAuctions);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    fetch("https://auctoria-online-auction-platform.onrender.com/addProducts")
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
          <option value="Jewelry">Jewelry</option>
          <option value="Watches">Watches</option>
          <option value="Art">Art</option>
        </select>
      </div>

      {/* Auction List */}
      <div className="max-w-7xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <AllAuctionCard key={auction._id} auction={auction} />
          ))
        ) : (
          <p className="text-center text-gray-500">No auctions found</p>
        )}
      </div>
    </div>
  );
};

export default AllAuctions;
