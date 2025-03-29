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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Make sure to close the component properly
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/allAuctions",
        element: <AllAuctions />,
      },
      {
        path: "/profile",  
        element: <Profile />,
      },
      
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
      {
        path: "auctionChart",
        element: <AuctionChart />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "wishList",
        element: <WishList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "updatedBidInfo",
        element: <UpdateBid />,
      },
    ],
  },
]);
