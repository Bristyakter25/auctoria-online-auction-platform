// import { useEffect, useState } from "react";
// import {
//   FaUsers,
//   FaBoxOpen,
//   FaMoneyCheckAlt,
//   FaStar
// } from "react-icons/fa";

// const StatsCards = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     products: 0,
//     payments: 0,
//     reviews: 0,
//     totalAmount: 0,
//   });

//   useEffect(() => {
//     fetch("http://localhost:5000/user-stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const cardData = [
//     {
//       id: 1,
//       icon: <FaUsers size={40} className="text-blue-500" />,
//       title: `${stats.users}+`,
//       desc: "Total Users",
//     },
//     {
//       id: 2,
//       icon: <FaBoxOpen size={40} className="text-purple-500" />,
//       title: `${stats.products}+`,
//       desc: "Total Products",
//     },
//     {
//       id: 3,
//       icon: <FaMoneyCheckAlt size={40} className="text-green-500" />,
//       title: `${stats.payments}+`,
//       desc: "Total Payments",
//     },
//     {
//       id: 4,
//       icon: <FaStar size={40} className="text-yellow-500" />,
//       title: `${stats.reviews}+`,
//       desc: "Total Reviews",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
//       {cardData.map((card) => (
//         <div
//           key={card.id}
//           className="bg-white shadow-lg rounded-lg flex gap-5 items-center justify-start p-6 transition duration-300 border-b-4 border-transparent hover:border-green-500 hover:shadow-2xl"
//         >
//           <div>{card.icon}</div>
//           <div>
//             <h2 className="text-2xl font-bold">{card.title}</h2>
//             <p className="text-gray-500">{card.desc}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow-lg rounded-lg flex gap-5 items-center justify-start p-6 transition duration-300 border-b-4 border-transparent hover:border-green-500 hover:shadow-2xl"
        >
          <div>{card.icon}</div>
          <div>
            <h2 className="text-2xl font-bold">{card.title}+</h2>
            <p className="text-gray-500">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

