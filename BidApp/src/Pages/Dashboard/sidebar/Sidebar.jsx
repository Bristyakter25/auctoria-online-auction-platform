import { FaHome, FaUser } from "react-icons/fa";
import useAdmin from "../../../privateRoutes/useAdmin";
import useSeller from "../../../privateRoutes/useSeller";
import AdminNavbar from "../dasboardaNavbar/AdminNavbar";
import BuyerNavbar from "../dasboardaNavbar/BuyerNavbar";
import SellerNavbar from "../dasboardaNavbar/SellerNavbar";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
 
  return (
    <div>
     <div className="flex h-screen">
     <div className={`bg-blue-400 text-white w-64 lg:static fixed h-full transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-40`}>
      <div className="p-4 text-2xl font-bold border-b">Dashboard </div>
        <ul>
          {isAdmin ? (
            <AdminNavbar />
          ) : isSeller ? (
            <SellerNavbar />
          ) : (
            <BuyerNavbar />
          )}
        </ul>
        {/* horizontal line */}
        <div className="divider"></div>
        {/* share common Navlink */}
        <ul className="menu">
          <li>
            <NavLink to={"/"}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profile"}>
              <FaUser /> Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        
      </div>
     </div>
     
    </div>
  );
};

export default Sidebar;
