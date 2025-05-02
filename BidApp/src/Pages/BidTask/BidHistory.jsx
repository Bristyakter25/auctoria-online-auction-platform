import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaLongArrowAltRight } from "react-icons/fa";
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

        

        `http://localhost:5000/bidHistory/${user?.email}`

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
          `hhttps://auctoria-online-auction-platform.onrender.com/deleteBid/${productId}/${bidId}`
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
    <div className="dark:text-white ">
      <div className="text-center mb-10  dark:text-white py-32 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
              <h2 className="text-5xl dark:text-white font-bold mb-5">Bid History </h2>
      
              <div className="flex items-center justify-center gap-x-3 text-center ">
                <Link to="/" className="text-lg hover:text-green-600">
                  Home
                </Link>
                <p className="mt-2 ">
                  {" "}
                  <FaLongArrowAltRight />
                </p>
                <p className="text-lg ">Bid History</p>
              </div>
            </div>
      <div className="flex justify-end px-4 items-center mb-6">
        

        <div className="flex items-center gap-4 text-blue-500 dark:text-blue-300 font-semibold">
          <span>Total Amount to Pay: ${totalAmountToPay.toFixed(2)}</span>
          <Link
            to="/dashboard/pay"
            state={{ totalPrice: totalAmountToPay, cart: latestBids }}
          >
            <button className="btn bg-blue-400 hover:bg-blue-700 hover:text-white">
              Pay Now!
            </button>
          </Link>
        </div>
      </div>

      {latestBids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        <div className="overflow-x-auto w-full mx-auto">
          <table className="table-auto w-full border">
            <thead className="bg-gray-100 dark:bg-transparent">
              <tr>
                <th className="border px-4  py-2">Image</th>
                <th className="border px-4  py-2">Product Name</th>
                <th className="border px-4  py-2">Name</th>
                <th className="border px-4  py-2">Email</th>
                <th className="border px-4  py-2">Amount</th>
                <th className="border px-4  py-2">Time</th>
                <th className="border px-4  py-2">Action</th>
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
