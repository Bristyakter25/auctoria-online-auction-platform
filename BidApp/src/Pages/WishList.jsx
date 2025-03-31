import { useContext, useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { AuthContext } from "../providers/AuthProvider";

const WishList = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [wishListProducts, setWishListProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!user?.uid) return; // Ensure user is logged in before fetching

    setLoading(true); // Start loading

    fetch(`http://localhost:5000/wishlist/${user.uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Wishlist API Response:", data); // Debugging
        setWishListProducts(data.wishlist || []); // ✅ Extract "wishlist" array
        setLoading(false); // End loading
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load your wishlist.");
        setLoading(false); // End loading
      });
  }, [user]); // Run effect when user changes

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading your wishlist...</p> {/* Display loading text */}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-5">Your Wishlisted Items</h2>

      {error && <p className="text-center text-red-500">{error}</p>} {/* Display error message if any */}

      {wishListProducts.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 w-[1000px] mx-auto">
          {wishListProducts.map((wishListProduct) => (
            <WishListCard key={wishListProduct._id} wishListProduct={wishListProduct} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in your wishlist.</p>
      )}
    </div>
  );
};

export default WishList;
