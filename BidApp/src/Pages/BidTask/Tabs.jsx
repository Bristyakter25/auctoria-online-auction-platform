import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { motion } from "framer-motion";
import SellerReview from "./SellerReview";
import AuctionHistory from "./AuctionHistory";
import AllBidHistory from "./AllBidHistory";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaShareSquare,
  FaTwitter,
} from "react-icons/fa";
import AuctionWinner from "./AuctionWinner";
// "Item Details",
const tabs = ["History", "Reviews", "Winner", "Share"];
const Tabs = ({ sellerId, sellerEmail, product, setProduct }) => {
  console.log("product", product);
  const [activeTab, setActiveTab] = useState("History");

  const [studentId, setStudentId] = useState(null);
  //   console.log("student id", studentId);
  //   useEffect(() => {
  //     // console.log("Student ID:", studentId);
  //   }, [studentId]);
  return (
    <div className="container max-w-7xl mx-auto p-3">
      <div className="flex lg:space-x-4 border-b border-gray-200 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-3 dark:text-white cursor-pointer text-base lg:text-lg font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-400 text-blue-500 "
                : "dark:text-white text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-12 "
      >
        {activeTab === "Item Details" && (
          <>
            {/* <AdmissionForm setStudentId={setStudentId} /> */}
            {/* <p>Items Details</p> */}
          </>
        )}

        {activeTab === "History" && (
          <>
            <AllBidHistory id={product._id} />
          </>
        )}
        {activeTab === "Reviews" && (
          <>
            <SellerReview sellerId={sellerId} sellerEmail={sellerEmail} />
          </>
        )}
        {activeTab === "Winner" && (
          <>
            <AuctionWinner product={product} setProduct={setProduct} />
          </>
        )}

        {activeTab === "Share" && (
          <div className="">
            {/* Facebook Share */}
            <div className="lg:flex items-center space-y-4">
              <FacebookShareButton
                url={`https://auctoria-online-auction-platform.onrender.com/bid/${product._id}`}
                quote={product?.productName || ""}
                hashtag="#AuctionItem"
                className="w-full flex items-center justify-center"
              >
                <div className="btn gap-2 text-base bg-blue-500 hover:bg-blue-600 border-none dark:text-white">
                  <FaFacebookSquare size={24} className="" />
                  Share on Facebook
                </div>
              </FacebookShareButton>

              {/* Twitter Share */}
              <TwitterShareButton
                url={`https://auctoria-online-auction-platform.onrender.com/bid/${product._id}`}
                title={product?.productName || ""}
                hashtags={["Auction", "OnlineBidding"]}
                className="w-full flex items-center justify-center"
              >
                <div className="btn gap-2 text-base bg-blue-500 hover:bg-blue-600 border-none dark:text-white">
                  <FaTwitter />
                  Share on Twitter
                </div>
              </TwitterShareButton>

              {/* LinkedIn Share */}
              <LinkedinShareButton
                url={`https://auctoria-online-auction-platform.onrender.com/bid/${product._id}`}
                title={product?.productName || ""}
                summary={`Check out this item: ${product?.productName}`}
                source="Auctoria Auction"
                className="w-full flex items-center justify-center"
              >
                <div className="btn gap-2 text-base bg-blue-500 hover:bg-blue-600 border-none dark:text-white">
                  <FaLinkedin />
                  Share on LinkedIn
                </div>
              </LinkedinShareButton>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Tabs;
