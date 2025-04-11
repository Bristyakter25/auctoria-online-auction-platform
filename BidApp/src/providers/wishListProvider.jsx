import {  useEffect, useState, useContext, useCallback, createContext } from "react";
import { AuthContext } from "./AuthProvider";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchWishlist = useCallback(async () => {
    if (!user?.uid) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/wishlist/${user.uid}`);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      console.log("Fetched wishlist data:", data);

      if (Array.isArray(data)) {
        setWishlist(data);
      } else if (Array.isArray(data?.wishlist)) {
        setWishlist(data.wishlist);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

 
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        loading,
        refetchWishlist: fetchWishlist, 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
