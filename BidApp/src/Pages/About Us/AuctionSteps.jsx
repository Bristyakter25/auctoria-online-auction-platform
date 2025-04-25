import React from 'react';
import Marquee from 'react-fast-marquee';

function AuctionSteps() {
 return (
  <div className="bg-purple-50 py-12">
   <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center  mb-8">Select Our Product At Our Auction.</h2>

    {/* Steps */}
   
       
    <div className="lg:flex justify-center items-center mb-12">
     {/* Step 1 */}
     <div className="relative flex items-center">
      <div className="badge badge-primary badge-md">Step 01</div>
      <div className="w-24 h-1 bg-gray-300"></div>
     </div>

     {/* Step 2 */}
     <div className="relative flex items-center">
      <div className="badge badge-primary badge-md">Step 02</div>
      <div className="w-24 h-1 bg-gray-300"></div>
     </div>

     {/* Step 3 */}
     <div className="relative flex items-center">
      <div className="badge badge-primary badge-md">Step 03</div>
      <div className="w-24 h-1 bg-gray-300"></div>
     </div>

     {/* Step 4 */}
     <div className="relative">
      <div className="badge badge-primary badge-md">Step 04</div>
     </div>
    </div>

    {/* Cards */}
    <Marquee pauseOnHover speed={50} gradient={false}>
    <div className="flex gap-6">
     {/* Registration */}
     <div className="w-72  shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Registration</h2>
       <p className=" text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 ">
        <li>Specific Information</li>
        <li>Required For Registration</li>
        <li>Such As Identification</li>
       </ul>
      </div>
     </div>

     {/* Select Product */}
     <div className=" w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607m0 0v3.378l3.379-3.378z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Select Product</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Search Your Auction</li>
        <li>Find The Right Product</li>
        <li>Find The Right Product</li>
       </ul>
      </div>
     </div>

     {/* Go to Bidding */}
     <div className="w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m-3 9l2.25-.75L15 15m0 0l2.25.75L15 18m-3-9l2.25.75L15 9m0 0l2.25-.75L15 6" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Go to Bidding</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Choose The Bid Product</li>
        <li>Bid according your ability</li>
        <li>Keep your eyes on the bid</li>
       </ul>
      </div>
     </div>

     {/* Make Payment */}
     <div className="w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Make Payment</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Specific Information</li>
        <li>Required For Registration</li>
        <li>Such As Identification</li>
       </ul>
      </div>
     </div>
     {/* Registration */}
     <div className="w-72  shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Registration</h2>
       <p className=" text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 ">
        <li>Specific Information</li>
        <li>Required For Registration</li>
        <li>Such As Identification</li>
       </ul>
      </div>
     </div>

     {/* Select Product */}
     <div className=" w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607m0 0v3.378l3.379-3.378z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Select Product</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Search Your Auction</li>
        <li>Find The Right Product</li>
        <li>Find The Right Product</li>
       </ul>
      </div>
     </div>

     {/* Go to Bidding */}
     <div className="w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m-3 9l2.25-.75L15 15m0 0l2.25.75L15 18m-3-9l2.25.75L15 9m0 0l2.25-.75L15 6" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Go to Bidding</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Choose The Bid Product</li>
        <li>Bid according your ability</li>
        <li>Keep your eyes on the bid</li>
       </ul>
      </div>
     </div>

     {/* Make Payment */}
     <div className="w-72 shadow-xl">
      <div className="card-body">
       {/* Icon */}
       <div className="flex justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
       </div>
       <h2 className="card-title text-gray-800 justify-center">Make Payment</h2>
       <p className="text-gray-600 text-center">Cras cursus faucibus enim id portac et feugiat tortor duis ut egestas.</p>
       <ul className="list-decimal list-inside mt-4 text-gray-500">
        <li>Specific Information</li>
        <li>Required For Registration</li>
        <li>Such As Identification</li>
       </ul>
      </div>
     </div>
    </div>
   
    </Marquee>
    
    </div>
  
   </div>

 );
}

export default AuctionSteps;
