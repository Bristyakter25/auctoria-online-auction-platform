import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/HomePage/Home";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddProduct from "../Pages/AddProduct";
import AllAuctions from "../Pages/AllAuctions";
import AuctionChart from "../Pages/Dashboard/AuctionChart";
import Profile from "../components/HomeComponents/profile";

import WishList from "../Pages/WishList";
import UpdateBid from "../components/sellerComponents/updateBid";
import Bid from "../Pages/BidTask/Bid";

import BidHistory from "../Pages/BidTask/BidHistory";
import Payment from "../components/paymentFunctions/Payment";

import AboutHome from "../Pages/About Us/AboutHome";
import ProductHistory from "../Pages/BidTask/ProductHistory";
import ManageUsers from "../Pages/Dashboard/AdminRoutes/ManageUsers";
import Analytics from "../Pages/Dashboard/AdminRoutes/Analytics";
import RecentOrders from "../Pages/Dashboard/AdminRoutes/RecentOrders";
import Reviews from "../Pages/Dashboard/AdminRoutes/Reviews";
import ChatBox from "../Pages/BidTask/ChatBox";
import BidInstruction from "../components/HomeComponents/BannerFunctions/BidInstruction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about-us", element: <AboutHome></AboutHome> },
      { path: "bidInstruction", element: <BidInstruction></BidInstruction> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/addProduct", element: <AddProduct /> },
      { path: "bid-history", element: <BidHistory></BidHistory> },

      { path: "/allAuctions", element: <AllAuctions /> },
      { path: "/profile", element: <Profile /> },
      { path: "/bid/:id", element: <Bid /> },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "/chatBox",
        element: <ChatBox></ChatBox>,
      },
      // {
      //   path: "/sellerProfile",
      //   element: <SellerProfile />,
      // },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { path: "auctionChart", element: <AuctionChart /> },

      { path: "manageUsers", element: <ManageUsers></ManageUsers> },
      { path: "analytics", element: <Analytics></Analytics> },
      {
        path: "recentOrders",
        element: <RecentOrders></RecentOrders>,
      },
      {
        path: "reviews",
        element: <Reviews></Reviews>,
      },
      { path: "wishList", element: <WishList /> },
      { path: "bid-history", element: <BidHistory></BidHistory> },
      { path: "product-history", element: <ProductHistory></ProductHistory> },
      { path: "profile", element: <Profile /> },
      { path: "updatedBidInfo", element: <UpdateBid /> },
      {
        path: "pay",
        element: <Payment></Payment>,
      },
    ],
  },
]);
