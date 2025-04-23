import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/ShareComponents/Loading/LoadingSpinner";

dayjs.extend(relativeTime);
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 90 },
  }),
};
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const RecentWinner = () => {
  const axiosPublic = useAxiosPublic();
  const { loading, setloading } = useContext(AuthContext);
  const {
    data: auctionWinner = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auctionWinner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recentWinners");
      console.log("winner ", res.data);
      return res?.data ? res.data : [];
    },
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
    });
    socket.on("newWinner", (newWinnerData) => {
      console.log("🎉 New Winner Data Received:", newWinnerData);
      refetch();
    });
    return () => {
      socket.off("newWinner");
      // socket.disconnect();
    };
  }, [refetch]);

  if (loading || isLoading)
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        There is no data is loading!
        <button className="underline" onClick={() => refetch()}>
          Try Again
        </button>
      </p>
    );

  if (!auctionWinner.length)
    return (
      <p className="text-center text-gray-500 py-10">
        There are no recent winners yet!!
      </p>
    );

  return (
    <div>
      <div className="lg:py-5 mb-4 space-y-2">
        <h2 className="text-center lg:text-4xl text-3xl font-bold">
          Recent Winner
        </h2>
        <p className="text-center text-xl ">
          From bidding to winning – see the latest success stories.
        </p>
      </div>
      <motion.section
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 "
        initial="hidden"
        animate="visible"
      >
        {auctionWinner.map((winner, index) => (
          <motion.article
            key={`${winner.productName}-${winner.winningTime}`}
            custom={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            }}
            className="rounded-2xl shadow p-4 bg-white border hover:border-teal-300"
          >
            <motion.img
              src={winner.productImage}
              alt={winner.productName}
              className="w-full h-40 object-cover rounded-xl mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
            />

            <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-800">
              {winner.productName}
            </h3>

            <p className="text-sm text-gray-600">
              Winner: <span className="font-medium">{winner.winner}</span>
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-800">
              Winning Bid:{" "}
              <span className="font-semibold text-emerald-600">
                ${winner.winningBid}
              </span>
            </p>

            <p className="text-xs text-gray-700 mt-1 border px-3 py-1 rounded-full bg-teal-100 w-36">
              {dayjs(winner.winningTime).fromNow()}
            </p>
          </motion.article>
        ))}
      </motion.section>
    </div>
  );
};
export default RecentWinner;
