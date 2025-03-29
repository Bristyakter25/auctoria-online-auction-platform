import { Outlet } from "react-router-dom";

import Footer from "../components/ShareComponents/Footer";
import Navbar from "../components/ShareComponents/Navbar";



const MainLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 bg-slate-200 shadow-md">
        <Navbar />
      </div>
     <div className="lg:max-w-7xl mx-auto">
     <Outlet />
     </div>
      <Footer />
    </div>
  );
};





export default MainLayout;
