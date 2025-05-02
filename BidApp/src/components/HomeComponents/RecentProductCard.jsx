import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../providers/wishListProvider";
import Swal from "sweetalert2";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const RecentProductCard = ({ recentProduct }) => {
  // console.log("product", recentProduct);
  const {
    productName,
    description,
    productImage,
    startingBid,
    auctionStartDate,
    status,
    _id,
    category,
    auctionEndTime, // Assuming this field exists in recentProduct
  } = recentProduct;
  // console.log("recent product", recentProduct);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);
  const userId = user?.uid;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer Effect
  useEffect(() => {
    if (!auctionEndTime || status === "expired") return;

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
  }, [auctionEndTime, status]);

  // Check if the product is already in the wishlist on component mount
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

  const handleAddToWishlist = async () => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
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
        const errorData = await response.json();
        alert(`Failed to add to wishlist: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {status === "upcoming" || status === "live" ? (
        <div className="card card-compact bg-white dark:bg-transparent rounded-2xl transition-all duration-1000 hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">

          <figure className="relative">
            <img
              className="w-full h-[280px]  rounded-xl"
              src={productImage}
              alt="product"
            />

            <p
              className={`px-4 py-0.5 shadow-md text-white text-center text-sm rounded-full absolute top-1 right-1 ${
                status === "upcoming" ? "bg-green-500" : "bg-rose-500"
              } shadow-gray-700`}
            >
              {status}
            </p>
            <div className="absolute bottom-2  left-1/2 transform -translate-x-1/2 bg-white  text-gray-800 px-2 py-0.5 rounded-full text-sm shadow-md z-10 flex items-center gap-2">
              <div className=" px-1 py-0.5 rounded">
                <span className="font-bold">{timeLeft.days}</span> Days
              </div>
              <span className="text-gray-500">•</span>
              <div className=" px-1 py-0.5 rounded">
                <span className="font-bold">{timeLeft.hours}</span> Hours
              </div>
              <span className="text-gray-500">•</span>
              <div className=" px-1 py-0.5  rounded">
                <span className="font-bold">{timeLeft.minutes}</span> Minutes
              </div>
              <span className="text-gray-500">•</span>
              <div className=" px-1 py-0.5  rounded">
                <span className="font-bold">{timeLeft.seconds}</span> Seconds
              </div>
            </div>
          </figure>
          <div className="px-2 p-1">
            <div className="h-[170px] my-4  dark:text-white text-gray-700">
              <h2 className=" text-center h-[70px] my-4 font-bold text-2xl">{productName}</h2>
              <p className="mb-3">
                <span className="font-bold text-lg">Auction Start Date: </span>{" "}
                {formatDate(auctionStartDate)}
              </p>
              <p className="mb-3 text-2xl font-semibold">
                <span className="font-bold text-lg">Starting Bid: </span>${startingBid}
              </p>
              <p className="mb-3">
                <span className="font-bold text-lg">Category: </span>${category}
              </p>
            </div>
            <div className="flex justify-between p-3">
              <button
                className="text-white w-10 h-10 hover:bg-gray-100 border rounded-full flex items-center justify-center"
                onClick={handleAddToWishlist}
                disabled={isWishlisted}
              >
                {isWishlisted ? (
                  <IoMdHeart size={28} className="text-red-600" />
                ) : (
                  <IoMdHeartEmpty
                    size={28}
                    className="text-gray-600 hover:text-red-500"
                  />
                )}
              </button>
              <button
                className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100"
                onClick={() => navigate(`/bid/${_id}`)}
              >
                <IoEye size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RecentProductCard;
