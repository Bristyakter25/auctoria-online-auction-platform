import BiddingMadness from "../../components/HomeComponents/BiddingMadness";

import ContactForm from "../../components/HomeComponents/ContactForm";

import Hero from "../../components/HomeComponents/Hero";
import MeetCards from "../../components/HomeComponents/MeetCards";
import Partners from "../../components/HomeComponents/Partners";
import Question from "../../components/HomeComponents/Question";
import LatestAuctions from "../../components/HomeComponents/latestAuctions";
import FeaturedProducts from "./FeaturedProducts";
import GetInKnow from "./GetInKnow";
import NotificationBell from "../BidTask/NotificationBell";
import EidGreeting from "../Eid/EidGreetings";

const Home = () => {
  return (
    <div className="w-full">
      <Hero></Hero>
      <div className="lg:max-w-7xl mx-auto">
        <EidGreeting />
        <LatestAuctions></LatestAuctions>
        <Question />
        <FeaturedProducts></FeaturedProducts>
        <GetInKnow></GetInKnow>
        <MeetCards />
        <Partners />
        <BiddingMadness />
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
