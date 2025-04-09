
import { useContext, useEffect, useState } from "react";
import { FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import { MdCancel } from "react-icons/md";

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
  const [timeLeft, setTimeLeft] = useState("");


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
        setProduct((prev) => ({
          ...prev,
          bids: [...(prev.bids || []), bid],
        }));
        setCurrentBid((prevBid) => Math.max(prevBid, bid.amount));
      }
    });

    socket.on("bidDeleted", ({ productId, bidId }) => {
      if (productId === id) {
        setProduct((prev) => {
          // Ensure prev is not null before accessing bids
          if (!prev || !prev.bids) return prev;

          const updatedBids = prev.bids.filter((bid) => bid._id !== bidId);

          return {
            ...prev,
            bids: updatedBids,
          };
        });

        setCurrentBid((prevBid) => {
          setProduct((prev) => {
            // Ensure prev is not null before filtering bids
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

    try {
      const res = await fetch(`http://localhost:5000/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId: product.sellerId,
          amount: Number(bidAmount),
          user: user?.displayName,
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
      toast.error("Server problem! Please try again later.", {
        position: "top-right",
      });
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
          className="bg-white p-6 shadow-md rounded-lg border"
        >           {/* Main Image */}
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
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? "border-blue-600" : "border-gray-300"
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
          className="bg-white p-6 shadow-md rounded-lg border"
        >
          <h2 className="text-2xl font-bold mb-2"> {product.productName}</h2>
          <p className="text-gray-500 text-sm mb-4"> {product.category}</p>

       


          {/* Start & End Time */}
          <p className="text-gray-700">
            <strong>Start Time:</strong>{" "}
            {new Date(product.auctionStartDate).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Closing Time:</strong>{" "}
            {new Date(product.auctionEndTime).toLocaleString()}
          </p>

          {/* Current Bid */}
          <div className="mt-4">
            <p className="text-lg font-semibold text-blue-600">
              Current Bid: $<span> {currentBid || "No bids yet"}</span>
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBid}
            className="mt-4 w-full bg-teal-400 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500  transition"
          >
            <FaGavel /> Make a Bid
          </motion.button>

          {/* Total Bids */}
          <p className="mt-4 text-blue-600 font-bold ">
            Total Bids:{" "}
            <span className="">
              {product.bids?.length ? product.bids?.length : "0"}
            </span>
          </p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white   "
          >
            <h3 className="text-xl font-bold text-gray-700 mb-3">
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
                        <p className="text-lg font-semibold text-blue-600">
                          ${bid.amount}
                        </p>
                     
                      </div>
                      <p className="text-sm text-gray-500">
                        Bid by: {bid.user}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(bid.time).toLocaleString()}
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
    </div>
  );
};

export default Bid;
