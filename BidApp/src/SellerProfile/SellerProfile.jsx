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
import { useQuery } from "@tanstack/react-query";
import { AnimatedTooltip } from "./AnimatedToolTip";
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SellerProfile = () => {
  const { user } = useContext(AuthContext);
  const { email: sellerEmail } = useParams();
  console.log("sellerEmail:", sellerEmail);
  const email = user?.email;
  const userEmail = user?.email;
  const axiosPublic = useAxiosPublic();
  const [isFollowing, setIsFollowing] = useState();
  const [favorites, setFavorites] = useState([]);
  // console.log("hsgfshfjhajdghds", isFollowing);
  // useEffect(() => {
  //   const fetchFollowing = async () => {
  //     try {
  //       const res = await axiosPublic.get(`/followers/${sellerEmail}`);
  //       console.log("followers Data", res.data);
  //       setIsFollowing();
  //     } catch (error) {
  //       console.error("Error fetching following sellers:", error);
  //     }
  //   };
  //   if (email) {
  //     fetchFollowing();
  //   }
  // }, [email, axiosPublic]);
  const { data: followersStatus = [], refetch } = useQuery({
    queryKey: ["followersStatus"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/followers/${sellerEmail}`);
      const isFollowing = res.data.followers.some(
        (follower) =>
          follower.followerEmail === email && follower.status === "following"
      );
      setIsFollowing(isFollowing);
      return res.data;
    },
    enabled: !!sellerEmail,
  });
  const handleFollowing = async () => {
    try {
      const res = await axiosPublic.post(`/following/${email}`, {
        email: sellerEmail,
      });
      return res.data;
      // console.log(sellerEmail);
      toast.success("Seller followed successfully!");
      refetch();
      // console.log("follwoing", res.data);
    } catch (error) {
      console.error("Error following seller:", error);
    }
  };
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
    <motion.div
      className="max-w-7xl mx-auto p-6 flex gap-4 "
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-2xl w-6/12 backdrop-blur-md border border-white/10 dark:border-none shadow-2xl overflow-hidden"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-6  md:flex-row items-center md:items-start gap-6 ">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-pink-600 p-3 rounded-xl">
              <HeartIcon className="text-white w-6 h-6" />
            </div>
            <h1 className=" text-2xl font-bold">
              My Favorites Seller
              <BadgeCheck className="text-blue-400 w-8 h-8" />
            </h1>
          </div>
          <div>
            <div className=" items-center flex gap-2 text-yellow-400 mb-4 ml-16">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">4.8 (120 Reviews)</span>
            </div>
            <p className="text-sm text-gray-400">{favorites.length} Seller</p>
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
              {/* <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all text-sm">
                Contact Seller
              </Button> */}
              {/* <Button
                onClick={handleFollowing}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-400/50 transition-all text-sm flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" /> Follow
              </Button> */}
              {favorites.length > 0 ? (
                <div className="gap-6 w-full space-y-2 ">
                  {favorites.map((seller, index) => (
                    <div
                      key={seller._id}
                      className="bg-white flex border border-white/10 rounded-lg shadow hover:shadow-lg transition p-5  "
                    >
                      <div className="flex items-center gap-4 w-full">
                        {/* <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full border-4 border-pink-600"
                  /> */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-400">
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
                          className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-full transition"
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

              {/* <Button
                onClick={handleFollowing}
                className={`bg-gradient-to-r ${
                  isFollowing
                    ? "from-green-400 to-green-500"
                    : "from-blue-500 to-cyan-500"
                } text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-400/50 transition-all text-sm flex items-center gap-1`}
              >
                {isFollowing ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {isFollowing ? "Following" : "Follow"}
              </Button> */}
            </div>
          </div>
        </CardContent>
        {/* <CardContent className=""><FavoritePage /></CardContent> */}
      </motion.div>

      {/* <div className="h-1 w-full my-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-pulse" /> */}

      <motion.div
        className=" border rounded-2xl w-6/12 backdrop-blur-md border border-white/10 bg-white/10 dark:border-none shadow-2xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl p-6 font-bold  ">Listed Products</h3>
        <FollowingSellerProduct />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="rounded-2xl backdrop-blur-lg bg-white/20 border border-white/10 shadow-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            variants={fadeIn}
          >
            <CardContent className="p-4">
              <img
                src="https://via.placeholder.com/200x150"
                alt="Product"
                className="rounded-xl mb-3 w-full h-40 object-cover"
              />
              <h4 className="text-md font-semibold text-gray-100">
                Product Title
              </h4>
              <p className="text-sm text-gray-300">Current Bid: $120</p>
              <Button className="flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all mt-3 w-full text-sm">
                <Eye className="w-4 h-4 mr-1" /> View Auction
              </Button>
            </CardContent>
          </motion.div>
        </div> */}
      </motion.div>

      {/* <motion.div
        className="mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Customer Reviews
        </h3>
        <div className="space-y-4">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/10 text-gray-200">
            <p className="text-sm">
              "Great seller! Very responsive and the product was exactly as
              described."
            </p>
            <p className="text-xs text-gray-400 mt-1">- Buyer01</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/10 text-gray-200">
            <p className="text-sm">
              "Fast shipping and amazing quality. Highly recommend!"
            </p>
            <p className="text-xs text-gray-400 mt-1">- Buyer02</p>
          </div>
        </div>
      </motion.div> */}
    </motion.div>
  );
};

export default SellerProfile;
