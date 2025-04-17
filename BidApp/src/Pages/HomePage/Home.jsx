import BiddingMadness from "../../components/HomeComponents/BiddingMadness";

import ContactForm from "../../components/HomeComponents/ContactForm";

import MeetCards from "../../components/HomeComponents/MeetCards";

import Partners from "../../components/HomeComponents/Partners";
import Question from "../../components/HomeComponents/Question";

import LatestAuctions from "../../components/HomeComponents/latestAuctions";

import FeaturedProducts from "./FeaturedProducts";
import GetInKnow from "./GetInKnow";

import EidGreeting from "../Eid/EidGreetings";
import Banner from "../../components/HomeComponents/Banner";
import AboutSection from "../../components/HomeComponents/AboutSection";
import AuctionProcess from "../About Us/AuctionProcess";
import TrustedPartners from "../../components/HomeComponents/TrustedPartners";

const Home = () => {
  return (
    <div className="w-full">
     
      <Banner></Banner>
      <div className="lg:max-w-7xl mx-auto">
        <EidGreeting />
        <LatestAuctions></LatestAuctions>
        <Question />
        <FeaturedProducts></FeaturedProducts>
        {/* <GetInKnow></GetInKnow> */}
        <AboutSection></AboutSection>
        {/* <MeetCards /> */}
        <AuctionProcess></AuctionProcess>
        {/* <Partners /> */}
        <TrustedPartners></TrustedPartners>
        <BiddingMadness />
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
