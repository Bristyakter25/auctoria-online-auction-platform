import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProductCard = ({ auction }) => {
  const navigate = useNavigate();
  const {
    _id,
    productName,
    productImage,
    description,
    status,
    startingBid,
    auctionEndTime,
  } = auction;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer Effect
  useEffect(() => {
    if (!auctionEndTime || isNaN(new Date(auctionEndTime).getTime())) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auctionEndTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionEndTime]);

  return (
    <div className="card card-compact bg-white shadow-md border rounded-2xl ">
      <figure className="relative">
        <img
          src={productImage}
          className="h-[230px] w-full object-cover relative"
          alt="product"
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 px-2 py-0.5 rounded-full text-sm shadow-md z-10 flex items-center gap-2">
          <div className=" px-1 py-0.5 rounded">
            <span className="font-bold">{timeLeft.days}</span> Days
          </div>
          <span className="text-gray-500">•</span>
          <div className="px-1 py-0.5 rounded ">
            <span className="font-bold">{timeLeft.hours}</span> Hours
          </div>
          <span className="text-gray-500">•</span>
          <div className=" px-1 py-1 rounded">
            <span className="font-bold">{timeLeft.minutes}</span> Minutes
          </div>
          <span className="text-gray-500">•</span>
          <div className=" px-1 py-1 rounded">
            <span className="font-bold">{timeLeft.seconds}</span> Seconds
          </div>
        </div>
      </figure>
      <div className="card-body text-gray-700">
        <div className="h-[90px] space-y-1">
          <h2 className="font-bold text-xl ">{productName}</h2>
          {/* <p>{description}</p> */}
          <p className="flex items-center">
            Starting Bid
            <span className="font-bold text-xl ">${startingBid}</span>
          </p>
          <p className="absolute top-0 right-1 py-0.5 border bg-lime-400 w-20 text-center text-gray-600 dark:text-gray-700 rounded-full">
            {" "}
            {status}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn " onClick={() => navigate(`/bid/${_id}`)}>
            Bid Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
