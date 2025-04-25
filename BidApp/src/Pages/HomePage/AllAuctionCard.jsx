import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FaGavel, FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { WishlistContext } from "../../providers/wishListProvider";
import { cn } from "../../utils/cn";
import { SlUserFollowing } from "react-icons/sl";

const AllAuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const {
    _id,
    bids,
    productName,
    description,
    productImage,
    category,
    status,
    winner,
    auctionEndTime,
    email,
  } = auction;
  // console.log("auction data", auction);
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer Effect
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
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  // Wishlist check
  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/wishlist/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          const isProductInWishlist = data.wishlist.some(
            (product) => product._id === _id
          );
          setIsWishlisted(isProductInWishlist);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, _id]);

  // Handle Add to Wishlist
  const handleAddToWishlist = async () => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Log In to add products in wishlist!",
      });
      return;
    }

    const wishlistItem = {
      productId: _id,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:5000/addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
      });

      if (response.ok) {
        setIsWishlisted(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "This Product is successfully Wish Listed!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetchWishlist();

        const updatedWishlistResponse = await fetch(
          `http://localhost:5000/wishlist/${userId}`
        );
        const updatedData = await updatedWishlistResponse.json();
        const isProductInWishlist = updatedData.wishlist.some(
          (product) => product._id === _id
        );
        setIsWishlisted(isProductInWishlist);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-3xl relative z-40 shadow-xl hover:shadow-2xl transition duration-300 bg-white overflow-hidden hover:border border-teal-400"
      )}
    >
      <div className="h-full ">
        <img
          className="object-cover w-full h-[200px] items-center rounded-t-xl"
          src={productImage}
          alt={productName}
        />
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-gray-800">
          {" "}
          {/* Changed text-white to text-gray-800 for better contrast on gradient */}
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
              <>
                <p className="font-bold">No bids yet</p>
              </>
            )}
          </div>
          {/* Display countdown timer if not expired */}
          {status !== "expired" && auctionEndTime && (
            <div className="text-sm font-bold">
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          )}
        </div>

        <div className="px-4 h-[80px]">
          <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {productName}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center px-4 py-2 border-t">
          <button
            onClick={() => navigate(`/SellerProfile/${email}`)}
            className="hover:bg-teal-100 p-2 rounded-full"
          >
            <p>
              <SlUserFollowing />
            </p>
          </button>
          <button
            className="hover:bg-teal-100 p-2 rounded-full"
            onClick={handleAddToWishlist}
            disabled={isWishlisted}
          >
            {isWishlisted ? (
              <IoMdHeart size={24} className="text-red-500" />
            ) : (
              <IoMdHeartEmpty
                size={24}
                className="text-gray-500 hover:text-red-400"
              />
            )}
          </button>

          <button
            className="hover:bg-teal-100 p-2 rounded-full"
            onClick={() => navigate(`/bid/${_id}`)}
          >
            <IoEye size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllAuctionCard;
