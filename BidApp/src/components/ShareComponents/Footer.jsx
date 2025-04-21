import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative py-10 mt-10 bg-gradient-to-r from-yellow-100 via-lime-100 to-green-200 text-black pt-20 px-4 md:px-16 pb-12 overflow-hidden">
      
      {/* Top Curve */}
      <div className="absolute -top-1 left-0 w-full h-24 rotate-180">
        <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,80 C360,0 1080,0 1440,80 L1440,100 L0,100 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* <div className="absolute -top-1 left-0 w-full h-16 rotate-180">
  <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
    <path
      d="M0,80 C480,20 960,20 1440,80 L1440,0 L0,0 Z"
      fill="white"
    />
  </svg>
</div> */}


      {/* Footer Content */}
      <div className="max-w-7xl py-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Auctoria</h2>
          <p className="text-sm">
            Your one-stop destination for all things - auctions, and deals.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-sm border-t border-black/20 pt-4 relative z-10">
        &copy; {new Date().getFullYear()} Auctoria. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
