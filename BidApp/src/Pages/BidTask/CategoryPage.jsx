import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaFlag } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { FaGavel, FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { WishlistContext } from "../../providers/wishListProvider";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const axiosPublic = useAxiosPublic();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { refetchWishlist } = useContext(WishlistContext);
  const [timeLeftMap, setTimeLeftMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [following, setFollowing] = useState(false);
  const userEmail = user?.email;
  const { categoryName } = useParams();
  const {
    data: categoryData = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: "categoryData",
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${categoryName}`);
      console.log("category products", res.data);
      return res.data;
    },
  });
  const firstProduct = categoryData[0] || {};
  const {
    _id,
    description,
    productImage,
    status,
    winner,
    category,
    startingBid,
    auctionEndTime,
    email: sellerEmail,
  } = firstProduct;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updatedTimes = {};

      categoryData.forEach((product) => {
        const end = new Date(product.auctionEndTime).getTime();
        const distance = end - now;

        if (distance <= 0) {
          updatedTimes[product._id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          updatedTimes[product._id] = { days, hours, minutes, seconds };
        }
      });

      setTimeLeftMap(updatedTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [categoryData]);

  useEffect(() => {
    if (!userId) return;
    //category Api

    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/wishlist/${userId}`
        );

        const data = await response.json();
        if (response.ok) {
          const isProductInWishlist = data.wishlist.some(
            (product) => product._id === _id
          );
          setIsWishlisted(isProductInWishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, _id]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please log in to wishlist products!",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/addToWishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: _id, userId }),
      });

      if (response.ok) {
        setIsWishlisted(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Wishlisted!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetchWishlist();

        const updatedWishlistResponse = await fetch(
          `http://localhost:5000/wishlist/${userId}`
        );
        const updatedData = await updatedWishlistResponse.json();
        const isProductInWishlist = updatedData.wishlist.some(
          (product) => product._id === _id
        );
        setIsWishlisted(isProductInWishlist);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      Swal.fire({ icon: "warning", title: "Please enter a reason!" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: _id,
          userEmail: user?.email,
          reason: reportReason,
        }),
      });

      if (response.ok) {
        Swal.fire({ icon: "success", title: "Reported successfully!" });
        setReportReason("");
        setShowModal(false);
      } else {
        Swal.fire({ icon: "error", title: "Report failed!" });
      }
    } catch (error) {
      console.error("Error reporting product:", error);
    }
  };
  //Following Seller Data
  const { data: followersStatus = [], refetch } = useQuery({
    queryKey: ["followersStatus", sellerEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/followers/${sellerEmail}`);
      console.log("Requesting followers for", sellerEmail);
      return res.data;
    },
    enabled: !!sellerEmail && !!userEmail,
  });
  useEffect(() => {
    if (followersStatus?.followers && userEmail) {
      const isFollowing = followersStatus.followers.some(
        (follower) =>
          follower.followerEmail === userEmail &&
          follower.status === "following"
      );
      setFollowing(isFollowing);
    }
  }, [followersStatus, userEmail]);

  const handleFollowing = async () => {
    try {
      const res = await axiosPublic.post(`/following/${userEmail}`, {
        email: sellerEmail,
      });

      console.log("sellerEmail", sellerEmail);
      toast.success("Seller followed successfully!");
      setFollowing(true);
      refetch();
      return res.data;
      // console.log("follwoing", res.data);
    } catch (error) {
      console.error("Error following seller:", error);
    }
  };

  if (isLoading) {
    return (
      <div className=" mt-20">
        <p className="flex items-center justify-center">
          {" "}
          <Loader size={32} /> <span>products...</span>
        </p>
      </div>
    );
  }
  if (categoryData.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No products found in {category} category.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" mt-16 "
    >
      <div className="bg-green-50 h-[300px] mb-8  ">
        <div className=" h-full flex flex-col items-center justify-center">
          <p className="text-4xl font-sans font-bold  flex items-center">
            Product Category:{category}
          </p>
          <p className="flex items-center text-xl gap-1">
            Home{" "}
            <span>
              <GoArrowRight size={24} />
            </span>{" "}
            Product{" "}
            <span>
              <GoArrowRight size={24} />
            </span>
            <p className="text-blue-600">{category}</p>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryData.map((product) => (
          <div className="rounded-3xl relative z-10 cursor-pointer shadow-xl hover:shadow-2xl transition duration-300 bg-white/10 overflow-hidden">
            <img
              className="object-cover w-full h-[200px] items-center rounded-t-xl relative "
              src={product.productImage}
              alt={product.productName}
            />
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500">
              <div className="flex items-center gap-2 text-sm">
                {status === "expired" ? (
                  <>
                    <FaUser size={16} />
                    <p className="font-bold">Winner {product.winner}</p>
                  </>
                ) : product.bids?.length > 0 ? (
                  <>
                    <FaGavel />
                    <p className="font-bold">{`${product.bids.length} Bids`}</p>
                  </>
                ) : (
                  <p className="font-bold">No bids yet</p>
                )}
              </div>
              {product.status !== "expired" && product.auctionEndTime && (
                <div className="text-sm font-bold">
                  {timeLeftMap[product._id] && (
                    <>
                      {timeLeftMap[product._id].days > 0 &&
                        `${timeLeftMap[product._id].days}d `}
                      {timeLeftMap[product._id].hours}h{" "}
                      {timeLeftMap[product._id].minutes}m{" "}
                      {timeLeftMap[product._id].seconds}s
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="px-2 h-[80px]">
              <h2 className="text-lg font-bold mb-1 line-clamp-1">
                {product.productName}
              </h2>
              <p className="text-sm line-clamp-2">{product.description}</p>
            </div>
            <div className="flex items-center justify-between p-2 ">
              <div>
                {" "}
                <p>Base Price</p>
                <p>$ {product.startingBid}.00</p>
              </div>

              <button
                // onClick={() => navigate(`/SellerProfile/${email}`)}
                onClick={handleFollowing}
                className="bg-blue-200 p-2 rounded-full px-3 py-0.5 "
              >
                <p className="font-bold text-blue-500  ">
                  {/* <SlUserFollowing size={20} />  */}
                  {following ? "Following" : "follow"}
                </p>
              </button>
            </div>
            <div className="flex justify-between items-center px-4 py-2 border-t">
              <button
                className="hover:bg-blue-200 p-2 rounded-full"
                onClick={handleAddToWishlist}
                disabled={isWishlisted}
              >
                {isWishlisted ? (
                  <IoMdHeart size={24} className="text-red-500" />
                ) : (
                  <IoMdHeartEmpty size={24} className=" hover:text-red-400" />
                )}
              </button>

              <button
                className="hover:bg-blue-200 p-2 rounded-full"
                onClick={() => navigate(`/bid/${product._id}`)}
              >
                <IoEye size={24} className="" />
              </button>

              <button
                className="hover:bg-blue-200 p-2 rounded-full"
                onClick={() => setShowModal(true)}
              >
                <FaFlag size={20} className="" title="Report" />
              </button>
            </div>
          </div>
        ))}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 ">
                Report this Auction
              </h3>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full border rounded-md p-2 text-sm mb-4"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReport}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;
