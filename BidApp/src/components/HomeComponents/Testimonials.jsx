import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url(https://www.bidout-wp.egenslab.com/wp-content/themes/bidout/assets/images/bg/client-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl font-bold text-center dark:text-[#4D55CC] text-gray-700 mb-6">
        What Client Say
      </h2>
      <p className="text-center  max-w-3xl mx-auto mb-12 dark:text-white  text-gray-700">
        Before on the world's best & largest Bidding marketplace with our
        beautiful Bidding products. We want to live a part of your smile,
        success and future growth.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {[
          {
            name: "Johan Martin",
            role: "CEO",
            image:
              "https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi3.png",
            text: "The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted me nicely manners.",
          },
          {
            name: "Jamie Anderson",
            role: "Manager",
            image:
              "https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi1.png",
            text: "Nullam cursus tempor ex. Nullam nec dui id metus consequat congue ac at est. Pellentesque blandit neque at elit tristique tincidunt.",
          },
          {
            name: "John Peter",
            role: "Area Manager",
            image:
              "https://www.bidout-wp.egenslab.com/wp-content/uploads/2022/10/testi2.png",
            text: "Maecenas vitae porttitor neque, ac porttitor nunc. Duis venenatis lacinia libero. Nam nec augue ut nunc vulputate tincidunt at suscipit nunc.",
          },
        ]
          .flatMap((item) => [item, item])
          .map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white h-[400px] dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <img
                  className="rounded-full w-20 h-20 mb-4"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <p className="text-gray-600 h-[150px] dark:text-gray-300 italic mb-4">
                  {testimonial.text}
                </p>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {testimonial.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </span>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
