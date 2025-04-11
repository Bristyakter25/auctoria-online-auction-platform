
import { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";




import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { WishlistContext } from "../../providers/wishListProvider";
import NotificationBell from "../../Pages/BidTask/NotificationBell";
import auctionIcon from "../../assets/auction.png";


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/login");
    });
  };
 

  const navLinks = (
    <>
      <NavLink to="/" className="hover:text-indigo-500 block py-1">
        Home
      </NavLink>
      <NavLink to="/allAuctions" className="hover:text-indigo-500 block py-1">
        Auctions
      </NavLink>
      <NavLink to="/addProduct" className="hover:text-indigo-500 block py-1">
        Add Product
      </NavLink>
      <NavLink to="/bid-history" className="hover:text-indigo-500 block py-1">
        Bid History
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard/auctionChart"
          className="hover:text-indigo-500 block py-1"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={auctionIcon} alt="logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-indigo-600">Auctoria</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navLinks}
        </div>

        {/* Right Side for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <NotificationBell user={user} />
          <Link
            to="/wishlist"
            className="relative bg-gray-100 p-2 rounded-full"
          >
            <IoMdHeartEmpty
              size={24}
              className="text-gray-700 hover:text-blue-500"
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-40 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hover:text-indigo-500">
                Login
              </Link>
              <Link to="/signup" className="hover:text-indigo-500">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-700"
          >
            {mobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 bg-white text-gray-700 font-medium space-y-2 overflow-hidden"
          >
            {navLinks}
            <div className="flex items-center gap-3 mt-3">
              <NotificationBell user={user} />
              <Link
                to="/wishlist"
                className="relative bg-gray-100 p-2 rounded-full"
              >
                <IoMdHeartEmpty
                  size={24}
                  className="text-gray-700 hover:text-blue-500"
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block hover:text-indigo-500 mt-2"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block text-left w-full hover:text-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="hover:text-indigo-500">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-indigo-500">
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
