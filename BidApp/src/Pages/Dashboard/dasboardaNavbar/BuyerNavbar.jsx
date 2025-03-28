import { NavLink } from "react-router-dom";

const BuyerNavbar = () => {
  return (
    <div>
      <NavLink to="/dashboard/addProduct" className="py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600">
          Add Product
          </NavLink>
    </div>
  );
};

export default BuyerNavbar;
