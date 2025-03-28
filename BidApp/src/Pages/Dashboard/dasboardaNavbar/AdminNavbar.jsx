import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div>
      <>
        <Link to="/dashboard/admin-Home" className="py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600"><FaHome /> Admin Home</Link>
        <Link to="/dashboard/all-users" className="py-2 px-4 rounded flex items-center gap-1 hover:bg-blue-600"><FaUsers /> All Users</Link>
      </>
    </div>
  );
};

export default AdminNavbar;
