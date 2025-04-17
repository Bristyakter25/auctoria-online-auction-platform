import BiddingMadness from "../../components/HomeComponents/BiddingMadness";

import ContactForm from "../../components/HomeComponents/ContactForm";

import Hero from "../../components/HomeComponents/Hero";
import Partners from "../../components/HomeComponents/Partners";
import Question from "../../components/HomeComponents/Question";
import TrustedPartners from "../../components/HomeComponents/TrustedPartners";

import Countdown from "../../components/NewFeatures/Countdown";
import FeaturedProducts from "./FeaturedProducts";
import GetInKnow from "./GetInKnow";
import NotificationBell from "../BidTask/NotificationBell";
import EidGreeting from "../Eid/EidGreetings";
import Banner from "../../components/HomeComponents/Banner";
import AboutSection from "../../components/HomeComponents/AboutSection";
import AuctionProcess from "../About Us/AuctionProcess";
import HeroSection from "../About Us/HeroSection";
import LatestAuctions from "../../components/HomeComponents/LatestAuctions";

const Home = () => {
  return (
    <div className="w-full">
      {/* <Hero></Hero> */}
      {/* <Banner></Banner> */}
      <HeroSection></HeroSection>
      <div className="lg:max-w-7xl mx-auto">
        <EidGreeting />
        <LatestAuctions></LatestAuctions>
        <Question />
        <FeaturedProducts></FeaturedProducts>
        {/* <GetInKnow></GetInKnow> */}
        <AboutSection></AboutSection>
        {/* <MeetCards /> */}
        <AuctionProcess></AuctionProcess>
        <Partners />
        <BiddingMadness />
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
