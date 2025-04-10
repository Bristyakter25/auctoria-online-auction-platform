import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const BidHistory = () => {
  const [bids, setBids] = useState();
  console.log("Bids:", bids);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const {data:bidHistory =[],refetch} = useQuery({
    queryKey: ['bidHistory', user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/bidHistory/${user?.email}`);
      // console.log("Bids:", res.data);
      return res.data;
    },
  })
  useEffect(() => {
    if (Array.isArray(bidHistory) && bidHistory.length > 0) {
      setBids(bidHistory);
      setLoading(false);
    } 
    else {
      setBids([]);
      setLoading(false);
    }
  }, [bidHistory]);


  const handleDelete = async ( productId, bidId) => {
    const confirm = window.confirm("Are you sure you want to delete this bid?");
    if (!confirm) return;
    console.log("Deleting bid with amount:", bidId,);
  
    try {
     
      const res = await axios.delete(`http://localhost:5000/deleteBid/${productId}/${bidId}`);
      if (res.data.success) {
        toast.success("Bid deleted successfully");
      } else {
        toast.error(res.data.message);
      }
      refetch();
    } catch (error) {
      console.error("Failed to delete bid:", error);
    }
  };
  
  





  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bid History</h2>
      {bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2"> Name</th>
                <th className="border px-4 py-2"> email</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid._id}>
                  <td className="border px-4 py-2">{bid.productName}</td>
                  <td className="border px-4 py-2">{bid.name}</td>
                  <td className="border px-4 py-2">{bid.email}</td>
                  <td className="border px-4 py-2">${bid.bidAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bid.timestamp).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {/* Future delete button can go here */}
                    <button
                      onClick={() => handleDelete(bid._id , bid.bidId)} // এখানে `amount` পাঠানো হচ্ছে
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BidHistory;
