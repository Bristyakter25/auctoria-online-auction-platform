import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import auctionImage from "../../assets/auction-image.svg";
import GoToHomeButton from "../../components/ShareComponents/GoToHomeButton";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const MAX_FAILED_ATTEMPTS = 3; // Maximum attempts before lockout
const LOCKOUT_DURATION = 10 * 60 * 1000; // 10 minutes lockout (in ms)

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State variables to hold lockout information
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Check lockout status when the component mounts
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      checkLockoutStatus(email);
    }
  }, []);

  // Function to check if the user is locked out
  const checkLockoutStatus = async (email) => {
    try {
      const response = await fetch(`/check-lockout?email=${email}`);
      const data = await response.json();

      if (data.isLocked) {
        setIsLocked(true);
        setLockoutTime(data.lockoutMinutes);
      }
    } catch (error) {
      console.error("Error fetching lockout status:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (isLocked) {
      Swal.fire({
        icon: "warning",
        title: "Account Locked",
        text: `Try again in ${lockoutTime} minutes.`,
      });
      return;
    }

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setFailedAttempts(0);
        localStorage.setItem("failedAttempts", 0);
        localStorage.removeItem("isLocked");
        localStorage.removeItem("lockoutUntil");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User login successful.",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        localStorage.setItem("failedAttempts", newFailedAttempts);

        if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockoutUntil = Date.now() + LOCKOUT_DURATION;
          setIsLocked(true);
          setLockoutTime(10); // Lockout duration in minutes
          localStorage.setItem("isLocked", true);
          localStorage.setItem("lockoutUntil", lockoutUntil);

          setTimeout(() => {
            setIsLocked(false);
            setFailedAttempts(0);
            localStorage.removeItem("isLocked");
            localStorage.removeItem("lockoutUntil");
            localStorage.setItem("failedAttempts", 0);
          }, LOCKOUT_DURATION);

          Swal.fire({
            icon: "error",
            title: "Account Locked",
            text: `Too many failed attempts. Try again in 10 minutes.`,
          });

          return;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: `Invalid credentials. Attempt ${newFailedAttempts} of ${MAX_FAILED_ATTEMPTS}.`,
        });
      });
  };

  return (
    <div className="flex items-center justify-center mt-10 min-h-screen ">
      <div className="flex w-full max-w-full min-h-screen  px-10 overflow-hidden">
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
          <h2 className="text-3xl font-bold text-center ">
            Welcome To Auction
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300"
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
                className="w-full px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300"
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
          <SocialLogin />
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 hover:underline font-semibold"
            >
              Sign up
            </Link>
            <Link to="/forgot-password">Forget Password?</Link>
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
