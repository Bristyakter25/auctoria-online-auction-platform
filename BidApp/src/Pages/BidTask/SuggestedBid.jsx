import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { io } from "socket.io-client";
const socket = io("https://auctoria-online-auction-platform.onrender.com", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const SuggestedBid = ({ category }) => {
  console.log("product", category);
  const [suggestedBid, setSuggestedBid] = useState(null);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  const { data: suggestBid = [], refetch } = useQuery({
    queryKey: ["suggestBid", category],
    queryFn: async () => {
      const res = await axiosPublic.get(`suggest-bid/${category}`);
      console.log("suggets data", res.data);
      return res.data;
    },
    enabled: !!category,
  });

  useEffect(() => {
    if (suggestBid?.suggestedBid) {
      setSuggestedBid(suggestBid.suggestedBid);
    }
  }, [suggestBid]);
  useEffect(() => {
    // if (!category) return;
    socket.on("suggestedBidUpdate", (update) => {
      if (update.category === category) {
        // console.log("Received Suggested Bid:", update);
        setSuggestedBid(update.suggestedBid);
      }
    });
    return () => {
      socket.off("suggestedBidUpdate");
    };
  }, [category]);
  // useEffect(() => {
  //   if (category) {
  //     const intervalId = setInterval(() => {
  //       console.log("Refetching suggested bid...");
  //       refetch();
  //     }, 10000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [category, refetch]);
  return (
    <div>
      {suggestedBid !== null && (
        <div className="flex">
          <h3 className="text-base mb-3">You can bid this amount </h3>
          <p className="text-base font-bold">${suggestedBid}</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SuggestedBid;
