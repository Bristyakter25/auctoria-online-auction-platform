import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const RecentProductCard = ({ recentProduct }) => {
  const { productName, description, productImage, startingBid, auctionStartDate, _id } = recentProduct;
  const { user } = useContext(AuthContext);
  const [isWishlisted, setIsWishlisted] = useState(false); // Corrected state name

  // Check if the product is already in the wishlist on component mount
  useEffect(() => {
    const userId = user?.uid;
    if (!userId) return;

    // Check if the product is in localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(_id)) {
      setIsWishlisted(true); // If product is in localStorage, mark it as added
    } else {
      // If not in localStorage, fetch wishlist from backend
      const fetchWishlist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/wishlist/${userId}`);
          const data = await response.json();
          
          if (response.ok) {
            const isProductInWishlist = data.wishlist.some((product) => product._id === _id);
            setIsWishlisted(isProductInWishlist); // Set state based on backend response
          } else {
            console.error("Failed to fetch wishlist");
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };

      fetchWishlist();
    }
  }, [user, _id]);

  const handleAddToWishlist = async () => {
    const userId = user?.uid;

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
        setIsWishlisted(true); // Update UI immediately
        alert("Product added to wishlist!");

        // Store the updated wishlist in localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(_id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Update localStorage
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
    <div className="card dark:bg-purple-700 card-compact bg-base-100 w-[320px] mx-auto shadow-xl">
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
