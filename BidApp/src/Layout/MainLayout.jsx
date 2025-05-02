import { Outlet } from "react-router-dom";

import Footer from "../components/ShareComponents/Footer";
import Navbar from "../components/ShareComponents/Navbar";

const MainLayout = () => {
  return (
    <div className="dark:bg-[#0a0a23]">
      <div className="fixed top-0 left-0 w-full z-50 ">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
