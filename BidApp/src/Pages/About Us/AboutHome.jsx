import React from 'react';
import PageBanner from './PageBanner';
import WhoWeAre from './WhoWeAre';
import AuctionSteps from './AuctionSteps';
import AboutUs from './AboutUs';


const AboutHome = () => {
    return (
        <div>
            <PageBanner></PageBanner>
        
            <WhoWeAre></WhoWeAre>
            <AboutUs></AboutUs>
            {/* <AuctionProcess></AuctionProcess> */}
            <AuctionSteps></AuctionSteps>
        </div>
    );
};

export default AboutHome;