import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { GiQueenCrown } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationTrophy from "../../assets/Animation Trophy.json";
import { AiOutlineProduct } from "react-icons/ai";

const AuctionWinner = ({ product }) => {
  const axiosPublic = useAxiosPublic();
  console.log("winner data", product);
  const {
    data: auctionWinner = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auctionWinner"],
    queryFn: async () => {
      const res = await axiosPublic.get("/winner-auction");
      console.log("Auction Winner data", res.data);
      return res.data;
    },
    enabled: false,
  });
  console.log("Loading and isError", isLoading, isError);
  const handleCheckExpired = async () => {
    await refetch();
  };

  return (
    <>
      {product.status === "expired" ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border  p-6 w-full max-w-2xl mx-auto hover:shadow-xl duration-300"
        >
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center gap-4">
              {/* <GiQueenCrown size={40} className="text-amber-500" /> */}
              <div className="flex items-center gap-3">
                <FaUser size={20} className="text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {product.winner}
                  </h2>
                  <p className="text-sm text-gray-500">Winning Auction</p>
                </div>
              </div>
            </div>
            <Player
              autoplay
              loop
              src={animationTrophy}
              className="w-[100px] h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              {/* <FaUser size={20} className="text-gray-500" /> */}
              <AiOutlineProduct size={20} className="text-gray-500" />
              {/* <span className="font-medium">Product </span> */}
              <span className="text-gray-600 font-bold">
                {product.productName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <RiMoneyDollarCircleLine size={24} className="text-gray-500" />
              <span className="font-medium">Winning Bid</span>
              <span className="text-lg font-semibold text-gray-500">
                $ {product.winningBid}
              </span>
            </div>

            <div className="flex text-sm text-gray-500 gap-2">
              <IoMdTime size={24} className="text-gray-500" />
              {new Date(product.winningTime).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Link to="/bid-history">
              <button className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white shadow-md">
                Payment
              </button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          <p className="text-center text-3xl font-bold">
            There is no data in my Pocket!!
          </p>
          {/* <button onClick={handleCheckExpired} className="btn btn-info">
            Check
          </button> */}
        </>
      )}
    </>
  );
};

export default AuctionWinner;
