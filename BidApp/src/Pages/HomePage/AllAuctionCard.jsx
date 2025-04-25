import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";


import { FaFlag } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { FaGavel, FaUser } from "react-icons/fa";

import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { WishlistContext } from "../../providers/wishListProvider";
import { cn } from "../../utils/cn";

const AllAuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const {
    _id,
    bids,
    productName,
    description,
    productImage,
    status,
    winner,
    auctionEndTime,
  } = auction;

  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [showModal, setShowModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    if (!auctionEndTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auctionEndTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`https://auctoria-online-auction-platform.onrender.com/wishlist/${userId}`);
        const data = await response.json();
        if (response.ok) {
          const isProductInWishlist = data.wishlist.some((product) => product._id === _id);
          setIsWishlisted(isProductInWishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, _id]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Please log in to wishlist products!" });
      return;
    }

    try {
      const response = await fetch("https://auctoria-online-auction-platform.onrender.com/addToWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: _id, userId }),
      });

      if (response.ok) {
        setIsWishlisted(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Wishlisted!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetchWishlist();
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      Swal.fire({ icon: "warning", title: "Please enter a reason!" });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: _id,
          userEmail: user?.email,
          reason: reportReason,
        }),
      });
  
      if (response.ok) {
        Swal.fire({ icon: "success", title: "Reported successfully!" });
        setReportReason("");
        setShowModal(false);
      } else {
        Swal.fire({ icon: "error", title: "Report failed!" });
      }
    } catch (error) {
      console.error("Error reporting product:", error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-3xl relative z-10 shadow-xl hover:shadow-2xl transition duration-300 bg-white overflow-hidden hover:border border-teal-400"
      )}
    >
      <div className="h-full">
        <img
          className="object-cover w-full h-[200px] items-center rounded-t-xl"
          src={productImage}
          alt={productName}
        />
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-gray-800">
          <div className="flex items-center gap-2 text-sm">
            {status === "expired" ? (
              <>
                <FaUser size={16} />
                <p className="font-bold">Winner {winner}</p>
              </>
            ) : bids?.length > 0 ? (
              <>
                <FaGavel />
                <p className="font-bold">{`${bids.length} Bids`}</p>
              </>
            ) : (
              <p className="font-bold">No bids yet</p>
            )}
          </div>
          {status !== "expired" && auctionEndTime && (
            <div className="text-sm font-bold">
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          )}
        </div>
  
        <div className="px-4 h-[80px]">
          <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{productName}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
  
        <div className="flex justify-between items-center px-4 py-2 border-t">
          <button className="hover:bg-teal-100 p-2 rounded-full" onClick={handleAddToWishlist} disabled={isWishlisted}>
            {isWishlisted ? (
              <IoMdHeart size={24} className="text-red-500" />
            ) : (
              <IoMdHeartEmpty size={24} className="text-gray-500 hover:text-red-400" />
            )}
          </button>
  
          <button className="hover:bg-teal-100 p-2 rounded-full" onClick={() => navigate(`/bid/${_id}`)}>
            <IoEye size={24} className="text-gray-600" />
          </button>
  
          <button className="hover:bg-teal-100 p-2 rounded-full" onClick={() => setShowModal(true)}>
            <FaFlag size={20} className="text-red-600" title="Report" />
          </button>
        </div>
      </div>
  
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Report this Auction</h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-md p-2 text-sm text-gray-700 mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
  
};

export default AllAuctionCard;
