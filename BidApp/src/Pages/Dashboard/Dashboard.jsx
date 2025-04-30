import {
  FaBars,
  FaChartBar,
  FaUsersCog,
  FaChartPie,
  FaClipboardList,
  FaHospitalUser,
} from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ThemeToggle from "../../components/HomeComponents/ThemeToggle";

const Dashboard = () => {
  const [role, isLoading] = useRole();
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/login");
    });
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 text-lg p-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white backdrop-blur-md shadow-md"
        : "text-black dark:text-white hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-pink-400/20 hover:backdrop-blur-sm"
    }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <div className="lg:hidden p-4">
          <label htmlFor="dashboard-drawer" className="btn btn-primary">
            <FaBars />
          </label>
        </div>

        <div className="p-4 bg-white border-b flex justify-between items-center">
          <h1 className="text-lg text-black font-bold">Dashboard</h1>
          <ThemeToggle />
        </div>

        <div className="p-4 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-purple-300 dark:bg-[#0C0950] text-black dark:text-white min-h-full space-y-2">
          <h2 className="text-center font-bold text-2xl text-purple-400 mb-6">
            Dashboard
          </h2>

          {/* Common Menu */}
          <li>
            <NavLink to="/dashboard/auctionChart" className={navLinkClass}>
              <FaChartBar />
              <span>Auction Chart</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/allAuctions" className={navLinkClass}>
              <RiAuctionLine />
              <span>All Auctions</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              <FaHospitalUser />
              <span>Manage Profile</span>
            </NavLink>
          </li>

          {/* Admin Panel */}
          {role === "admin" && (
            <>
              <div className="border-t border-gray-300 my-4"></div>
              <h3 className="text-xl text-center font-semibold text-purple-400 pt-4 mb-2">
                Admin Panel
              </h3>
              <li>
                <NavLink to="/dashboard/manageUsers" className={navLinkClass}>
                  <FaUsersCog />
                  <span>Manage Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/analytics" className={navLinkClass}>
                  <FaChartPie />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/recentOrders" className={navLinkClass}>
                  <FaClipboardList />
                  <span>Recent Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews" className={navLinkClass}>
                  <FaClipboardList />
                  <span>Reviews</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Sign Out */}
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-lg p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg"
            >
              <FaBars />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
