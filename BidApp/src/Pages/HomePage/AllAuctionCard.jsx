import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { motion } from "framer-motion";
import { FaGavel } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const AllAuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const { _id, bids, productName, description, productImage } = auction;
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch wishlist from backend when component mounts
  useEffect(() => {
    if (!userId) return;

    // Check if the product is in localStorage (persistent across reloads)
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(_id)) {
      setIsWishlisted(true); // Set the wishlist state if the product is in localStorage
    } else {
      // If not in localStorage, fetch from backend
      const fetchWishlist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/wishlist/${userId}`);
          const data = await response.json();

          if (response.ok) {
            const isProductInWishlist = data.wishlist.some(product => product._id === _id);
            setIsWishlisted(isProductInWishlist); // Update state based on backend data
          } else {
            console.error("Failed to fetch wishlist");
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };

      fetchWishlist();
    }
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

        // Update localStorage with new wishlist
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(_id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        alert("Product added to wishlist!");
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
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg"
    >
      <div className=" h-full overflow-hidden mb-5 bg-white rounded-lg shadow-lg">
        <img className="object-fill object-center w-full h-[350px]" src={productImage} alt="avatar" />

        <div className="flex items-center px-6 py-1 bg-teal-400">
          <p className="flex items-center gap-2 text-gray-600">
            <FaGavel className="rotated-180" /> <span>{bids?.length > 0 ? bids.length : "No Bid"}</span>
          </p>
        </div>

        <div className="px-3 py-2 h-[150px]">
          <h1 className="text-base font-semibold text-gray-800">{productName}</h1>
          <p className="w-full text-gray-700">{description}</p>
        </div>

        <div className="flex justify-between p-3">
          <button className="btn text-white" onClick={handleAddToWishlist} disabled={isWishlisted}>
            {isWishlisted ? (
              <IoMdHeart size={28} className="text-red-600" />
            ) : (
              <IoMdHeartEmpty size={28} className="text-gray-600" />
            )}
          </button>
          <button className="btn" onClick={() => navigate(`/bid/${_id}`)}>
            <IoEye size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AllAuctionCard;
