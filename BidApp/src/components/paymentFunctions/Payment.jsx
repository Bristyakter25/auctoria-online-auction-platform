import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMailUnreadOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { totalPrice } = location.state || {};

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-center text-3xl font-bold mb-12">Pay Here!</h2>

      {/* Two Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Side - Customer Information */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">Customer Information</h3>

          {/* Holder */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2 text-gray-600">Holder</p>
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <FaRegCircleUser className="text-gray-500" size={20} />
              <span className="text-gray-700">{user?.displayName || "N/A"}</span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2 text-gray-600">Email</p>
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <IoMailUnreadOutline className="text-gray-500" size={20} />
              <span className="text-gray-700">{user?.email || "N/A"}</span>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-100 rounded-xl p-6 mt-10 text-center">
            <p className="text-lg font-semibold mb-2">Your Total Payment</p>
            <h1 className="text-4xl font-bold text-primary">${totalPrice?.toFixed(2)}</h1>
          </div>
        </div>

        {/* Right Side - Checkout Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">Payment Method</h3>

          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>

      </div>
    </div>
  );
};

export default Payment;
