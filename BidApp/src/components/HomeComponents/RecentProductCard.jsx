import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import { WishlistContext } from "../../providers/wishListProvider";
import Swal from "sweetalert2";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
const RecentProductCard = ({ recentProduct }) => {
  console.log("product", recentProduct);
  const {
    productName,
    description,
    productImage,
    startingBid,
    auctionStartDate,
    status,
    _id,
  } = recentProduct;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);
  const userId = user?.uid;

  // ✅ Check if the product is already in the wishlist on component mount
  useEffect(() => {
    if (!userId) return;

    // Fetch wishlist from backend to ensure it's for the logged-in user
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
          setIsWishlisted(isProductInWishlist); // Update state based on backend data
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, _id]); // Re-run effect when userId or _id changes

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
        setIsWishlisted(true); // Update state immediately
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "This Product is successfully Wish Listed!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetchWishlist();

        // Re-fetch wishlist to ensure state consistency
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
    <div className="card  card-compact bg-base-100 w-[320px] mx-auto shadow-xl">
      <figure>
        <img
          className="w-full h-[280px] object-cover object-fill relative"
          src={productImage}
          alt="product"
        />
      </figure>
      <p>
        {status === "upcoming" ? (
          <>
            <p className="px-4 py-0.5 bg-green-500 shadow-md text-white shadow-gray-700 text-center text-sm rounded-full absolute top-1 right-1">
              {status}
            </p>
          </>
        ) : status === "live" ? (
          <p className="px-4 py-0.5 bg-rose-500 shadow-md shadow-gray-700 text-center text-white text-sm rounded-full absolute top-1 right-1">
            {status}
          </p>
        ) : (
          ""
        )}
      </p>
      <div className="card-body">
        <h2 className="card-title font-bold text-2xl text-center">
          {productName}
        </h2>
        {/* <p>{description}</p> */}
        <p>
          <span className="font-bold">Auction Start</span>{" "}
          {formatDate(auctionStartDate)}
        </p>
        <p>
          <span className="font-bold">Starting Bid:</span> {startingBid}
        </p>
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
  );
};

export default RecentProductCard;
