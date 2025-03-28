import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import auctionImage from "../../assets/auction-image.svg";

import GoToHomeButton from "../../components/ShareComponents/GoToHomeButton";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User login successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email Address Already Exist!",
        });
        navigate("/dashboard");
      });
  };

  return (
    <div className="flex items-center justify-center mt-10 min-h-screen bg-gray-100">
      <div className="flex w-full max-w-full min-h-screen bg-white px-10 overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2">
          <img
            src={auctionImage}
            alt="Auction Platform"
            className="w-full h-full object-center"
          />
        </div>

        {/* Right Side Login Form */}
        <motion.div
          initial={{ opacity: 0, y: -600 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-1/2 p-12 space-y-6 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Welcome To Auction
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 "
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 "
                placeholder="Enter your password"
                name="password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-black bg-teal-300 rounded-md hover:bg-teal-400 text-lg font-semibold"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-between mt-4">
            <hr className="w-1/3 border-gray-300" />
            <span className="text-gray-500">or</span>
            <hr className="w-1/3 border-gray-300" />
          </div>
          <SocialLogin></SocialLogin>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-col items-center justify-center">
            <GoToHomeButton />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
