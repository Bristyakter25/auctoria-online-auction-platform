import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/ShareComponents/LoadingSpinner ";

const BidHistory = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const { data: bidHistory = [], refetch } = useQuery({
    queryKey: ["bidHistory", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/bidHistory/${user?.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (Array.isArray(bidHistory)) {
      setBids(bidHistory);
      setLoading(false);
    } else {
      setBids([]);

      // setLoading(false);
    }
    setLoading(false);
  }, [bidHistory]);

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
          `http://localhost:5000/deleteBid/${productId}/${bidId}`
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
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  const totalAmountToPay = bids?.reduce((total, bid) => {
    if (bid.email === user?.email) {
      total += bid.bidAmount;
    }
    return total;
  }, 0);

  return (
    <div className="p-6 py-40">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">My Bid History</h2>

        <div className="text-xl font-semibold mb-4 text-green-700 mr-5">
          Total Amount to Pay: ${totalAmountToPay?.toFixed(2)}
          <Link to="/dashboard/pay" state={{ totalPrice: totalAmountToPay }}>
            <button className="btn bg-green-400 hover:bg-green-700 hover:text-white ml-5">Pay Now!</button>
          </Link>
        </div>
      </div>

      {bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2"> Name</th>
                <th className="border px-4 py-2"> Email</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={`${bid._id}-${index}`}>
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
                  <td className="border px-4 py-2">
                    <img
                      src={bid.productImage}
                      alt={bid.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
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
