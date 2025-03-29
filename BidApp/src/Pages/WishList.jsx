import { useContext, useEffect, useState  } from "react";
import WishListCard from "./WishListCard";
import { AuthContext } from "../providers/AuthProvider";


const WishList = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    if (!user?.uid) return; // Ensure user is logged in before fetching

    fetch(`http://localhost:5000/wishlist/${user.uid}`) // Make sure userId is dynamic
    .then((res) => res.json())
    .then((data) => {
      console.log("Wishlist API Response:", data); // Debugging
      setWishListProducts(data.wishlist || []); // ✅ Extract "wishlist" array
    })
    .catch((err) => console.error("Error fetching wishlist:", err));
  
  }, [user]); // Run effect when user changes

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-5">Your Wishlisted Items</h2>
      
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
