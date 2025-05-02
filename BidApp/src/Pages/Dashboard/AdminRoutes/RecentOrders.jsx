import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  const response = await axios.get("http://localhost:5000/payments");
  return response.data;
};

const updateOrderStatus = async ({ orderId, status }) => {
  const response = await axios.patch(`http://localhost:5000/payments/${orderId}`, { status });
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

  if (isLoading) return <p className="text-center dark:text-white">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 dark:text-red-400">Error fetching orders: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Recent Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No recent orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm dark:text-white">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th>#</th>
                <th className="font-bold text-base">Image</th>
                <th className="font-bold text-base">Product Name</th>
                <th className="font-bold text-base">Price</th>
                <th className="font-bold text-base">Status</th>
                <th className="font-bold text-base">Date</th>
                <th className="font-bold text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                order.products.map((product, productIndex) => (
                  <tr
                    key={`${order._id}-${product.bidId}`}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                    }`}
                  >
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
                    <td className="font-semibold text-[17px]">
                      {new Date(order.date).toLocaleString()}
                    </td>
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
