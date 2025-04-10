import { useContext, useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import Tabs from "./Tabs";

const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const Bid = () => {
  const { user } = useContext(AuthContext);
  const item = {
    images: [
      "https://i.ibb.co/PhQ5y3z/51q-Glsxsw-ZL.jpg",
      "https://i.ibb.co/09jKmmg/Pulse-01-1200x.jpg",
      "https://i.ibb.co/6F2D1s1/Smart-Watches.jpg",
    ],
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [currentBid, setCurrentBid] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/addProducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.bids?.length > 0) {
          setCurrentBid(Math.max(...data.bids.map((b) => b.amount)));
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

  if (!product) return <p className="text-center">Loading...</p>;

  const handleDeleteBid = async (bidId) => {
    console.log("Deleting bid with ID:", bidId);

    if (!bidId) {
      toast.error("Invalid bid ID!", { position: "top-right" });
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/bid/${id}/${bidId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Bid deleted successfully!", { position: "top-right" });

        setProduct((prev) => {
          if (!prev || !prev.bids) return prev;

          const updatedBids = prev.bids.filter((bid) => bid._id !== bidId);

          // Update current bid after filtering
          const newCurrentBid =
            updatedBids.length > 0
              ? Math.max(...updatedBids.map((b) => b.amount))
              : 0;
          setCurrentBid(newCurrentBid);

          return {
            ...prev,
            bids: updatedBids,
          };
        });
      } else {
        toast.error("Failed to delete bid!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error deleting bid:", error);
      toast.error("Server problem! Please try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Right Side: Images & Thumbnails */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 shadow-md rounded-lg border"
        >
          {/* Main Image */}
          <motion.img
            src={product.productImage}
            alt="Auction Item"
            className="w-full h-80 object-fill rounded-lg"
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
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
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
          className="bg-white p-6 shadow-md rounded-lg border relative "
        >
          <div className="text-2xl font-bold mb-2 flex items-center ">
            {" "}
            <div
              className="w-0 h-0 border-t-[28px] border-t-transparent border-l-[28px] border-l-teal-300
  border-b-[28px] border-b-transparent absolute -top-5 -right-1 -rotate-45 "
            ></div>
            <h2 className="w-8/12 ">{product.productName} </h2>
            <p className="text-lg text-gray-900 flex justify-center items-center -top-1 right-1 absolute">
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
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Max your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
          </div>

          {/* Make a Bid Button */}
          {product.endingSoonNotified === true ? (
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

          {/* Total Bids */}
          {/* <p className="mt-4 text-blue-600 font-bold ">
            Total Bids:{" "}
            <span className="">
              {product.bids?.length ? product.bids?.length : "0"}
            </span>
          </p> */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white   "
          >
            <h3 className="text-xl font-bold text-gray-600 mb-3 mt-3">
              Latest Bids
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product?.bids?.length > 0 ? (
                [...product.bids]
                  .sort((a, b) => b.amount - a.amount)
                  .slice(0, 3)
                  .map((bid, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-gray-800">
                          ${bid.amount}
                        </p>
                        <button
                          onClick={() => bid?._id && handleDeleteBid(bid._id)}
                        >
                          {/* <MdCancel /> */}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Bid by: {bid.user}
                      </p>
                      <p className="text-xs text-gray-400">
                        {bid.time
                          ? new Date(bid?.time).toLocaleString()
                          : "Loading..."}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No bids placed yet.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Tabs sellerId={product._id} sellerEmail={product.email} />
    </div>
  );
};

export default Bid;
