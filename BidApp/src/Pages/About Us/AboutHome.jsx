import React from 'react';
import PageBanner from './PageBanner';
import WhoWeAre from './WhoWeAre';
import AboutSection from '../../components/HomeComponents/AboutSection';
import AuctionProcess from './AuctionProcess';
import AuctionSteps from './AuctionSteps';


const AboutHome = () => {
    return (
        <div>
            <PageBanner></PageBanner>
        
            <WhoWeAre></WhoWeAre>
            <AboutSection></AboutSection>
            {/* <AuctionProcess></AuctionProcess> */}
            <AuctionSteps></AuctionSteps>
        </div>
    );
};

export default AboutHome;