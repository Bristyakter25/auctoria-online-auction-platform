import checkImage from "../../assets/check-mark.png";
const GetInKnow = () => {
  return (
    <div className="my-10">
      <h2 className="text-5xl text-black mt-20  font-bold text-center mb-4">
        Get In know
      </h2>
      <p className="text-center text-xl font-semibold mb-10">
        Welcome to Auctoria, where bidding meets excitement! Explore a world of
        unique treasures, rare collectibles, and exclusive deals. Join us and
        experience the thrill of winning your next prized possession!
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl gap-y-4 gap-x-20 mx-auto">
        <div className="flex items-center">
          <img src={checkImage} className="w-10" alt="" />
          <p className="text-xl font-semibold">
            Discover rare and exclusive auction listings.
          </p>
        </div>
        <div className="flex items-center">
          <img src={checkImage} className="w-10" alt="" />
          <p className="text-xl font-semibold">
            Bid now and claim your dream item!
          </p>
        </div>
        <div className="flex items-center">
          <img src={checkImage} className="w-10" alt="" />
          <p className="text-xl font-semibold">
            Join our community for the latest auction insights.
          </p>
        </div>
        <div className="flex items-center">
          <img src={checkImage} className="w-10" alt="" />
          <p className="text-xl font-semibold">
            Secure the best deals in live auctions.
          </p>
        </div>
        <div className="flex items-center">
          <img src={checkImage} className="w-10" alt="" />
          <p className="text-xl font-semibold">
            Place your bid today and win big!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetInKnow;
