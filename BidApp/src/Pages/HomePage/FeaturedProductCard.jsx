import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProductCard = ({ auction }) => {
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  
  const {
    _id,
    productName,
    productImage,
    auctionStartDate,
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
    <div className="card card-compact bg-white dark:bg-transparent rounded-2xl transition-all duration-1000 hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
      <figure className="relative">
        <img
          src={productImage}
          className="h-[280px] w-full object-cover relative"
          alt="product"
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white  text-gray-700 px-2 py-0.5 rounded-full text-sm shadow-md z-10 flex items-center gap-2">
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
      <div className="px-3 dark:text-white text-gray-700">
        <div className="h-[90px] space-y-1">
          <h2 className="font-bold text-center mt-5 text-2xl h-[60px]">{productName}</h2>
          <p className="mb-3">
                <span className="font-bold text-lg">Auction Start Date: </span>{" "}
                {formatDate(auctionStartDate)}
              </p>
          <p className="flex font-bold text-lg items-center">
            Starting Bid: 
            <span className="font-bold text-xl ml-2 "> ${startingBid}</span>
          </p>
          <p className="absolute top-0 right-1 py-0.5 border bg-lime-400 w-20 text-center text-gray-600 dark:text-gray-700 rounded-full">
            {" "}
            {status}
          </p>
        </div>
        <div className="card-actions my-12  flex items-center justify-center">
        <button
  className="btn  w-[260px] bg-blue-300 border-none hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:hover:bg-blue-700 dark:text-white mt-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
  onClick={() => navigate(`/bid/${_id}`)}
>
  <span className="mr-2">💰</span> Bid Now!
</button>

        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
