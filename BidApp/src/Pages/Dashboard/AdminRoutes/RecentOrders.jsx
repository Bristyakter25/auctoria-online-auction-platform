import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  const response = await axios.get("https://auctoria-online-auction-platform.onrender.com/payments");
  return response.data;
};

const updateOrderStatus = async ({ orderId, status }) => {
  const response = await axios.patch(`https://auctoria-online-auction-platform.onrender.com/payments/${orderId}`, { status });
  return response.data;
};

const RecentOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const mutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleMarkAsComplete = (orderId) => {
    mutation.mutate({ orderId, status: "completed" });
  };

  const handleCancelOrder = (orderId) => {
    mutation.mutate({ orderId, status: "cancelled" });
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <div>
      <h2 className="text-3xl mt-5 text-center font-bold mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No recent orders found.</p>
      ) : (
        <div className="p-4 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th className="font-extrabold text-black text-xl">Image</th>
                <th className="font-extrabold text-black text-xl">Product Name</th>
                <th className="font-extrabold text-black text-xl">Price</th>
                <th className="font-extrabold text-black text-xl">Status</th>
                <th className="font-extrabold text-black text-xl">Date</th>
                <th className="font-extrabold text-black text-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                order.products.map((product, productIndex) => (
                  <tr key={`${order._id}-${product.bidId}`} className={index % 2 === 0 ? "bg-base-200" : ""}>
                    <td>{index + 1}.{productIndex + 1}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-14 object-cover rounded"
                        onError={(e) => { e.target.src = "/fallback.jpg"; }}
                      />
                    </td>
                    <td className="font-semibold text-[17px]">{product.name}</td>
                    <td className="font-semibold text-[17px]">${order.price}</td>
                    <td className="capitalize font-semibold text-[17px]">{order.status}</td>
                    <td className="font-semibold text-[17px]">{new Date(order.date).toLocaleString()}</td>
                    <td className="font-semibold text-[17px]">
                      {order.status !== "completed" && order.status !== "cancelled" ? (
                        <>
                          <button
                            onClick={() => handleMarkAsComplete(order._id)}
                            className="btn btn-success btn-sm mr-2"
                          >
                            Mark as Complete
                          </button>
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="btn btn-error btn-sm"
                          >
                            Cancel Order
                          </button>
                        </>
                      ) : (
                        <span className={order.status === "completed" ? "text-green-500" : "text-red-500"}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
