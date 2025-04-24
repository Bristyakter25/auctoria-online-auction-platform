import React from 'react';

import Marquee from "react-fast-marquee";

const TrustedPartners = () => {
  return (
    <div className="bg-[#eaf4fc] py-5  h-60">
      <h2 className="text-center text-xl font-semibold mt-10">
        We Worked With Global Largest Brand
      </h2>
      <Marquee pauseOnHover speed={50} gradient={false}>
        <div className="flex mt-16 gap-16 items-center">
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-01.png" alt="Beautico" className="h-12 ml-6" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-02.png" alt="Aploxn" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-03.png" alt="Drivco" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-04.png" alt="Scooby" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-05.png" alt="PicsZen" className="h-12" />
          <img src="https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/company-logo-06.png" alt="Park Place" className="h-12" />
        </div>
      </Marquee>
    </div>
  );
};

export default TrustedPartners;

