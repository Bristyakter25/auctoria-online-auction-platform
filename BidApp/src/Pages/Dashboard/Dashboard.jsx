// src/pages/Dashboard/Dashboard.jsx

import { FaBars, FaHome, FaChartBar, FaUsersCog, FaChartPie, FaClipboardList, FaCommentDots } from "react-icons/fa";
import { GrCircleInformation } from "react-icons/gr";
import { FaHospitalUser } from "react-icons/fa6";
import { RiAuctionLine } from "react-icons/ri";
import { BsBox2Heart } from "react-icons/bs";
import { MdOutlineAddToQueue } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import MenuItem from "./MenuItem";
import ThemeToggle from "../../components/HomeComponents/ThemeToggle";

const Dashboard = () => {
  const [role, isLoading] = useRole();

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
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="p-4 bg-white border-b flex justify-between items-center">
          <button className="lg:hidden text-gray-600 text-2xl"></button>
          <h1 className="text-lg text-black font-bold">Dashboard</h1>
          <div>
                <ThemeToggle></ThemeToggle>
              </div>
        </div>

        
        <div className="p-4 overflow-auto flex-1"><Outlet />
     
        </div>
      </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-purple-300 dark:bg-gray-800 text-black dark:text-white min-h-full space-y-2">
          <h2 className="text-center font-bold text-2xl text-purple-700 dark:text-purple-300 mb-6">Dashboard</h2>

          {/* Common Menu */}
          <MenuItem to="/dashboard/auctionChart" icon={<FaChartBar />} text="Auction Chart"></MenuItem>
          <MenuItem to="/allAuctions" icon={<RiAuctionLine />} text="All Auctions" />
          <MenuItem to="/dashboard/profile" icon={<FaHospitalUser />} text="Manage Profile" />

          <div className="border-t border-gray-300 my-4"></div>

          {/* Admin Panel */}
          {role === "admin" && (
            <>
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">Admin Panel</h3>
              <MenuItem to="/dashboard/manageUsers" icon={<FaUsersCog />} text="Manage Users" />
              <MenuItem to="/dashboard/analytics" icon={<FaChartPie />} text="Analytics" />
              <MenuItem to="/dashboard/recentOrders" icon={<FaClipboardList />} text="Recent Orders" />
              <MenuItem to="/dashboard/reviews" icon={<FaCommentDots />} text="Review & Feedback" />
            </>
          )}

          {/* Seller Panel */}
          {role === "seller" && (
            <>
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">Seller Panel</h3>
              <MenuItem to="/addProduct" icon={<MdOutlineAddToQueue />} text="Add Product" />
              <MenuItem to="/dashboard/updateBidInfo" icon={<GrCircleInformation />} text="Update Bid Info" />
              <MenuItem to="/dashboard/product-history" icon={<BsBox2Heart />} text="Product History" />
            </>
          )}

          {/* User Panel */}
          {role === "user" && (
            <>
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">User Panel</h3>
              <MenuItem to="/dashboard/wishList" icon={<BsBox2Heart />} text="Wish List" />
              <MenuItem to="/dashboard/bid-history" icon={<BsBox2Heart />} text="Bid History" />
            </>
          )}

          <div className="border-t border-gray-300 my-4"></div>

          {/* Always visible */}
          <MenuItem to="/" icon={<FaHome />} text="Back to Home" />
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
