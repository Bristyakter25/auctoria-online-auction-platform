import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userEmail) {
        console.log("User is not logged in.");
        return;
      }

      try {
        const res = await fetch(`https://auctoria-online-auction-platform.onrender.com/payments/${userEmail}`);
        const data = await res.json();

        if (res.ok) {
          setPayments(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [userEmail]);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.transactionId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          className="input input-bordered w-full max-w-xs bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full max-w-xs bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="completed">Success</option>
          <option value="cancelled">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table  dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td>{index + 1}</td>
                  <td>{payment.transactionId}</td>
                  <td>${payment.price}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>
                    {payment.status === "completed" && (
                      <span className="px-3 w-[100px] py-1 text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-full font-semibold text-sm inline-block text-center">
                        Success
                      </span>
                    )}
                    {payment.status === "pending" && (
                      <span className="px-3 w-[100px] py-1 text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 rounded-full font-semibold text-sm inline-block text-center">
                        Pending
                      </span>
                    )}
                    {payment.status === "cancelled" && (
                      <span className="px-3 w-[100px] py-1 text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-full font-semibold text-sm inline-block text-center">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No matching payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
