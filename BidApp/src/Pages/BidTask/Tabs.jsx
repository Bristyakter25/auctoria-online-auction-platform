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
// import AdmissionForm from "../../Components/Dropdown/AdminDashboard/Student/AdmissionForm";
// import ParentsForm from "../../Components/Dropdown/AdminDashboard/Student/ParentsForm";

const tabs = ["Item Details", "History", "Reviews", "Winner", "Share"];
const Tabs = ({ sellerId, sellerEmail, product, setProduct }) => {
  console.log("product", product);
  const [activeTab, setActiveTab] = useState("Item Details");
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
            className={`px-3 py-3 cursor-pointer text-base lg:text-lg font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-teal-300 text-teal-500 "
                : " "
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
            <p>Items Details</p>
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
          <div className="flex flex-col gap-4">
            {/* Facebook Share */}
            <FacebookShareButton
              url={`http://localhost:5000/bid/${product._id}`}
              quote={product?.productName || ""}
              hashtag="#AuctionItem"
            >
              <div className="btn btn-sm btn-outline btn-success flex items-center gap-2">
                <FaFacebookSquare />
                Share on Facebook
              </div>
            </FacebookShareButton>

            {/* Twitter Share */}
            <TwitterShareButton
              url={`http://localhost:5000/bid/${product._id}`}
              title={product?.productName || ""}
              hashtags={["Auction", "OnlineBidding"]}
            >
              <div className="btn btn-sm btn-outline btn-info flex items-center gap-2">
                <FaTwitter />
                Share on Twitter
              </div>
            </TwitterShareButton>

            {/* LinkedIn Share */}
            <LinkedinShareButton
              url={`http://localhost:5000/bid/${product._id}`}
              title={product?.productName || ""}
              summary={`Check out this item: ${product?.productName}`}
              source="Auctoria Auction"
            >
              <div className="btn btn-sm btn-outline btn-primary flex items-center gap-2">
                <FaLinkedin />
                Share on LinkedIn
              </div>
            </LinkedinShareButton>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Tabs;
