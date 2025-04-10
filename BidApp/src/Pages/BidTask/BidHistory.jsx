import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const BidHistory = () => {
  const [bids, setBids] = useState();
  console.log("Bids:", bids);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;
  
    const fetchBids = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/bidHistory/${user?.email}`);
        console.log("Bids:", res.data);
        setBids(res.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBids();
  }, [user?.email]);

   const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this bid?");
    if (!confirm) return;
    console.log("Deleting bid:", id, "by:", user.email);

    try {
      await axios.delete(`http://localhost:5000/bidHistory/${id}`, {
      });
      setBids(bids.filter((bid) => bid._id !== id));
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
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid._id}>
                  <td className="border px-4 py-2">{bid.productName}</td>
                  <td className="border px-4 py-2">${bid.bidAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bid.timestamp).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {/* Future delete button can go here */}
                      <button
                      onClick={() => handleDelete(bid._id)}
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
