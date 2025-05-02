// import { useContext, useEffect, useState } from "react";
// import { motion } from "motion/react";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../providers/AuthProvider";

// let interval;

// const FavoritePage = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);
//   const [favorites, setFavorites] = useState([]);
//   const userEmail = user?.email;

//   useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const res = await axiosPublic.get(`/favorite/${userEmail}`);
//         console.log("Favorite Seller Raw Data: ", res.data);
//         const formatted = Array.isArray(res.data)
//           ? res.data?.map((seller) => ({
//               id: seller._id,
//               content: (
//                 <div className="flex items-center space-x-4 mb-4">
//                   <img
//                     src={seller.photoUrl}
//                     alt={seller.name}
//                     className="w-16 h-16 rounded-full border-2 border-pink-500 shadow-md"
//                   />
//                   <div>
//                     <h3 className="text-lg font-bold text-white">
//                       {seller.name}
//                     </h3>
//                     <p className="text-sm text-gray-300">{seller.email}</p>
//                   </div>
//                 </div>
//               ),
//               name: "View Profile",
//               designation: "",
//             }))
//           : [];
//         setFavorites(formatted);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };
//     if (userEmail) {
//       fetchFavorite();
//     }
//   }, [userEmail, axiosPublic]);

//   useEffect(() => {
//     startFlipping();
//     return () => clearInterval(interval);
//   }, [favorites]);

//   const startFlipping = () => {
//     interval = setInterval(() => {
//       setFavorites((prevCards) => {
//         const newArray = [...prevCards];
//         newArray.unshift(newArray.pop());
//         return newArray;
//       });
//     }, 5000);
//   };

//   return (
//     <div className="p-2 max-w-4xl mx-auto">
//       <h2 className="text-3xl mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-center animate-fade-in">
//         Favorites Seller
//       </h2>
//       {favorites && favorites.length > 0 ? (
//         <div className="flex justify-center">
//           <div className="relative h-40 w-80 md:h-40 md:w-96">
//             {Array.isArray(favorites) &&
//               favorites?.map((card, index) => (
//                 <motion.div
//                   key={card?.id || index}
//                   className="absolute dark:bg-gray-700 bg-white h-40 w-80 md:h-40 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
//                   style={{ transformOrigin: "top center" }}
//                   animate={{
//                     top: index * -10,
//                     scale: 1 - index * 0.06,
//                     zIndex: favorites.length - index,
//                   }}
//                 >
//                   <div className="font-normal text-neutral-700 dark:text-neutral-200">
//                     {card?.content || "No Content"}
//                   </div>
//                   <div>
//                     <button className="w-full mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-medium py-2 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
//                       {card?.name}
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-300 text-lg">
//           There is no Favorite Seller
//         </p>
//       )}
//     </div>
//   );
// };

// export default FavoritePage;

// import { useContext, useEffect, useState } from "react";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../providers/AuthProvider";
// import { Tooltip } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { HeartIcon } from "lucide-react";

// const FavoritePage = () => {
//   const axiosPublic = useAxiosPublic();
//   const { user } = useContext(AuthContext);
//   const [favorites, setFavorites] = useState([]);
//   const userEmail = user?.email;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFavorite = async () => {
//       try {
//         const res = await axiosPublic.get(`/favorite/${userEmail}`);
//         setFavorites(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     if (userEmail) {
//       fetchFavorite();
//     }
//   }, [userEmail, axiosPublic]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <div className="bg-pink-500 rounded-2xl p-4">
//               <HeartIcon className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">প্রিয় বিক্রেতারা</h1>
//               <p className="text-gray-400 text-sm">
//                 {favorites.length} জন বিক্রেতা সংরক্ষিত আছে
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden">
//           <div className="grid grid-cols-12 px-6 py-4 font-semibold text-gray-300 text-sm border-b border-gray-700">
//             <div className="col-span-1">#</div>
//             <div className="col-span-2">ছবি</div>
//             <div className="col-span-4">নাম</div>
//             <div className="col-span-3">ইমেইল</div>
//             <div className="col-span-2 text-right">অ্যাকশন</div>
//           </div>
//           {favorites.length > 0 ? (
//             favorites.map((seller, index) => (
//               <div
//                 key={seller._id}
//                 className="grid grid-cols-12 px-6 py-4 items-center text-sm border-b border-gray-800 hover:bg-gray-800 transition"
//               >
//                 <div className="col-span-1 text-gray-400">{index + 1}</div>
//                 <div className="col-span-2">
//                   <Tooltip title={seller.name || "Seller"}>
//                     <img
//                       src={seller.photoUrl}
//                       alt={seller.name}
//                       className="w-10 h-10 rounded-full border-2 border-pink-500 shadow"
//                     />
//                   </Tooltip>
//                 </div>
//                 <div className="col-span-4 font-medium">{seller.name}</div>
//                 <div className="col-span-3 text-gray-300">{seller.email}</div>
//                 <div className="col-span-2 text-right">
//                   <button
//                     onClick={() => navigate(`/seller-profile/${seller._id}`)}
//                     className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-4 py-2 rounded-full transition"
//                   >
//                     প্রোফাইল দেখুন
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-400 py-8">
//               কোনো প্রিয় বিক্রেতা নেই
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FavoritePage;

import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "lucide-react";

const FavoritePage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const userEmail = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axiosPublic.get(`/favorite/${userEmail}`);
        setFavorites(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (userEmail) {
      fetchFavorite();
    }
  }, [userEmail, axiosPublic]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-pink-600 p-3 rounded-xl">
            <HeartIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">আমার প্রিয় বিক্রেতারা</h1>
            <p className="text-sm text-gray-400">
              মোট {favorites.length} জন বিক্রেতা সংরক্ষিত
            </p>
          </div>
        </div>

        {/* Top Tooltip Image Row */}
        <div className="flex flex-wrap gap-3 mb-6">
          {favorites.map((seller) => (
            <Tooltip key={seller._id} title={seller.name} arrow>
              <img
                src={seller.photoUrl}
                alt={seller.name}
                className="w-10 h-10 rounded-full border-2 border-pink-500 shadow"
              />
            </Tooltip>
          ))}
        </div>

        {/* Card Table Layout */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((seller, index) => (
              <div
                key={seller._id}
                className="bg-[#1e293b] border border-gray-700 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  {/* <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full border-4 border-pink-600"
                  /> */}
                  <div>
                    <h2 className="text-lg font-semibold">{seller.name}</h2>
                    <p className="text-gray-400 text-sm">{seller.email}</p>
                  </div>
                </div>
                <div className="text-right mt-auto">
                  <button
                    onClick={() => navigate(`/seller-profile/${seller._id}`)}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-full transition"
                  >
                    প্রোফাইল দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-16">
            এখনো কোনো প্রিয় বিক্রেতা নেই।
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
