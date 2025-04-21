import { useContext, useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/ShareComponents/Loading/LoadingSpinner";

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
    return <LoadingSpinner />;
  }

  return (
    <div className=" max-w-7xl mx-auto mt-24 mb-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-5 py-3 shadow-lg bg-teal-100 max-w-7xl mx-auto rounded-xl ">
        Your Wishlisted Items
      </h2>
      {error && <p className="text-center text-red-500">{error}</p>}{" "}
      {/* Display error message if any */}
      {wishListProducts.length > 0 ? (
        <div className="grid gap-y-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4">
          {wishListProducts.map((wishListProduct) => (
            <WishListCard
              key={wishListProduct._id}
              wishListProduct={wishListProduct}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in your wishlist.</p>
      )}
    </div>
  );
};

export default WishList;
