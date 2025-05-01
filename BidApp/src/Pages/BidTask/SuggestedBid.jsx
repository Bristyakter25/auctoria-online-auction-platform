import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const SuggestedBid = () => {
  const { id } = useParams();
  console.log("productId is", id);
  const [suggestedBid, setSuggestedBid] = useState(null);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  console.log("suggested bid is", suggestedBid);
  const { data: suggestBid = {}, refetch } = useQuery({
    queryKey: ["suggestBid"],
    queryFn: async () => {
      if (!id) return;
      const res = await axiosPublic.get(`/suggest-bid/${id}`);
      console.log("suggets data", res.data);
      return res.data;
    },
    enabled: id && id !== "undefined",
  });

  useEffect(() => {
    if (suggestBid?.suggestedBid) {
      setSuggestedBid(suggestBid.suggestedBid);
    }
  }, [suggestBid]);
  useEffect(() => {
    // if (!category) return;
    if (!id) return;
    socket.on("suggestedBidUpdate", (update) => {
      if (update.id === id) {
        setSuggestedBid(update.suggestedBid);
      }
    });
    return () => {
      socket.off("suggestedBidUpdate");
    };
  }, [id]);

  return (
    <div>
      {suggestedBid !== null && (
        <div className="flex">
          <h3 className="text-base mb-3">You can bid this amount </h3>
          <p className="text-base font-bold">
            {" "}
            <span className="ml-2">${Number(suggestedBid)}</span>
          </p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SuggestedBid;
