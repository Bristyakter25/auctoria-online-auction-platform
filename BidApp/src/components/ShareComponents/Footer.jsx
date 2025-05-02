import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-700 dark:bg-gray-900 text-white mt-24 overflow-hidden px-10 py-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Auctoria</h2>
          <p className="text-sm text-gray-300">
            Your one-stop destination for all things — auctions and deals. Find the best opportunities with us.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
              <FaFacebookF className="w-4 h-4 text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition">
              <FaTwitter className="w-4 h-4 text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition">
              <FaLinkedinIn className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10"></div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Auctoria</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
