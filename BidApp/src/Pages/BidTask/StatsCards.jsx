

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaStar,
} from "react-icons/fa";

const StatsCards = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    payments: 0,
    reviews: 0,
  });

  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    products: 0,
    payments: 0,
    reviews: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/user-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const animateCount = (key, targetValue) => {
      let current = 0;
      const increment = Math.ceil(targetValue / 50); // speed control
      const interval = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(interval);
        }
        setAnimatedStats((prev) => ({ ...prev, [key]: current }));
      }, 20); // delay between updates
    };

    animateCount("users", stats.users);
    animateCount("products", stats.products);
    animateCount("payments", stats.payments);
    animateCount("reviews", stats.reviews);
  }, [stats]);

  const cardData = [
    {
      id: 1,
      icon: <FaUsers size={40} className="text-blue-500" />,
      title: animatedStats.users,
      desc: "Total Users",
    },
    {
      id: 2,
      icon: <FaBoxOpen size={40} className="text-purple-500" />,
      title: animatedStats.products,
      desc: "Total Products",
    },
    {
      id: 3,
      icon: <FaMoneyCheckAlt size={40} className="text-green-500" />,
      title: animatedStats.payments,
      desc: "Total Payments",
    },
    {
      id: 4,
      icon: <FaStar size={40} className="text-yellow-500" />,
      title: animatedStats.reviews,
      desc: "Total Reviews",
    },
  ];

  return (
    <div className="grid lg:w-[1204px] w-[350px] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-[#0C0950] shadow-lg rounded-lg flex gap-5 items-center justify-start p-6 transition-all duration-1000 hover:scale-105 hover:shadow-[0_10px_20px_rgba(59,130,246,0.5)] dark:text-white  "
        >
          <div>{card.icon}</div>
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{card.title}+</h2>
            <p className="text-gray-500 dark:text-white">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

