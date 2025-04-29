import { CardContent } from "../SellerProfile/CardContent";
import { Avatar, AvatarImage, AvatarFallback } from "../SellerProfile/Avatar";
import {
  Star,
  Eye,
  UserPlus,
  BadgeCheck,
  Flag,
  CheckCircle,
  AwardIcon,
} from "lucide-react";
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
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SellerProfile = () => {
  const { user } = useContext(AuthContext);
  const { email: sellerEmail } = useParams();
  console.log("sellerEmail:", sellerEmail);
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  const [isFollowing, setIsFollowing] = useState();
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
      // console.log(sellerEmail);
      toast.success("Seller followed successfully!");
      refetch();
      // console.log("follwoing", res.data);
    } catch (error) {
      console.error("Error following seller:", error);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 mt-28 "
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="lg:flex gap-3 rounded-2xl backdrop-blur-md border border-white/10 dark:border-none shadow-2xl overflow-hidden"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* <Avatar className="w-24 h-24 shadow-lg">
            <AvatarImage src={user?.photoURL} alt="Seller Avatar" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar> */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-1 flex items-center gap-2">
              Seller Name <BadgeCheck className="text-blue-400 w-5 h-5" />
            </h2>
            <p className="text-sm text-gray-300 mb-1">Joined: Jan 2023</p>
            <p className="text-sm text-gray-300 mb-2">Followers: 523</p>
            <div className="flex items-center gap-2 text-yellow-400 mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">4.8 (120 Reviews)</span>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all text-sm">
                Contact Seller
              </Button>
              {/* <Button
                onClick={handleFollowing}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-400/50 transition-all text-sm flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" /> Follow
              </Button> */}

              <Button
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
              </Button>
            </div>
          </div>
        </CardContent>
        <CardContent className="">
          <FavoritePage />
        </CardContent>
      </motion.div>

      <div className="h-1 w-full my-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-pulse" />

      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 to-sky-400 bg-clip-text text-transparent">
          Listed Products
        </h3>
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
