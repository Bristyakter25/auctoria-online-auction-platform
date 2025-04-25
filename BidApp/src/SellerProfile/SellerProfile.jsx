import { CardContent } from "../SellerProfile/CardContent";
import { Avatar, AvatarImage, AvatarFallback } from "../SellerProfile/Avatar";
import { Star, Eye, UserPlus, BadgeCheck, Flag } from "lucide-react";
import { Button } from "../SellerProfile/Button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../SellerProfile/Tabs";
import { motion } from "framer-motion";
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SellerProfile = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-2xl backdrop-blur-md bg-white/30 border border-white/10 shadow-2xl overflow-hidden"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-24 h-24 shadow-lg">
            <AvatarImage
              src="https://via.placeholder.com/150"
              alt="Seller Avatar"
            />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
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
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-400/50 transition-all text-sm flex items-center gap-1">
                <UserPlus className="w-4 h-4" /> Follow
              </Button>
            </div>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Repeat product cards dynamically */}
        </div>
      </motion.div>

      <motion.div
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
      </motion.div>
    </motion.div>
  );
};

export default SellerProfile;
