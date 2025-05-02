import {
  FaBars,
  FaHome,
  FaChartBar,
  FaUsersCog,
  FaChartPie,
  FaClipboardList,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { FaHospitalUser } from "react-icons/fa6";
import { RiAuctionLine } from "react-icons/ri";
import { BsBox2Heart } from "react-icons/bs";
import { MdOutlineAddToQueue } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

import ThemeToggle from "../../components/HomeComponents/ThemeToggle";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle Checkbox */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Toggle Button */}
        <div className="lg:hidden p-4">
          <label htmlFor="dashboard-drawer" className="btn btn-primary">
            <FaBars />
          </label>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col ">
          <div className="p-4 bg-white border-b flex justify-between items-center">
            <button className="lg:hidden text-gray-600 text-2xl"></button>
            <h1 className="text-lg text-black font-bold">Dashboard</h1>
            <div>
              <ThemeToggle></ThemeToggle>
            </div>
          </div>

          <div className="p-4 overflow-auto flex-1">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

       

        <ul className="menu p-4 w-64 bg-[#7886C7] dark:bg-[#0C0950] text-black dark:text-white min-h-full space-y-2">
          <h2 className="text-center font-bold text-2xl text-[#2D336B]  mb-6">
            Dashboard
          </h2>

          {/* Common Menu */}
          <li>
            <NavLink
              to="/dashboard/auctionChart"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                    : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                }`
              }
            >
              <FaChartBar />
              <span>Auction Chart</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allAuctions"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                    : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                }`
              }
            >
              <RiAuctionLine />
              <span>All Auctions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                    : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                }`
              }
            >
              <FaHospitalUser />
              <span>Manage Profile</span>
            </NavLink>
          </li>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Admin Panel */}
          {role === "admin" && (
            <>
              <h3 className="text-xl text-center font-semibold text-[#2D336B] pt-4 mb-2">
                Admin Panel
              </h3>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <FaUsersCog />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <FaChartPie />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/recentOrders"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <FaClipboardList />
                  <span>Recent Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reviews"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <FaCommentDots />
                  <span>Review & Feedback</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Seller Panel */}
          {role === "seller" && (
            <>
              <h3 className="text-xl text-center pt-4 font-semibold text-[#2D336B]  mb-2">
                Seller Panel
              </h3>
              <li>
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <MdOutlineAddToQueue />
                  <span>Add Product</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/dashboard/product-history"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <BsBox2Heart />
                  <span>Product History</span>
                </NavLink>
              </li>
            </>
          )}

          {/* User Panel */}
          {role === "user" && (
            <>
              <h3 className="text-xl pt-4 font-semibold text-[#2D336B] text-center mb-2">
                User Panel
              </h3>
              <li>
                <NavLink
                  to="/dashboard/wishList"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <BsBox2Heart />
                  <span>Wish List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/bid-history"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <BsBox2Heart />
                  <span>Bid History</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                    }`
                  }
                >
                  <BsBox2Heart />
                  <span>Payment History</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="border-t border-gray-300 my-4"></div>

          {/* Always visible */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
                    : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
                }`
              }
            >
              <FaHome />
              <span>Back to Home</span>
            </NavLink>
          </li>

          {/* Logout Button */}
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center text-lg space-x-2 p-2 w-full text-left mt-8 
             rounded-lg text-white transition-all duration-300 
             bg-gradient-to-r from-purple-500/30 to-pink-500/30 
             backdrop-blur-md shadow-md hover:from-purple-600/40 
             hover:to-pink-600/40 hover:shadow-lg"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
