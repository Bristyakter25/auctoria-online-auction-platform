import { FaBars, FaHome, FaChartBar, FaUsersCog, FaChartPie, FaClipboardList, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { FaHospitalUser } from "react-icons/fa6";
import { RiAuctionLine } from "react-icons/ri";
import { BsBox2Heart } from "react-icons/bs";
import { MdOutlineAddToQueue } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BidHistory from "../BidTask/BidHistory";

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

        <div className="p-4">
          <Outlet />
        </div>
       
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-purple-300 dark:bg-gray-800 text-black dark:text-white min-h-full space-y-2">
          <h2 className="text-center font-bold text-2xl text-purple-400  mb-6">Dashboard</h2>

          {/* Common Menu */}
          <li>
            <NavLink
              to="/dashboard/auctionChart"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                `flex items-center space-x-2 text-lg p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                `flex items-center space-x-2 text-lg p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
              <h3 className="text-xl text-center font-semibold text-purple-400 pt-4 mb-2">Admin Panel</h3>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className={({ isActive }) =>
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
              <h3 className="text-xl text-center pt-4 font-semibold text-purple-400  mb-2">Seller Panel</h3>
              <li>
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
                  }
                >
                  <MdOutlineAddToQueue />
                  <span>Add Product</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/updateBidInfo"
                  className={({ isActive }) =>
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
                  }
                >
                  <GrCircleInformation />
                  <span>Update Bid Info</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/product-history"
                  className={({ isActive }) =>
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
              <h3 className="text-xl pt-4 font-semibold text-purple-400 text-center mb-2">User Panel</h3>
              <li>
                <NavLink
                  to="/dashboard/wishList"
                  className={({ isActive }) =>
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
                    `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
                  }
                >
                  <BsBox2Heart />
                  <span>Bid History</span>
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
                `flex items-center text-lg space-x-2 p-2 ${isActive ? "bg-purple-600 text-white" : "text-black dark:text-white"} hover:bg-purple-600 rounded-lg`
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
              className="flex items-center text-lg space-x-2 p-2 text-white hover:bg-purple-600 rounded-lg w-full text-left mt-8"
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
