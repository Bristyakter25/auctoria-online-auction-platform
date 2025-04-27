import BiddingMadness from "../../components/HomeComponents/BiddingMadness";

import ContactForm from "../../components/HomeComponents/ContactForm";

import MeetCards from "../../components/HomeComponents/MeetCards";

import Partners from "../../components/HomeComponents/Partners";
import Question from "../../components/HomeComponents/Question";

import LatestAuctions from "../../components/HomeComponents/latestAuctions";

import FeaturedProducts from "./FeaturedProducts";
import GetInKnow from "./GetInKnow";

import EidGreeting from "../Eid/EidGreetings";

import AboutSection from "../../components/HomeComponents/AboutSection";
import AuctionProcess from "../About Us/AuctionProcess";
import TrustedPartners from "../../components/HomeComponents/TrustedPartners";
import Banner from "../../components/HomeComponents/BannerFunctions/Banner";
import RecentWinner from "./RecentWinner";
// import SellerProfile from "../../SellerProfile/SellerProfile";

const Home = () => {
  return (
    <div className="w-full">
      <Banner></Banner>
      <div className="lg:max-w-7xl mx-auto">
        {/* <EidGreeting /> */}
        <LatestAuctions></LatestAuctions>
        <FeaturedProducts></FeaturedProducts>
        <RecentWinner />
        
        <AuctionProcess></AuctionProcess>
       
        {/* <GetInKnow></GetInKnow> */}
        <AboutSection></AboutSection>
        {/* <MeetCards /> */}
       
        <Question />
        {/* <Partners /> */}
        {/* <BiddingMadness /> */}
        <ContactForm />
        {/* <SellerProfile /> */}
        <TrustedPartners></TrustedPartners>
      </div>
    </div>
  );
};

export default Home;
