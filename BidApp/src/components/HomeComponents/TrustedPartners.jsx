import React from 'react';

import Marquee from "react-fast-marquee";

const TrustedPartners = () => {
  return (
  <div>
    <h2 className="text-center text-2xl font-semibold mb-4 mt-20 ">
        We Worked With Global Largest Brand
      </h2>
      <h2 className='text-center mb-10'>
      Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. <br /> We want to be a part of your smile, success and future growth.
      </h2>
      <div className="bg-[#eaf4fc] py-5  h-40">
      
      <Marquee pauseOnHover speed={50} gradient={false}>
        <div className="flex mt-5 gap-16 items-center">
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-01.png" alt="Beautico" className="h-12 ml-6" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-02.png" alt="Aploxn" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-03.png" alt="Drivco" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-04.png" alt="Scooby" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-05.png" alt="PicsZen" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-06.png" alt="Park Place" className="h-12" />
        </div>
      </Marquee>
    </div>
  </div>

  );
};

export default TrustedPartners;

