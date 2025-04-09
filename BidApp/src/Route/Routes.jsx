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
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import WishList from "../Pages/WishList";
import UpdateBid from "../components/sellerComponents/updateBid";
import Bid from "../Pages/BidTask/Bid";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/addProduct", element: <AddProduct /> },
      { path: "/allAuctions", element: <AllAuctions /> },
      { path: "/profile", element: <Profile /> },
      { path: "/bid/:id", element: <Bid /> },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>
      }
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
      { path: "manageUsers", element: <ManageUsers /> },
      // { path: "wishList", element: <WishList /> },
      { path: "wishList", element: <WishList /> },
      { path: "profile", element: <Profile /> },
      { path: "updatedBidInfo", element: <UpdateBid /> },
    ],
  },
]);
