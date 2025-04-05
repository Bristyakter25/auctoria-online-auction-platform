
import { NavLink, Outlet } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import {  FaHospitalUser,  FaRegAddressBook, FaUsers, } from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
// import { FaRegHeart } from "react-icons/fa";

import { GrHome } from "react-icons/gr";
import { MdOutlineAddToQueue } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";


const Dashboard = () => {
    return (
  <div className="flex  w-full  h-full">
 
 {/* Sidebar */}
 <div className="bg-slate-200 lg:px-8 lg:py-10 min-h-screen">
   <ul className="menu">
     <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">Menu</h2>
     <li className="text-xl"><NavLink to="/dashboard/auctionChart"><FaChartBar /> Auction Chart</NavLink></li>
     <li className="text-xl"><NavLink to="/"><GrHome /> Home</NavLink></li>
     <li className="text-xl"><NavLink to='/allAuctions'><RiAuctionLine />All Auctions</NavLink></li>
     <li className="text-xl"><NavLink to="/dashboard/profile"><FaHospitalUser /> Manage Profile</NavLink></li>
     <div className="divider"></div>
     {/* Organizer Dashboard (Admin) */}
       <div>
         <h2 className="text-center my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">Admins Dashboard</h2>
         <li className="text-xl"><NavLink to="/dashboard/manageUsers"><FaUsers />Manage Users</NavLink></li>
         
       </div>

   </ul>

 <div className="divider"></div>


   <ul className="menu">
     <h2 className=" my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">Sellers Dashboard</h2>
     
     
     <li className="text-xl"><NavLink to='/addProduct'><MdOutlineAddToQueue />
     Add Product</NavLink></li>
     <li className="text-xl"><NavLink to='/dashboard/updateBidInfo'><GrCircleInformation />Update Bid Information </NavLink></li>
    
   </ul>

   <div className="divider"></div>

   

 
 
</div>
{/* Main Content */}
<div className="flex-1 ml-5 lg:ml-0 p-4">
   <Outlet />
 </div>
</div>
    )
} 

export default Dashboard;