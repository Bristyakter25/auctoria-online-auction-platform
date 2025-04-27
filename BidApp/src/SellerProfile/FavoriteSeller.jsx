// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../providers/AuthProvider";

// const FavoritePage = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);
//   const [favorites, setFavorites] = useState([]);
//   const userEmail = user?.email;

//   useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const res = await axiosPublic.get(`/favorite/${userEmail}`);
//         setFavorites(res.data);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };
//     if (userEmail) {
//       fetchFavorite();
//     }
//   }, [userEmail, axiosPublic]);

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 text-center animate-fade-in">
//         প্রিয় সেলার
//       </h2>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//       >
//         {favorites && favorites.length > 0 ? (
//           favorites.map((seller, index) => (
//             <motion.div
//               key={seller._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.15 }}
//               className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300"
//             >
//               <div className="flex items-center space-x-4 mb-4">
//                 <img
//                   src={seller.photoUrl}
//                   alt={seller.name}
//                   className="w-16 h-16 rounded-full border-2 border-pink-500 shadow-md"
//                 />
//                 <div>
//                   <h3 className="text-lg font-bold text-white">
//                     {seller.name}
//                   </h3>
//                   <p className="text-sm text-gray-300">{seller.email}</p>
//                 </div>
//               </div>
//               <button className="w-full mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-medium py-2 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
//                 View Profile
//               </button>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-300 text-lg">
//             কোনো প্রিয় সেলার পাওয়া যায়নি।
//           </p>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default FavoritePage;

import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";

let interval;

const FavoritePage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axiosPublic.get(`/favorite/${userEmail}`);
        console.log("Favorite Seller Raw Data: ", res.data);
        const formatted = Array.isArray(res.data)
          ? res.data?.map((seller) => ({
              id: seller._id,
              content: (
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full border-2 border-pink-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {seller.name}
                    </h3>
                    <p className="text-sm text-gray-300">{seller.email}</p>
                  </div>
                </div>
              ),
              name: "View Profile",
              designation: "",
            }))
          : [];
        setFavorites(formatted);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    if (userEmail) {
      fetchFavorite();
    }
  }, [userEmail, axiosPublic]);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, [favorites]);

  const startFlipping = () => {
    interval = setInterval(() => {
      setFavorites((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop());
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="p-2 max-w-4xl mx-auto">
      <h2 className="text-3xl mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-center animate-fade-in">
        Favorites Seller
      </h2>
      {favorites && favorites.length > 0 ? (
        <div className="flex justify-center">
          <div className="relative h-40 w-80 md:h-40 md:w-96">
            {Array.isArray(favorites) &&
              favorites?.map((card, index) => (
                <motion.div
                  key={card?.id || index}
                  className="absolute dark:bg-gray-700 bg-white h-40 w-80 md:h-40 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                  style={{ transformOrigin: "top center" }}
                  animate={{
                    top: index * -10,
                    scale: 1 - index * 0.06,
                    zIndex: favorites.length - index,
                  }}
                >
                  <div className="font-normal text-neutral-700 dark:text-neutral-200">
                    {card?.content || "No Content"}
                  </div>
                  <div>
                    <button className="w-full mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-medium py-2 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                      {card?.name}
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-300 text-lg">
          There is no Favorite Seller
        </p>
      )}
    </div>
  );
};

export default FavoritePage;
