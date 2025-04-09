import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SellerReview from "./SellerReview";
import AuctionHistory from "./AuctionHistory";
// import AdmissionForm from "../../Components/Dropdown/AdminDashboard/Student/AdmissionForm";
// import ParentsForm from "../../Components/Dropdown/AdminDashboard/Student/ParentsForm";

const tabs = ["Item Details", "Auction History", "Reviews"];
const Tabs = ({ sellerId, sellerEmail }) => {
  //   console.log("seller email", sellerEmail);
  const [activeTab, setActiveTab] = useState("Item Details");
  const [studentId, setStudentId] = useState(null);
  //   console.log("student id", studentId);
  //   useEffect(() => {
  //     // console.log("Student ID:", studentId);
  //   }, [studentId]);
  return (
    <div className="w-full max-w-7xl mx-auto p-3">
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-3 cursor-pointer text-lg font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-teal-300 text-gray-600"
                : "text-gray-600"
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

        {activeTab === "Auction History" && (
          <>
            {" "}
            <AuctionHistory />{" "}
          </>
        )}
        {activeTab === "Reviews" && (
          <>
            <SellerReview sellerId={sellerId} sellerEmail={sellerEmail} />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Tabs;
