import { useContext, useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { AuthContext } from "../providers/AuthProvider";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishListProducts, setWishListProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true); 

    fetch(`http://localhost:5000/wishlist/${user.uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Wishlist API Response:", data); 
        setWishListProducts(data.wishlist || []); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load your wishlist.");
        setLoading(false); 
      });
  }, [user]); 
  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading your wishlist...</p> 
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
