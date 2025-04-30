import { CardContent } from "../SellerProfile/CardContent";
import { Avatar, AvatarImage, AvatarFallback } from "../SellerProfile/Avatar";
import {
  Star,
  Eye,
  UserPlus,
  BadgeCheck,
  Flag,
  CheckCircle,
  HeartIcon,
  AwardIcon,
} from "lucide-react";
import { Tooltip } from "@mui/material";
import { Button } from "../SellerProfile/Button";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import FavoritePage from "./FavoriteSeller";
import FollowingSellerProduct from "./FollowingSellerProduct";
import { AiFillProduct } from "react-icons/ai";

import { AnimatedTooltip } from "./AnimatedToolTip";
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SellerProfile = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const axiosPublic = useAxiosPublic();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axiosPublic.get(`/favorite/${userEmail}`);
        console.log("favorite seller", res.data);
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
    <motion.div
      className="max-w-7xl mx-auto p-6 lg:flex gap-4 space-y-3 lg:space-y-0"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-2xl lg:w-6/12 backdrop-blur-md border border-white/10 dark:border-none shadow-2xl overflow-hidden"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <CardContent className=" md:flex-row items-center md:items-start gap-6 ">
          <div className="flex items-center p-6 gap-2 bg-blue-500">
            <div className="bg-pink-600 p-3 rounded-xl">
              <HeartIcon className="text-white w-6 h-6" />
            </div>
            <h1 className=" text-2xl font-bold relative">
              My Favorites Seller
              {/* <BadgeCheck className="text-blue-400 w-6 h-6 " /> */}
            </h1>
          </div>
          <div>
            <div className=" items-center flex gap-2 text-yellow-400 mb-4 ml-16 mt-2">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">4.8 (120 Reviews)</span>
              {/* <p className="px-3 border rounded-full bg-green-400 text-sm text-center text-gray-600">
                Verified
              </p> */}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-green-600
  border-b-[28px] border-b-transparent absolute -top-6 -right-2 -rotate-45 p-1"
              ></div>
              <p className=" absolute -top-1 right-0 p-1 text-xl text-white text-center text-gray-800 flex justify-center items-center ">
                {favorites.length}{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mb-2">
            <AnimatedTooltip favorites={favorites} />
          </div>
          {/*    */}
          <div className="flex-1">
            {/* <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1 flex items-center gap-2">
              Seller Name <BadgeCheck className="text-blue-400 w-5 h-5" />
            </h2>
            <p className="text-sm text-gray-300 mb-1">Joined: Jan 2023</p>
            <p className="text-sm text-gray-300 mb-2">Followers: 523</p>
            <div className="flex items-center gap-2 text-yellow-400 mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">4.8 (120 Reviews)</span>
            </div> */}
            <div className="flex gap-2">
              {favorites.length > 0 ? (
                <div className="gap-6 w-full space-y-2 ">
                  {favorites.map((seller, index) => (
                    <div
                      key={seller._id}
                      className="bg-white flex border border-white/10 rounded-lg shadow hover:shadow-lg transition p-5  "
                    >
                      <div className="flex items-center gap-4 w-full">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-700">
                            {seller.name}
                          </h2>
                          <p className="text-gray-400 text-sm">
                            {seller.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right mt-auto">
                        <button
                          onClick={() =>
                            navigate(`/seller-profile/${seller._id}`)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full transition"
                        >
                          profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-16">
                  There is No Seller !!
                </div>
              )}
            </div>
          </div>
        </CardContent>
        {/* <CardContent className=""><FavoritePage /></CardContent> */}
      </motion.div>

      {/* <div className="h-1 w-full my-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-pulse" /> */}

      <motion.div
        className=" border rounded-2xl lg:w-6/12 backdrop-blur-md border border-white/10 bg-white/10 dark:border-none shadow-2xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center p-6 gap-2 bg-blue-500">
          <AiFillProduct
            size={28}
            className="text-white w-12 h-12 bg-green-500 p-2 rounded-xl"
          />
          <h3 className="text-2xl font-bold  ">Listed Products</h3>
        </div>
        <FollowingSellerProduct />
      </motion.div>
    </motion.div>
  );
};

export default SellerProfile;
