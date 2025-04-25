import { Link } from "react-router-dom";
import pic1 from "../../../assets/vintage items picture/cars.jpeg";
import pic2 from "../../../assets/vintage items picture/clock.jpeg";
import pic3 from "../../../assets/vintage items picture/grammophone.jpeg";
import pic4 from "../../../assets/vintage items picture/lamp image.jpeg";
import pic5 from "../../../assets/vintage items picture/vintage auction.jpeg";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 via-lime-100 to-green-200 py-20 px-6 md:px-10 lg:px-16 relative overflow-hidden">
      {/* Decorative SVG wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,100 C360,0 1080,0 1440,100 L1440,100 L0,100 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 relative z-10">
        {/* Left Section: Text and Buttons */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-snug">
            Select Your <span className="text-green-600">Best Bid Product</span> At Our Auction.
          </h2>
          <p className="mt-6 text-base md:text-lg text-black">
            Join us as we carve a path to success, driven by passion, powered by innovation, and we're here to turn them into reality.
          </p>
          <div className="flex  sm:flex-row gap-4 mt-10">
            <Link to="/bidInstruction">
              <button className="btn font-bold px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-green-700 hover:text-white transition duration-300">
                Start A Bid!
              </button>
            </Link>
            <Link to="/allAuctions">
              <button className="btn font-bold px-6 py-3 sm:px-8 sm:py-4 bg-white hover:bg-green-700 hover:text-white transition duration-300">
                View All Auction
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image Grid */}
<div className="w-full">
  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-3">
      <img
        className="w-full rounded-2xl h-auto max-h-32 object-cover transform transition duration-500 hover:scale-105 hover:-translate-y-1"
        src={pic1}
        alt="Vintage car"
      />
      <img
        className="w-full rounded-2xl h-auto max-h-40 object-cover transform transition duration-500 hover:scale-105 hover:-translate-y-1"
        src={pic2}
        alt="Vintage clock"
      />
      <img
        className="w-3/4 mx-auto rounded-2xl max-h-28 object-cover transform transition duration-500 hover:scale-105 hover:-translate-y-1"
        src={pic3}
        alt="Vintage gramophone"
      />
    </div>
    <div className="space-y-3">
      <img
        className="w-full rounded-2xl h-auto max-h-40 object-cover transform transition duration-500 hover:scale-105 hover:-translate-y-1"
        src={pic4}
        alt="Vintage lamp"
      />
      <img
        className="w-full rounded-2xl h-auto max-h-64 object-cover transform transition duration-500 hover:scale-105 hover:-translate-y-1"
        src={pic5}
        alt="Vintage auction"
      />
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Banner;


// import { Link } from "react-router-dom"
// import pic1 from "../../../assets/vintage items picture/cars.jpeg"
// import pic2 from "../../../assets/vintage items picture/clock.jpeg"
// import pic3 from "../../../assets/vintage items picture/grammophone.jpeg"
// import pic4 from "../../../assets/vintage items picture/lamp image.jpeg"
// import pic5 from "../../../assets/vintage items picture/vintage auction.jpeg"

// const Banner = () => { 
//   return (
//     <div className="bg-gradient-to-r from-yellow-100 via-lime-100 to-green-200 h-full border-none py-40 px-16 relative overflow-hidden">
      
//       <div className="absolute bottom-0 left-0 w-full h-24">
//         <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
//           <path
//             d="M0,100 C360,0 1080,0 1440,100 L1440,100 L0,100 Z"
//             fill="white"
//           />
//         </svg>
//       </div>
//       <div className="lg:w-[1024px] w-[350px] mx-auto gap-x-5 grid grid-cols-1 lg:grid-cols-2 relative z-10 border-red-600 border-2">
//         <div>
//           <h2 className="text-5xl text-black font-extrabold">
//             Select Your <span className="text-5xl font-extrabold text-green-600">Best Bid Product</span> At Our Auction.
//           </h2>
//           <p className="mt-10 text-black text-lg">
//             Join us as we carve a path to success, driven by passion, powered by innovation, and we're here to turn them into reality.
//           </p>
//           <div className="flex gap-x-5 mt-36">
//             <Link to="/bidInstruction"><button className="btn font-bold px-8 py-6 hover:bg-green-700 hover:text-white">Start A Bid!</button></Link>
//             <Link to="/allAuctions">
//               <button className="btn font-bold px-8 py-6 hover:bg-green-700 hover:text-white">View All Auction</button>
//             </Link>
//           </div>
//         </div>
//         <div className=" md:w-[530px] mt-2">
//           <div className="grid grid-cols-2">
//             <div>
//               <img className="w-[250px] rounded-2xl mb-3 h-[120px]" src={pic1} alt="Vintage car" />
//               <img className="w-[250px] rounded-2xl mb-3 h-[160px]" src={pic2} alt="Vintage clock" />
//               <img className="ml-20 rounded-2xl w-[170px] h-[120px]" src={pic3} alt="Vintage gramophone" />
//             </div>
//             <div>
//               <img className="w-[250px] rounded-2xl mb-3 mt-2 h-[140px]" src={pic4} alt="Vintage lamp" />
//               <img className="w-[250px] rounded-2xl mb-3 h-[270px]" src={pic5} alt="Vintage auction" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;