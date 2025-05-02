import React from "react";
import Marquee from "react-fast-marquee";

function AuctionProcess() {
  return (
    <div className="py-8  mt-4 dark:bg-transparent">
      <div className="lg:w-[1224px] w-[400px] mx-auto">
        <h2 className="lg:text-4xl text-3xl  dark:text-[#4D55CC]  font-bold text-center mb-4">
          Select Your Product At Our Auction.
        </h2>
        <p className="text-center dark:text-white text-gray-500 mb-8">
          Feel free adapt this based on the specific managed services, features
        </p>
        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="flex  gap-6">
            {/* Registration */}
            <div className="card card-compact ml-4 bg-lime-50 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Registration
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Specific Information</li>
                  <li>Required For Registration</li>
                  <li>Such As Identification</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 01
                </div>
              </div>
            </div>
            {/* Select Product */}
            <div className="card card-compact bg-lime-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607m0 0v3.378l3.379-3.378z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Select Product
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Search Your Auction</li>
                  <li>Find The Right Product</li>
                  <li>Choose Your Final Auction</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 02
                </div>
              </div>
            </div>

            {/* Go to Bidding */}
            <div className="card card-compact bg-rose-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m-3 9l2.25-.75L15 15m0 0l2.25.75L15 18m-3-9l2.25.75L15 9m0 0l2.25-.75L15 6"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Go to Bidding
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Choose The Bid Product</li>
                  <li>Bid According Your Ability</li>
                  <li>Keep Your Eyes On The Bid</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 03
                </div>
              </div>
            </div>

            {/* Make Payment */}
            <div className="card card-compact mr-4 bg-sky-50  shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Make Payment
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Specific Information</li>
                  <li>Required For Registration</li>
                  <li>Such As Identification</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 04
                </div>
              </div>
            </div>

            {/* Registration */}
            <div className="card card-compact bg-lime-50 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Registration
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Specific Information</li>
                  <li>Required For Registration</li>
                  <li>Such As Identification</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 01
                </div>
              </div>
            </div>
            {/* Select Product */}
            <div className="card card-compact bg-lime-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607m0 0v3.378l3.379-3.378z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Select Product
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Search Your Auction</li>
                  <li>Find The Right Product</li>
                  <li>Choose Your Final Auction</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 02
                </div>
              </div>
            </div>

            {/* Go to Bidding */}
            <div className="card card-compact bg-rose-100 shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m-3 9l2.25-.75L15 15m0 0l2.25.75L15 18m-3-9l2.25.75L15 9m0 0l2.25-.75L15 6"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Go to Bidding
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Choose The Bid Product</li>
                  <li>Bid According Your Ability</li>
                  <li>Keep Your Eyes On The Bid</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 03
                </div>
              </div>
            </div>

            {/* Make Payment */}
            <div className="card card-compact bg-sky-50  shadow-xl">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-gray-800 justify-center">
                  Make Payment
                </h2>
                <p className="text-gray-600 text-center"> </p>
                <ul className="list-decimal list-inside mt-4 text-gray-500">
                  <li>Specific Information</li>
                  <li>Required For Registration</li>
                  <li>Such As Identification</li>
                </ul>
                <div className="absolute top-4 right-4 text-gray-400">
                  Step 04
                </div>
              </div>
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default AuctionProcess;
