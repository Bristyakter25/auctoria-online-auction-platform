import React from 'react';
import { Link } from 'react-router-dom';

const ContactBanner = () => {
  return (
    <section className="w-full h-96  py-40 px-4 text-center "
    style={{
      backgroundImage: "url(https://www.openproject.org/assets/images/contact/hero-contact-4cf9fa21.png)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  
    >
      {/* Optional grid pattern background */}
      {/* <div className="absolute inset-0 bg-[url('	https://static.vecteezy.com/system/resources/thumbnails/020/804/109/small_2x/communication-and-technology-concept-hand-putting-wooden-block-cube-symbol-telephone-email-address-website-page-contact-us-or-e-mail-marketing-contact-us-in-customer-support-concept-photo.jpg')] opacity-10 pointer-events-none"></div> */}

    
      <div className="relative z-10 mt-20">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <div className="mt-2 text-sm">
          <Link to="/" className="text-white text-2xl hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-500">→</span>
          <span className="text-white text-2xl">Contact Us</span>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
