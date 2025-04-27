

import { NavLink } from "react-router-dom";

const MenuItem = ({ to, icon, text }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 
          ${isActive ? "bg-purple-500 text-white font-bold shadow-md" : "hover:bg-purple-200 dark:hover:bg-gray-600"}`
        }
      >
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
