// import { useEffect, useState, useCallback } from 'react';

// const EidCountdown = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   // Memoize the calculation function
//   const calculateTimeLeft = useCallback(() => {
//     const eidDate = new Date('2024-04-10'); // UPDATE THIS DATE
//     const now = new Date();
//     const difference = eidDate.getTime() - now.getTime();

//     if (difference > 0) {
//       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
//       return { days, hours, minutes, seconds };
//     }

//     return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//   }, []);

//   useEffect(() => {
//     // Initial calculation
//     setTimeLeft(calculateTimeLeft());
    
//     // Update every second
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [calculateTimeLeft]); // Add calculateTimeLeft to dependencies

//   // Rest of the component remains the same...
//   const timeItems = [
//     { value: timeLeft.days, label: 'Days' },
//     { value: timeLeft.hours, label: 'Hours' },
//     { value: timeLeft.minutes, label: 'Minutes' },
//     { value: timeLeft.seconds, label: 'Seconds' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full text-center space-y-6">
//         <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 animate-pulse">
//           🎇 Eid Mubarak Countdown! 🎇
//         </h1>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {timeItems.map((item, index) => (
//             <div key={index} className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
//               <div className="text-3xl md:text-4xl font-bold text-green-700">
//                 {item.value.toString().padStart(2, '0')}
//               </div>
//               <div className="text-sm md:text-base text-green-600 mt-1">
//                 {item.label}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ... rest of the JSX remains unchanged */}
//       </div>
//     </div>
//   );
// };

// export default EidCountdown;

import React from 'react';
import CountdownTimer from './CountdownTimer';

const EidCountdown = () => {
    return (
        <div>
    <CountdownTimer></CountdownTimer>
        </div>
    );
};

export default EidCountdown;