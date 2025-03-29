import { useEffect, useState } from "react";
import AllAuctionCard from "./HomePage/AllAuctionCard";

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
    let results = allAuctions.filter(auction =>
      auction?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ Prevent undefined error
    );

    if (category !== "All") {
      results = results.filter(auction => auction.category === category);
    }

    setFilteredAuctions(results);
  }, [searchTerm, category, allAuctions]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-10 pt-10 mb-5">All Auctions</h2>

      {/* Search & Filter Section */}
      <div className="text-center my-5 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search auctions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
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
      <div className="w-[900px] mx-auto">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map(auction => (
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
