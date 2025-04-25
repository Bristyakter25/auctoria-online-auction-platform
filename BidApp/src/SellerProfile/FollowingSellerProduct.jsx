import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { CardDesign, FollowingSellerItem } from "../SellerProfile/CardDesign";
import { cn } from "../utils/cn";
import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { Button } from "../SellerProfile/Button";
import { useNavigate } from "react-router-dom";
// import { IconUserHeart } from "@tabler/icons-react";

const FollowingSellerProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [feed, setFeed] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axiosPublic.get(`/followingSeller/${userEmail}`);
        console.log("Favorite Data", res.data);
        setFeed(res.data);
      } catch (error) {
        console.error("Error fetching following sellers:", error);
      }
    };
    if (userEmail) {
      fetchFollowing();
    }
  }, [userEmail, axiosPublic]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        Favorites Seller Product
      </h2> */}
      <CardDesign className="md:auto-rows-[20rem]">
        {feed.map((seller, index) => (
          <FollowingSellerItem
            key={seller._id}
            title={<p className="text-white">{seller.productName}</p>}
            description={
              <span className="text-sm text-neutral-200 dark:text-neutral-200">
                ${seller.bidWinner}
              </span>
            }
            header={<SellerCard photoUrl={seller?.productImage} />}
            className={cn(index % 3 === 0 && "md:col-span-1")}
            // icon={<IconUserHeart className="h-4 w-4 text-pink-500" />}
          />
        ))}
      </CardDesign>
    </div>
  );
};

const SellerCard = ({ photoUrl }) => {
  const animation = {
    initial: { scale: 0.9, rotate: -3 },
    hover: { scale: 1, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={animation}
      className="flex flex-col h-full w-full items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-neutral-500 dark:border-white/[0.1] space-y-4"
    >
      <img src={photoUrl} alt="" className="object-fill h-[200px] w-full" />
      {/* <Button className="flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all w-full text-sm">
        <Eye className="w-4 h-4 mr-1" /> View Auction
      </Button> */}
      {/* <img
        src={photoUrl}
        alt="Seller"
        className="w-16 h-16 rounded-full shadow-md border-2 border-pink-500"
      /> */}
    </motion.div>
  );
};

export default FollowingSellerProduct;
