import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellerNavbar = () => {
  return (
    <div>
      <Link to="/dashboard/addProduct" className="py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600"><FaHome /> Add Product</Link>
      <Link to="/dashboard/updatedBidInfo" className="py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600"><FaHome /> Update Bid </Link>
    </div>
  );
};

export default SellerNavbar;
