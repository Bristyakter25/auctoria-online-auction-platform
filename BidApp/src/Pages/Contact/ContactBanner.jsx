import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
const ContactBanner = () => {
  return (
    
    
      <div className="relative bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54] z-10 ">
    
          <div className="text-center mb-10  dark:text-white py-32 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
                        <h2 className="text-5xl dark:text-white font-bold mb-5">Contact Us </h2>
                
                        <div className="flex items-center justify-center gap-x-3 text-center ">
                          <Link to="/" className="text-lg hover:text-green-600">
                            Home
                          </Link>
                          <p className="mt-2 ">
                            {" "}
                            <FaLongArrowAltRight />
                          </p>
                          <p className="text-lg ">Contact Us</p>
                        </div>
                      </div>
        </div>
    
  
  );
};

export default ContactBanner;
