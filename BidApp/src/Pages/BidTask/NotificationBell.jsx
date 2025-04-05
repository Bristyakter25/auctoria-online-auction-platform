// import { useState } from "react";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// const notificationsData = [
//   {
//     id: 1,
//     message: "You have been outbid on 'Vintage Watch'!",
//     type: "outbid",
//   },
//   {
//     id: 2,
//     message: "Auction for 'Classic Car' is ending soon!",
//     type: "ending",
//   },
//   { id: 3, message: "New auction: 'Rare Painting' is now live!", type: "new" },
// ];

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState(notificationsData);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClearNotifications = () => {
//     setNotifications([]);
//     // toast.success("All notifications cleared!");
//     toast.success("All notifications cleared!");
//   };

//   return (
//     <div className="relative">
//       {/* Notification Bell */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
//       >
//         <IoNotificationsOutline size={24} />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//             {notifications.length}
//           </span>
//         )}
//       </button>

//       {/* Dropdown Panel */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden"
//         >
//           <div className="p-4 border-b flex justify-between">
//             <span className="font-semibold">Notifications</span>
//             <button
//               onClick={handleClearNotifications}
//               className="text-xs text-blue-500 hover:underline"
//             >
//               Clear All
//             </button>
//           </div>

//           {notifications.length > 0 ? (
//             <ul className="max-h-60 overflow-y-auto">
//               {notifications.map((notif) => (
//                 <li
//                   key={notif.id}
//                   className="p-3 border-b hover:bg-gray-100 transition"
//                 >
//                   {notif.message}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-4 text-center text-gray-500">
//               No new notifications
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;

// import { useEffect, useState } from "react";
// // import { toast } from "react-hot-toast";
// import { toast } from "react-toastify";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const NotificationBell = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // ইউজার রেজিস্টার করবে
//     socket.emit("register", userId);

//     // নতুন প্রোডাক্ট নোটিফিকেশন শুনবে
//     socket.on("new_product", (data) => {
//       toast.success(data.message);
//       setNotifications((prev) => [...prev, data.message]);
//     });

//     // বিড হলে নোটিফিকেশন শুনবে
//     socket.on("new_bid", (data) => {
//       toast.success(data.message);
//       setNotifications((prev) => [...prev, data.message]);
//     });

//     return () => {
//       socket.off("new_product");
//       socket.off("new_bid");
//     };
//   }, [userId]);

//   return (
//     <div>
//       <button>🔔 ({notifications.length})</button>
//       <ul>
//         {notifications.map((note, index) => (
//           <li key={index}>{note}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationBell;
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ioClient from "socket.io-client";
import UseAxiosPublic from "../../hooks/useAxiosPublic";

const socket = ioClient("http://localhost:5000");

const NotificationBell = ({ userId }) => {
  const axiosPublic = UseAxiosPublic();
  const { data: notification = [], refetch } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axiosPublic.get("/");
    },
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    socket.on(`notification_${userId}`, (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    socket.on("notification_all", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off(`notification_${userId}`);
      socket.off("notification_all");
    };
  }, [userId]);

  return (
    <div>
      <button>Notifications ({notifications.length})</button>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBell;
