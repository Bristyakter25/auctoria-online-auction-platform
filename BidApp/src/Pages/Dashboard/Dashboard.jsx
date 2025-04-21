import { NavLink, Outlet } from "react-router-dom";
import { GrCircleInformation } from "react-icons/gr";
import {  FaHospitalUser, FaUsers, } from "react-icons/fa";
import { RiAuctionLine } from "react-icons/ri";
// import { FaRegHeart } from "react-icons/fa";
import { BsBox2Heart } from "react-icons/bs";
import { GrHome } from "react-icons/gr";
import { MdOutlineAddToQueue } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import useRole from "../../hooks/useRole";
import ThemeToggle from "../../components/HomeComponents/ThemeToggle";



const Dashboard = () => {
  const [role,isLoading] = useRole();
  // console.log(role, "role", isLoading);
    return (
  <div className="flex  w-full  h-full">
 
 {/* Sidebar */}
 <div className="bg-blue-400  lg:px-8 lg:py-10 min-h-screen">
   <ul className="menu">
     <h2 className="text-center my-5 font-bold text-xl  text-[#4635B1] dark:text-purple-300">Menu</h2>
     <li className="text-xl"><NavLink to="/dashboard/auctionChart"><FaChartBar /> Auction Chart</NavLink></li>
     <li className="text-xl"><NavLink to="/"><GrHome /> Home</NavLink></li>
     <li className="text-xl"><NavLink to='/allAuctions'><RiAuctionLine />All Auctions</NavLink></li>
     <li className="text-xl"><NavLink to="/dashboard/profile"><FaHospitalUser /> Manage Profile</NavLink></li>
     
   </ul>

 <div className="divider"></div>
 {/* Organizer Dashboard (Admin) */}
 {role=='admin' && <div>
         <ul className="menu">
         <h2 className="text-center my-5 font-bold text-xl text-[#4635B1] dark:text-purple-300">Admins Dashboard</h2>
         <li className="text-xl"><NavLink to="/dashboard/manageUsers"><FaHospitalUser /> Manage Users</NavLink></li>
         <li className="text-xl"><NavLink to="/dashboard/analytics"><FaHospitalUser /> Analytics</NavLink></li>
         <li className="text-xl"><NavLink to="/dashboard/recentOrders"><FaHospitalUser /> Recent Orders</NavLink></li>
         <li className="text-xl"><NavLink to="/dashboard/reviews"><FaHospitalUser /> Review & Feedback</NavLink></li>
         </ul>
        </div>}
 {/* Seller Dashboard */}
  {role=='seller' && <ul className="menu">
     <h2 className=" my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">Sellers Dashboard</h2>
     <li className="text-xl"><NavLink to='/addProduct'><MdOutlineAddToQueue />
     Add Product</NavLink></li>
     <li className="text-xl"><NavLink to='/dashboard/updateBidInfo'><GrCircleInformation />Update Bid Information </NavLink></li>
     <li  className="text-xl"><NavLink to="/dashboard/product-history"><BsBox2Heart />Product History</NavLink></li>
   </ul>}
<div className="divider"></div>
 
{role=='user' && <ul className="menu">
<h2 className=" my-5 font-bold text-xl dark:text-[#A294F9] text-[#4635B1]">Users Dashboard</h2>
<li  className="text-xl"><NavLink to="/dashboard/wishList"><BsBox2Heart />Wish Listed Products</NavLink></li>
<li  className="text-xl"><NavLink to="/dashboard/bid-history"><BsBox2Heart />BidHistory</NavLink></li>

</ul>}
</div>

 {/* Content */}
 <div className="flex-1 flex flex-col ">
        <div className="p-4 bg-white  border-b flex justify-between items-center">
          <button className="lg:hidden text-gray-600 text-2xl" ></button>
          <div className="flex items-center justify-between">
          <h1 className="text-lg text-black font-bold">Dashboard</h1>
          <div>
                <ThemeToggle></ThemeToggle>
              </div>
          </div>
        </div>
        
        <div className="p-4 overflow-auto flex-1"><Outlet />
     
        </div>
      </div>
</div>
    )
} 

export default Dashboard;