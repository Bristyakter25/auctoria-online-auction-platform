import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const greetings = [
  "Eid Mubarak! May your life be filled with happiness and peace!",
  "May your Eid be joyful and memorable! Eid Mubarak!",
  "May this Eid bring joy, love, and peace! Eid Mubarak!",
  "May your Eid be filled with happiness, prosperity, and laughter!",
  "Eid Mubarak! May all your dreams come true!",
];

const eidDate = new Date("2025-04-03T08:00:00").getTime();

const EidGreeting = () => {
  const [greeting, setGreeting] = useState(greetings[0]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = eidDate - now;

    if (difference <= 0) {
      return "Eid Mubarak! 🎉";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days} days ${hours} houre ${minutes} minute ${seconds} Seconds left`;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateGreeting = () => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-6 shadow-lg rounded-2xl">
          <div className="text-center text-xl font-semibold text-green-700">
            {greeting}
          </div>
        </div>
      </motion.div>
      <button
        onClick={generateGreeting}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
      >
        View new greetings 🎉
      </button>
      <div className="mt-6 text-lg font-bold text-green-800">
        Eid countdown: {timeLeft}
      </div>
    </div>
  );
};
export default EidGreeting;
