import { FaBars, FaHome } from "react-icons/fa";
import { GrCircleInformation, GrHome } from "react-icons/gr";
import { FaHospitalUser } from "react-icons/fa6";
import { RiAuctionLine } from "react-icons/ri";
import { BsBox2Heart } from "react-icons/bs";
import { MdOutlineAddToQueue } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
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
        <ul className="menu p-4 w-64 bg-purple-100 dark:bg-gray-700 text-black dark:text-white min-h-full">

          {/* Common Menu */}
          <h2 className="text-center font-bold text-xl text-[#4635B1] dark:text-purple-300 mb-4">Dashboard Menu</h2>
          <li><NavLink to="/dashboard/auctionChart"><FaChartBar /> Auction Chart</NavLink></li>
          {/* <li><NavLink to="/"><GrHome /> Home</NavLink></li> */}
          <li><NavLink to="/allAuctions"><RiAuctionLine /> All Auctions</NavLink></li>
          <li><NavLink to="/dashboard/profile"><FaHospitalUser /> Manage Profile</NavLink></li>

          <div className="divider"></div>

          {/* Admin Panel */}
          {role === "admin" && (
            <>
              <h2 className="text-center font-bold text-xl text-[#4635B1] dark:text-purple-300 mb-4">Admin Panel</h2>
              <li><NavLink to="/dashboard/manageUsers"><FaHospitalUser /> Manage Users</NavLink></li>
              <li><NavLink to="/dashboard/analytics"><FaHospitalUser /> Analytics</NavLink></li>
              <li><NavLink to="/dashboard/recentOrders"><FaHospitalUser /> Recent Orders</NavLink></li>
              <li><NavLink to="/dashboard/reviews"><FaHospitalUser /> Review & Feedback</NavLink></li>
            </>
          )}

          {/* Seller Panel */}
          {role === "seller" && (
            <>
              <h2 className="text-center font-bold text-xl text-[#4635B1] dark:text-purple-300 mb-4">Seller Panel</h2>
              <li><NavLink to="/addProduct"><MdOutlineAddToQueue /> Add Product</NavLink></li>
              <li><NavLink to="/dashboard/updateBidInfo"><GrCircleInformation /> Update Bid Info</NavLink></li>
              <li><NavLink to="/dashboard/product-history"><BsBox2Heart /> Product History</NavLink></li>
            </>
          )}

          {/* User Panel */}
          {role === "user" && (
            <>
              <h2 className="text-center font-bold text-xl text-[#4635B1] dark:text-purple-300 mb-4">User Panel</h2>
              <li><NavLink to="/dashboard/wishList"><BsBox2Heart /> Wish Listed Products</NavLink></li>
              <li><NavLink to="/dashboard/bid-history"><BsBox2Heart /> Bid History</NavLink></li>
            </>
          )}

          <div className="divider"></div>

          {/* Always visible */}
          <li><NavLink to="/"><FaHome /> Back to Home</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
