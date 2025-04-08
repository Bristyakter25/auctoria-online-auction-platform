import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const RecentProductCard = ({ recentProduct }) => {
  const { productName, description, productImage, startingBid, auctionStartDate, _id } = recentProduct;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Define navigate
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userId = user?.uid;

  // ✅ Check if the product is already in the wishlist on component mount
  useEffect(() => {
    if (!userId) return;

    // Fetch wishlist from backend to ensure it's for the logged-in user
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
        alert("Product added to wishlist!");

        // Re-fetch wishlist to ensure state consistency
        const updatedWishlistResponse = await fetch(`http://localhost:5000/wishlist/${userId}`);
        const updatedData = await updatedWishlistResponse.json();
        const isProductInWishlist = updatedData.wishlist.some(product => product._id === _id);
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
        <img className="w-full h-[250px]" src={productImage} alt="product" />
      </figure>
      <div className="card-body gap-y-2">
        <h2 className="card-title font-bold text-2xl text-center">{productName}</h2>
        <p>{description}</p>
        <p>
          <span className="font-bold">Starting Bid:</span> {startingBid}
        </p>
        <p>
          <span className="font-bold">Auction Start Date:</span> {auctionStartDate}
        </p>
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
    </div>
  );
};

export default RecentProductCard;
