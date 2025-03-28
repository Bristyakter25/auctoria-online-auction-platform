import BiddingMadness from "../../components/HomeComponents/BiddingMadness";

import ContactForm from "../../components/HomeComponents/ContactForm";

import Hero from "../../components/HomeComponents/Hero";
import MeetCards from "../../components/HomeComponents/MeetCards";
import Partners from "../../components/HomeComponents/Partners";
import Question from "../../components/HomeComponents/Question";
import LatestAuctions from "../../components/HomeComponents/latestAuctions";
import FeaturedProducts from "./FeaturedProducts";
<<<<<<< HEAD
=======

import GetInKnow from "./GetInKnow";


>>>>>>> 985095dec90d411e067993f3169b099712f871a4

const Home = () => {
  return (
    <div className="w-full">
      <Hero></Hero>
  <div className="lg:max-w-7xl mx-auto">
  <LatestAuctions></LatestAuctions>
      <Question />
      <FeaturedProducts></FeaturedProducts>
<<<<<<< HEAD
=======

      <GetInKnow></GetInKnow>


>>>>>>> 985095dec90d411e067993f3169b099712f871a4
      <MeetCards />
      <Partners />
      <BiddingMadness />
      <ContactForm />
  </div>
    </div>
  );
};

export default Home;
