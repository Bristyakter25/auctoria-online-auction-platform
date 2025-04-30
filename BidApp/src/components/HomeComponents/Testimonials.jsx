// import React from "react";

// const Testimonials = () => {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
//     style={{
//         backgroundImage: "url(https://www.bidout-wp.egenslab.com/wp-content/themes/bidout/assets/images/bg/client-bg.png)",
//       }}>
    

//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">What Client Say</h2>
//       <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
//         Before on the world's best & largest Bidding marketplace with our beautiful Bidding products. 
//         We want to live a part of your smile, success and future growth.
//       </p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {/* Testimonial 1 */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <p className="text-gray-600 italic mb-4">
//             The Pacific Grove Chamber of Commerce would like to thank KLAD Communications and 
//             Mr. Will Elstad for all the efforts that assisted me strictly manners.
//           </p>
//           <div className="text-right">
//             <p className="font-semibold text-gray-800">Johan Marlin</p>
//             <p className="text-sm text-gray-500">CEO</p>
//           </div>
//         </div>
        
//         {/* Testimonial 2 */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <p className="text-gray-600 italic mb-4">
//             Mullum comes tempore in: Mullum nec nud du metus consequat congue ac at est. 
//             Pellentesque blandit requet at elit intre qus tincidunt.
//           </p>
//           <div className="text-right">
//             <p className="font-semibold text-gray-800">Janite anteroan</p>
//             <p className="text-sm text-gray-500">Manager</p>
//           </div>
//         </div>
        
//         {/* Testimonial 3 */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//           <p className="text-gray-600 italic mb-4">
//             Maeresses vies gonfiori requis, ac ponfiori rume. Duis venenatis lacinia libero. 
//             Nam nec augue ut enunc. vulputate tincidunt at suscipit frunt.
//           </p>
//           <div className="text-right">
//             <p className="font-semibold text-gray-800">Alin Peter</p>
//             <p className="text-sm text-gray-500">Alin Manager</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url(https://www.bidout-wp.egenslab.com/wp-content/themes/bidout/assets/images/bg/client-bg.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-3xl font-bold text-center  mb-6">What Client Say</h2>
      <p className="text-center  max-w-3xl mx-auto mb-12">
        Before on the world's best & largest Bidding marketplace with our beautiful Bidding products. 
        We want to live a part of your smile, success and future growth.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {/* Testimonial 1 */}
        <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi3.png"
              alt="Johan Martin"
            />
            <p className="text-gray-600 italic mb-4">
              The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted me nicely manners.
            </p>
            <h4 className="font-semibold text-gray-800">Johan Martin</h4>
            <span className="text-sm text-gray-500">CEO</span>
          </div>
        </SwiperSlide>

        {/* Testimonial 2 */}
        <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi1.png"
              alt="Jamie Anderson"
            />
            <p className="text-gray-600 italic mb-4">
              Nullam cursus tempor ex. Nullam nec dui id metus consequat congue ac at est. Pellentesque blandit neque at elit tristique tincidunt.
            </p>
            <h4 className="font-semibold text-gray-800">Jamie Anderson</h4>
            <span className="text-sm text-gray-500">Manager</span>
          </div>
        </SwiperSlide>

        {/* Testimonial 3 */}
        <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi2.png"
              alt="John Peter"
            />
            <p className="text-gray-600 italic mb-4">
              Maecenas vitae porttitor neque, ac porttitor nunc. Duis venenatis lacinia libero. Nam nec augue ut nunc vulputate tincidunt at suscipit nunc.
            </p>
            <h4 className="font-semibold text-gray-800">John Peter</h4>
            <span className="text-sm text-gray-500">Area Manager</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi3.png"
              alt="Johan Martin"
            />
            <p className="text-gray-600 italic mb-4">
              The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted me nicely manners.
            </p>
            <h4 className="font-semibold text-gray-800">Johan Martin</h4>
            <span className="text-sm text-gray-500">CEO</span>
          </div>
        </SwiperSlide>
        {/* Testimonial 2 */}
        <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi1.png"
              alt="Jamie Anderson"
            />
            <p className="text-gray-600 italic mb-4">
              Nullam cursus tempor ex. Nullam nec dui id metus consequat congue ac at est. Pellentesque blandit neque at elit tristique tincidunt.
            </p>
            <h4 className="font-semibold text-gray-800">Jamie Anderson</h4>
            <span className="text-sm text-gray-500">Manager</span>
          </div>
        </SwiperSlide>
           {/* Testimonial 3 */}
           <SwiperSlide>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              className="rounded-full w-20 h-20 mb-4"
              src="https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi2.png"
              alt="John Peter"
            />
            <p className="text-gray-600 italic mb-4">
              Maecenas vitae porttitor neque, ac porttitor nunc. Duis venenatis lacinia libero. Nam nec augue ut nunc vulputate tincidunt at suscipit nunc.
            </p>
            <h4 className="font-semibold text-gray-800">John Peter</h4>
            <span className="text-sm text-gray-500">Area Manager</span>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Testimonials;

