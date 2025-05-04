import { useContext, useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/ShareComponents/Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishListProducts, setWishListProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    fetch(`https://auctoria-online-auction-platform.onrender.com/wishlist/${user.uid}`)
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
    <div className="">
      <div className="text-center mb-10 py-40 ark:text-white py-32 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
        <h2 className="text-5xl dark:text-white font-bold mb-5">Your Wish listed items! </h2>

        <div className="flex dark:text-white items-center justify-center gap-x-3 text-center ">
          <Link to="/" className="text-lg hover:text-blue-500">
            Home
          </Link>
          <p className="mt-2 ">
            {" "}
            <FaLongArrowAltRight />
          </p>
          <p className="text-lg ">Wish List Products</p>
        </div>
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}{" "}
      {wishListProducts.length > 0 ? (
        <div className="lg:w-[900px] w-[380px] mx-auto">
          <div className="grid gap-y-5  lg:grid-cols-2 sm:grid-cols-1 gap-x-4">
            {wishListProducts.map((wishListProduct) => (
              <WishListCard
                key={wishListProduct._id}
                wishListProduct={wishListProduct}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No items in your wishlist.</p>
      )}
    </div>
  );
};

export default WishList;
