import { useEffect, useState } from "react";

import RecentProductCard from "./RecentProductCard";

const LatestAuctions = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetch("https://auctoria-online-auction-platform.onrender.com/recentProducts")
      .then((res) => res.json())
      .then((data) => {
        setRecentProducts(data);
      });
  }, []);

  return (
    <div className=" max-w-7xl mx-auto">
      <div className="py-4">
        <h2 className="lg:text-4xl text-3xl mt-5  font-bold text-center mb-4">
          Latest Auction Buzz!
        </h2>
        <p className="text-base text-center">
          Catch the excitement! See what’s buzzing in our latest live auctions
          today
        </p>
      </div>
      <div className="my-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {recentProducts.map((recentProduct) => (
          <RecentProductCard
            key={recentProduct._id}
            recentProduct={recentProduct}
          ></RecentProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestAuctions;
