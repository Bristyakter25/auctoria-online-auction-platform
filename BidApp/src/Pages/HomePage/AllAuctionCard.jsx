import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";
import { FaGavel } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { WishlistContext } from "../../providers/wishListProvider";

const AllAuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const { _id, bids, productName, description, productImage, category } =
    auction;
  console.log("category", category);
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);

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
      className="rounded-xl shadow-xl hover:shadow-2xl transition duration-300 bg-white overflow-hidden border"
    >
      <div className="h-full">
        <img
          className="object-cover object-fill w-full h-64 items-center rounded-t-xl"
          src={productImage}
          alt={productName}
        />

        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white">
          <p className="flex items-center gap-2 text-sm">
            <FaGavel />{" "}
            {bids?.length > 0 ? `${bids.length} Bids` : "No Bids Yet"}
          </p>
        </div>

        <div className="px-4 py-3">
          <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {productName}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center px-4 py-3 border-t">
          <button
            className="hover:bg-gray-100 p-2 rounded-full"
            onClick={handleAddToWishlist}
            disabled={isWishlisted}
          >
            {isWishlisted ? (
              <IoMdHeart size={24} className="text-red-500" />
            ) : (
              <IoMdHeartEmpty size={24} className="text-gray-500" />
            )}
          </button>

          <button
            className="hover:bg-gray-100 p-2 rounded-full"
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
