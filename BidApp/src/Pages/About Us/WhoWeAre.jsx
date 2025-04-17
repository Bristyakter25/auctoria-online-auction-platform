import React from 'react';

function WhoWeAre() {
 return (
  <div className="container mx-auto py-16">
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left Side: Text Content */}
    <div className="px-4">
     <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
     <p className="text-gray-600 mb-8">
      Welcome to Zenfy, where digital innovation meets strategic excellence. As a dynamic force in the realm of digital marketing, we are dedicated to propelling businesses into the spotlight of online success with us for this example.
     </p>

     {/* Our Expert Solutions */}
     <div className="flex items-start mb-6">
      <div className="p-3 bg-blue-50 rounded-full mr-4">
       {/* Replace with your icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3L3 6.066m0 0L3 21.066 9.568 18M3 6.066h18M3 21.066h18M9.568 3L15 6.066m0 0L15 21.066 9.568 18M15 6.066h6m-6 15.066h6" />
       </svg>
      </div>
      <div>
       <h3 className="text-xl font-semibold text-gray-700 mb-2">Our Expert Solutions</h3>
       <p className="text-gray-500">Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.</p>
      </div>
     </div>

     {/* Trusted Performance */}
     <div className="flex items-start mb-6">
      <div className="p-3 bg-blue-50 rounded-full mr-4">
       {/* Replace with your icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
       </svg>
      </div>
      <div>
       <h3 className="text-xl font-semibold text-gray-700 mb-2">Trusted Performance</h3>
       <p className="text-gray-500">Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.</p>
      </div>
     </div>

     {/* Experience the Difference */}
     <div className="flex items-start">
      <div className="p-3 bg-blue-50 rounded-full mr-4">
       {/* Replace with your icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
       </svg>
      </div>
      <div>
       <h3 className="text-xl font-semibold text-gray-700 mb-2">Experience the Difference</h3>
       <p className="text-gray-500">Praesent gravida nunc at tortor cursus, molestie dapibus purus posuere. Vestibulum commodo, massa eget rutrum feugiat.</p>
      </div>
     </div>
    </div>

    {/* Right Side: Image */}
    <div className="relative">
     <img
      src="	https://probid-wp.egenstheme.com/wp-content/uploads/2024/10/home5-about-img.webp"
      alt="About Us"
      className=" relative z-10"
     />

     {/* Badge */}
     <div className="absolute top-1/4 right-0 transform translate-x-1/4 -translate-y-1/4 bg-white rounded-lg shadow-md p-4 w-48 text-center z-20">
      <div className="flex items-center justify-center space-x-2 mb-2">
       {/* Replace with your icon */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.225 1.225 0 001.085 1.244l.148-.05a1.227 1.227 0 01.78-.938l.3-.467c.165-.258.42-.366.689-.366H11M14.828 14.912a1.227 1.227 0 01.938.78l.05.148a1.225 1.225 0 001.244 1.085m-8.305 0h3.427m-3.427-3.906a1.227 1.227 0 01.938-.78l.05-.148a1.225 1.225 0 001.085-1.244M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-1.5H7.5m6 1.5v6m-6-1.5A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V15m-13.5-1.5H15" />
       </svg>
       <span className="text-2xl font-bold text-gray-800">5.6k</span>
      </div>
      <p className="text-sm text-gray-500">Number Of Total Bidder</p>
     </div>

    </div>
   </div>
  </div>
 );
}

export default WhoWeAre;
