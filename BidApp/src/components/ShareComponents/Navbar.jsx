import { useContext, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "../../Pages/BidTask/NotificationBell";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Successfully signed out");
        navigate("/login"); // Redirect to login page after signing out
      })
      .catch((error) => {
        console.error("Failed to sign out", error);
        alert("Error signing out, please try again.");
      });
  };

  return (
    <div className="navbar rounded-3xl p-4 flex justify-between items-center max-w-7xl mx-auto">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src="https://i.ibb.co/Js9CG21/361076432-c6ae963c-9e4b-48c4-9bda-f1b54e9f5bf4.jpg"
          alt="Logo"
          className="rounded-full w-10 h-10 object-cover"
        />
        <span className="font-semibold text-lg">Auctoria</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-6 text-gray-800">
        <NavLink to="/" className="hover:text-blue-500">
          Home
        </NavLink>

        <NavLink to="/allAuctions" className="hover:text-blue-500">
          View All Auctions
        </NavLink>
        <NavLink to="/addProduct" className="hover:text-blue-500">
          Add Product
        </NavLink>

        {user && (
          <NavLink to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </NavLink>
        )}

        {user ? (
          <div className="relative">
            <img
              src={user.photoURL || "/default-profile.png"}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
                <Link
                  to="profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <button className="hover:text-blue-500">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="hover:text-blue-500">Register</button>
            </Link>
          </div>
        )}
      </div>

      {/* Contact Icons & Button */}
      <div className="hidden md:flex items-center space-x-4">
        <NotificationBell />
        <FaPhoneAlt className="text-xl cursor-pointer hover:text-blue-500" />
        <FaEnvelope className="text-xl cursor-pointer hover:text-blue-500" />
        <FaMapMarkerAlt className="text-xl cursor-pointer hover:text-blue-500" />
        <Link to="/get-started">
          <button className="bg-teal-300 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-teal-400 transition">
            Get Started
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="btn btn-circle btn-ghost">☰</button>
      </div>
    </div>
  );
};

export default Navbar;
