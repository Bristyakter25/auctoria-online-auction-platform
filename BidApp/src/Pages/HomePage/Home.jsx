import Question from "../../components/HomeComponents/Question";

import LatestAuctions from "../../components/HomeComponents/latestAuctions";

import FeaturedProducts from "./FeaturedProducts";

import AboutSection from "../../components/HomeComponents/AboutSection";
import AuctionProcess from "../About Us/AuctionProcess";
import TrustedPartners from "../../components/HomeComponents/TrustedPartners";
import Banner from "../../components/HomeComponents/BannerFunctions/Banner";
import RecentWinner from "./RecentWinner";

import Testimonials from "../../components/HomeComponents/Testimonials";
import StatsCards from "../BidTask/StatsCards";
import CategoryCards from "../BidTask/CategoryCards";

// import SellerProfile from "../../SellerProfile/SellerProfile";

const Home = () => {
  return (
    <div className="w-full">
      <Banner></Banner>
      <div className="lg:max-w-7xl mx-auto font-sans">
        {/* <EidGreeting /> */}
        <LatestAuctions></LatestAuctions>
        <CategoryCards></CategoryCards>
        <FeaturedProducts></FeaturedProducts>
        <RecentWinner />

        <AboutSection></AboutSection>
        <Testimonials></Testimonials>

        <AuctionProcess></AuctionProcess>

        <Question />

        <StatsCards></StatsCards>

        <TrustedPartners></TrustedPartners>
      </div>
    </div>
  );
};

export default Home;
