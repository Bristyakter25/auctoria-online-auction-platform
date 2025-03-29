import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-04-21T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center mx-2">
        <div className="text-4xl font-bold">
          {timeLeft[interval]}
        </div>
        <div className="text-sm uppercase">{interval}</div>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 text-center"> Countdown</h1>
        <div className="flex justify-center">
          {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
