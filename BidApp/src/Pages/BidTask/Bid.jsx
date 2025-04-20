import { useContext, useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import Tabs from "./Tabs";
import SuggestedBid from "./SuggestedBid";
import AuctionWinner from "./AuctionWinner";
import { BsFillChatTextFill } from "react-icons/bs";
// import { MdCancel } from "react-icons/md";

const socket = io("https://auctoria-online-auction-platform.onrender.com", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const Bid = () => {
  const { user } = useContext(AuthContext);
  // const item = {
  //   images: [],
  // };
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [messageText, setMessageText] = useState("");
const [showModal, setShowModal] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [currentBid, setCurrentBid] = useState(0);
  console.log("product data", product);
  useEffect(() => {
    console.log(`Fetching product with id: ${id}`);
    fetch(
      `https://auctoria-online-auction-platform.onrender.com/addProducts/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched product data:", data);
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
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      toast.error("Please enter a valid bid amount!", {
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
      const res = await fetch(
        `https://auctoria-online-auction-platform.onrender.com/bid/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bidId: generateSellerId(),
            sellerId: product.sellerId,
            sellerEmail: product.email,
            amount: Number(bidAmount),
            user: user?.displayName,
            email: user?.email,
            productName: product.productName,
            productImage: product.productImage,
          }),
        }
      );
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

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }
    if (!user?.email || !product?.email || !product?._id) {
      toast.error("Some required data is missing.");
      return;
    }
    
    const payload = {
      senderId: user?.email, // assuming email is used as ID
      receiverId: product?.email, // seller email
      productId: product?._id,
      message: messageText,
    };
  
    try {
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (data.insertedId) {
        toast.success("Message sent to seller!");
        setShowModal(false);
        setMessageText("");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Message send error:", error);
      toast.error("Server error while sending message.");
    }
  };
  
  

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Right Side: Images & Thumbnails */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" p-6  rounded-lg "
        >
          {/* Main Image */}
          <div className="flex items-center justify-center w-full h-[450px]">
  <motion.img
    src={product.productImage}
    alt="Auction Item"
    className="w-full h-[400px] object-cover rounded-lg"
    whileHover={{ scale: 1 }}
    transition={{ duration: 0.8 }}
  />
</div> 
        </motion.div>
        {/* Left Side: Bidding Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" p-6 shadow-md rounded-lg border relative "
        >
          <div className="text-2xl font-bold mb-2 flex items-center ">
            {" "}
            <div
              className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-teal-300
  border-b-[28px] border-b-transparent absolute -top-5 -right-1 -rotate-45 "
            ></div>
            <h2 className="w-8/12 ">{product.productName} </h2>
            <p className="text-lg text-gray-600 flex justify-center items-center -top-1 right-1 absolute">
              {product.bids?.length}
            </p>{" "}
          </div>
          <p className="text-gray-500 text-sm mb-4"> {product.category}</p>

          {/* Start & End Time */}
          <p className="text-gray-700">
            <strong>Auction Start:</strong>{" "}
            {new Date(product.auctionStartDate).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong>Auction ends:</strong>{" "}
            {new Date(product.auctionEndTime).toLocaleString()}
          </p>

          {/* Current Bid */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-600">Current Bid:</p>
            <p className="text-3xl font-bold">
              $ {currentBid || "No bids yet"}
            </p>
          </div>

          {/* Bid Input Field */}
          <div className="mt-4">
            {product.status === "expired" ? (
              ""
            ) : (
              <SuggestedBid category={product.category} />
            )}

            <input
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Max your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>

          {/* Make a Bid Button */}
          {new Date(product.auctionEndTime) < new Date() ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBid}
              disabled
              className=" mt-4 w-full bg-gray-400 py-2 rounded-lg flex items-center justify-center gap-2  "
            >
              <FaGavel /> Auction Ended
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBid}
              className="mt-4 w-full bg-teal-400 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500  transition"
            >
              <FaGavel /> Make a Bid
            </motion.button>
          )}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="   "
          >
            <h3 className="text-xl font-bold text-gray-600 mb-3 mt-3">
              Latest Bids
            </h3>
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
                        className={`p-4 shadow-md rounded-lg border transition duration-300 ${
                          isWinningBid
                            ? "bg-teal-100 border-teal-400"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-lg font-semibold ${
                              isWinningBid ? "text-amber-700" : "text-gray-800"
                            }`}
                          >
                            ৳{bid.amount}
                          </p>
                          {isWinningBid && (
                            <span className="text-xs bg-teal-400 text-white px-2 py-1 rounded-full">
                              Winner 👑
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            isWinningBid ? "font-medium" : "text-gray-500"
                          }`}
                        >
                          Bidder: {bid.user}
                        </p>
                      </div>
                    );
                  })
              ) : (
                <p className="text-gray-500">There is no Bid।</p>
              )}


            </div>
            <div className="my-5">
              
            <div className="border rounded-lg p-4 shadow-sm mt-6">
  <h4 className="text-md font-semibold mb-2">Need Help?</h4>
  <p className="text-sm text-gray-600 mb-3">Contact the seller for more info about this product.</p>
  <button
    onClick={() => setShowModal(true)}
    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
  >
    <BsFillChatTextFill />
    Chat With Seller
  </button>
</div>



{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Send Message to Seller</h3>
      <textarea
        className="w-full p-2 border rounded mb-4"
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
)}


            
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
