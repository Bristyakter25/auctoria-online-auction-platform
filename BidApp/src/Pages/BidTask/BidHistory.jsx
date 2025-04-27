import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BidHistory = () => {
  const { user } = useContext(AuthContext);

  const {
    data: bids = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bidHistory", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://auctoria-online-auction-platform.onrender.com/bidHistory/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return "Loading...";

  // Group bids by productId and keep the latest one
  const latestBidsMap = new Map();

  bids.forEach((bid) => {
    const existing = latestBidsMap.get(bid.productId);
    if (!existing || new Date(bid.timestamp) > new Date(existing.timestamp)) {
      latestBidsMap.set(bid.productId, bid); // keep latest
    }
  });

  const latestBids = Array.from(latestBidsMap.values());

  // Calculate total from latest bids only
  const totalAmountToPay = latestBids.reduce((total, bid) => total + bid.bidAmount, 0);

  const handleDelete = async (productId, bidId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this bid deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://auctoria-online-auction-platform.onrender.com/deleteBid/${productId}/${bidId}`
        );
        if (res.data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${res.data.productName} bid is deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire("Error!", res.data.message, "error");
        }
      } catch (error) {
        Swal.fire("Oops!", "Something went wrong while deleting.", "error");
      }
    }
  };

  return (
    <div className="p-6 py-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Bid History</h2>

        <div className="flex items-center gap-4 text-green-700 font-semibold">
          <span>Total Amount to Pay: ${totalAmountToPay.toFixed(2)}</span>
          <Link
            to="/dashboard/pay"
            state={{ totalPrice: totalAmountToPay, cart: latestBids }}
          >
            <button className="btn bg-green-400 hover:bg-green-700 hover:text-white">
              Pay Now!
            </button>
          </Link>
        </div>
      </div>

      {latestBids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {latestBids.map((bid, index) => (
                <tr key={`${bid._id}-${index}`}>
                  <td className="border px-4 py-2">
                    <img
                      src={bid.productImage}
                      alt={bid.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{bid.productName}</td>
                  <td className="border px-4 py-2">{bid.name}</td>
                  <td className="border px-4 py-2">{bid.email}</td>
                  <td className="border px-4 py-2">${bid.bidAmount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bid.timestamp).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(bid._id, bid.bidId)}
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
