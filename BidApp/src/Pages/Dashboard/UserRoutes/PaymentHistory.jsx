import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get user data from context
  const { user } = useContext(AuthContext)
  const userEmail = user?.email; // Assuming user object has email field

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userEmail) {
        console.log("User is not logged in.");
        return;
      }

      try {
        // Fetch payments based on user email
        const res = await fetch(`http://localhost:5000/payments/${userEmail}`);
        const data = await res.json();
        
        if (res.ok) {
          setPayments(data);
        } else {
          console.error(data.message); // Display error message if no payments found
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [userEmail]); // Re-fetch data when userEmail changes

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.price}</td> {/* Price instead of amount as per your data */}
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${payment.status === 'Success' ? 'badge-success' : 'badge-error'}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
