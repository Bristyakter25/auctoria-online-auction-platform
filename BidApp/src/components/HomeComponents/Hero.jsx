import bannerImage from "../../assets/auction-banner.jpg";

const Hero = () => {
  return (
    <div className="">
      <div
        className="hero h-[700px]"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Bid Big</h1>
            <p className="mb-5 font-bold uppercase">
              Join the wildest auction platform where every bid counts!
            </p>
            <button className="btn bg-teal-300 rounded-xl">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
