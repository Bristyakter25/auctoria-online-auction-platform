import { useContext, useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import Tabs from "./Tabs";
import SuggestedBid from "./SuggestedBid";
import AuctionWinner from "./AuctionWinner";
import { BsFillChatTextFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const calculateCountdown = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;

  if (diff <= 0) return "Auction Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  return `${days}d ${hours}h ${minutes}m left`;
};

const Bid = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const item = {
    images: [
      // "https://i.ibb.co.com/LXSdnhYY/deniz-demirci-Ftl-G2pnqh-M4-unsplash.jpg",
      // "https://i.ibb.co.com/LDT5JrZH/deniz-demirci-cp-Fmi-KNcy4o-unsplash.jpg",
      // "https://i.ibb.co.com/2YCqyxQV/deniz-demirci-i0-S-o-J9-Ug-JM-unsplash.jpg",
    ],
  };
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [bidAmount, setBidAmount] = useState("");

  const [messageText, setMessageText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [currentBid, setCurrentBid] = useState(0);
  // console.log("product data", product);

  const {
    data: usersRole = [],
    refetch,
    isLoading: userIsLoading,
  } = useQuery({
    queryKey: "usersRole",
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  const roleUsers = usersRole[0] || {};
  const { role } = roleUsers;

  const isAdminOrSeller = user && (role === "admin" || role === "seller");

  useEffect(() => {
    fetch(`http://localhost:5000/addProducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched product data:", data);
        if (data) {
          setProduct(data);
          if (data.bids?.length > 0) {
            setCurrentBid(Math.max(...data.bids.map((b) => b.amount)));
          }
        } else {
          console.error("No product data found");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));

    socket.on("newBid", (bid) => {
      if (bid.id === id) {
        console.log("bid time", bid.time);
        setProduct((prev) => ({
          ...prev,
          bids: [...(prev.bids || []), bid],
        }));
        setCurrentBid((prevBid) => Math.max(prevBid, bid.amount));
        // console.log("Bid time on frontend:", bid.time);
      }
    });

    socket.on("bidDeleted", ({ productId, bidId }) => {
      if (productId === id) {
        setProduct((prev) => {
          if (!prev || !prev.bids) return prev;

          const updatedBids = prev.bids.filter((bid) => bid._id !== bidId);

          return {
            ...prev,
            bids: updatedBids,
          };
        });

        setCurrentBid((prevBid) => {
          setProduct((prev) => {
            if (!prev || !prev.bids) return prevBid;

            const remainingBids = prev.bids.filter((bid) => bid._id !== bidId);
            return remainingBids.length > 0
              ? Math.max(...remainingBids.map((b) => b.amount))
              : 0;
          });
        });
      }
    });

    return () => {
      socket.off("newBid");
      socket.off("bidDeleted");
    };
  }, [id]);

  const generateSellerId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  console.log("bid id", generateSellerId());
  const handleBid = async () => {
    if (userIsLoading) {
      toast.info("Loading user information, please wait.");
      return;
    }
    if (!user) {
      toast.error("Please log in to place a bid.", { position: "top-right" });
      return;
    }
    // Check if the user is an admin or seller
    if (isAdminOrSeller) {
      toast.warning("Admins and Sellers cannot place bids on items.", {
        position: "top-right",
      });
      return; // Stop the function here
    }

    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      toast.error("Please enter a valid bid amount!", {
        position: "top-right",
      });
      return;
    }
    if (Number(bidAmount) <= product.startingBid) {
      toast.error("Your bid must be at least max to the starting bid!", {
        position: "top-right",
      });
      return;
    }
    if (Number(bidAmount) <= currentBid) {
      toast.warning("Your bid must be higher than the current maximum bid!", {
        position: "top-right",
      });
      return;
    }
    // const bidId = generateSellerId();
    try {
      const res = await fetch(`http://localhost:5000/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bidId: generateSellerId(),
          sellerId: product.sellerId,
          sellerEmail: product.email,
          amount: Number(bidAmount),
          user: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          productName: product.productName,
        }),
      });
      if (res.ok) {
        toast.success("Your bid has been submitted successfully!", {
          position: "top-right",
        });
        setBidAmount("");
        setCurrentBid(Number(bidAmount));
      } else {
        toast.error("There was a problem submitting the bid!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Server problem! Please try again later।", {
        position: "top-right",
      });
    }
  };

  // const handleSendMessage = async () => {
  //   if (!messageText.trim()) {
  //     toast.error("Message cannot be empty.");
  //     return;
  //   }
  //   if (!user?.email || !product?.email || !product?._id) {
  //     toast.error("Some required data is missing.");
  //     return;
  //   }

  //   const payload = {
  //     senderId: user?.email,
  //     receiverId: product?.email,
  //     productId: product?._id,
  //     message: messageText,
  //   };

  //   try {
  //     // const res = await fetch("http://localhost:5000/messages", {

  //     const res = await fetch("http://localhost:5000/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();

  //     if (data.insertedId) {
  //       toast.success("Message sent to seller!");
  //       setShowModal(false);
  //       setMessageText("");
  //     } else {
  //       toast.error("Failed to send message.");
  //     }
  //   } catch (error) {
  //     console.error("Message send error:", error);
  //     toast.error("Server error while sending message.");
  //   }
  // };
  if (!product) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container dark:bg-transparent mx-auto px-4 py-32">
      <div className="grid t grid-cols-1 md:grid-cols-2 gap-8">
        {/* Right Side: Images & Thumbnails */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" p-6 shadow-md  rounded-lg bg-white/10"
        >
          {/* Main Image */}
          <motion.img
            src={product.productImage}
            alt="Auction Item"
            className="w-full mt-24 h-[420px] object-fill rounded-lg"
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 col-reverse">
            {item.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Thumbnail"
                className={`w-32 h-32 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === img ? "border-blue-600" : "border-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </motion.div>
        {/* Left Side: Bidding Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" p-6 shadow-md rounded-lg relative bg-white/10 dark:text-white text-gray-700"
        >
          <div className="text-2xl font-bold mb-2 flex items-center ">
            {" "}
            <div
              className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-blue-500
  border-b-[28px] border-b-transparent absolute -top-6 -right-2 -rotate-45 p-1"
            ></div>
            <h2 className="w-8/12   ">{product.productName} </h2>
            <p className="text-lg  flex justify-center items-center -top-1 right-2 absolute ">
              {product.bids?.length}
            </p>{" "}
          </div>
          <p className="text-md mb-4  "> {product.category}</p>
          <p className=" flex items-center gap-2 ">
            <strong className="flex items-center gap-3">
              <FaGavel /> End
            </strong>{" "}
            {formatDate(product.auctionEndTime)}
          </p>
          <p className="text-sm mt-1 flex items-center gap-2  ">
            <MdWatchLater size={24} />
            {calculateCountdown(product.auctionEndTime)}
          </p>

          {/* Current Bid */}
          <div className="mt-4 flex items-center justify-between space-x-2">
            <div className=" lg:w-3/6 px-8 py-5 bg-white/10 rounded-xl shadow-lg">
              <p className="text-base font-semibold">Current Bid</p>
              <h2 className="text-3xl font-bold ">
                ${currentBid || "No bids yet"}
              </h2>
            </div>
            <div className="lg:w-3/6  px-8 py-5 bg-white/10  rounded-xl shadow-lg">
              <p className="text-base font-semibold">Base Price </p>
              <h2 className="text-3xl font-bold ">${product.startingBid}</h2>
            </div>
          </div>

          {/* Bid Input Field */}
          <div className="lg:mt-6 mt-3">
            {product.status === "expired" ? (
              ""
            ) : (
              <SuggestedBid productId={product._id} />
            )}
          </div>
          <div className=" lg:flex items-center justify-between gap-3 space-y-3 lg:space-y-0">
            <input
              type="number"
              className="w-full p-2 border rounded-md bg-white/10"
              placeholder="Max your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />

            {/* Make a Bid Button */}
            {new Date(product.auctionEndTime) < new Date() ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBid}
                disabled
                className=" w-full bg-gray-500 py-2 rounded-lg flex items-center justify-center gap-2  "
              >
                <FaGavel /> Auction Ended
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBid}
                className=" w-full bg-blue-500 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600  transition"
              >
                <FaGavel /> Make a Bid
              </motion.button>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="   "
          >
            <h3 className="text-xl font-bold mb-3 mt-3">Latest Bids</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product?.bids?.length > 0 ? (
                [...product.bids]
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 3)
                  .map((bid, index) => {
                    const isWinningBid =
                      product.status === "expired" && index === 0;
                    return (
                      <div
                        key={index}
                        className={`p-4 shadow-md rounded-lg transition duration-300 ${
                          isWinningBid
                            ? "bg-blue-100 border-blue-400"
                            : "bg-white/10 "
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-lg font-semibold ${
                              isWinningBid ? "text-amber-700 " : null
                            }`}
                          >
                            ${bid.amount}
                          </p>
                          {isWinningBid && (
                            <span className="text-xs bg-blue-400 text-white px-2 py-1 rounded-full">
                              Winner 👑
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isWinningBid ? "font-medium text-gray-700" : null
                          }`}
                        >
                          Bidder: {bid.user}
                        </p>
                      </div>
                    );
                  })
              ) : (
                <p className="">There is no Bid।</p>
              )}
            </div>
            <div className="my-5">
              <div className="border rounded-lg p-4 shadow-sm mt-6">
                <h4 className="text-md font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact the seller for more info about this product.
                </p>
                {/* <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  <BsFillChatTextFill />
                  Chat With Seller
                </button> */}
                <Link to="/message" state={{ senderId: user?.email, receiverId: product?.email, productId:  product?._id }}><button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"><BsFillChatTextFill />
                Chat With Seller</button></Link>
              </div>

              {/* {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white dark:bg-black p-6 rounded shadow-md w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">
                      Send Message to Seller
                    </h3>
                    <textarea
                      className="w-full dark:bg-black p-2 border rounded mb-4"
                      rows={4}
                      placeholder="Write your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* <AuctionWinner /> */}
      <Tabs
        sellerId={product._id}
        sellerEmail={product.email}
        product={product}
        setProduct={setProduct}
      />
    </div>
  );
};

export default Bid;
