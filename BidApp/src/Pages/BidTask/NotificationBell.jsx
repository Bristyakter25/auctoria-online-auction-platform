import { IoNotificationsOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import ioClient from "socket.io-client";
import { io } from "socket.io-client";
import UseAxiosPublic from "../../hooks/useAxiosPublic";

const socket = io("http://localhost:5000", {
  transports: ["polling", "websocket"],
  reconnection: true,
});

const NotificationBell = ({ user }) => {
  // console.log("userId is", user);
  const axiosPublic = UseAxiosPublic();
  // const [notifications, setNotifications] = useState([bidNotifications]);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userEmail = user?.email;
  const handleClearNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared!");
  };
  const { data: fetchedNotifications = [] } = useQuery({
    queryKey: ["notifications", userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/notification/${userEmail}`);
      console.log("user data", res.data);
      return res.data;
    },
    enabled: !!userEmail,
  });
  useEffect(() => {
    if (fetchedNotifications.length) {
      setNotifications(fetchedNotifications);
    }
  }, [fetchedNotifications]);

  useEffect(() => {
    if (!userEmail) return;
    const listener = (notification) => {
      console.log(" New notification received via socket:", notification);
      setNotifications((prev) => [notification, ...prev]);
      // toast.info(notification.message);
    };

    socket.on(`notification_${userEmail}`, listener);

    return () => {
      socket.off(`notification_${userEmail}`, listener);
    };
  }, [userEmail]);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-gray-100 rounded-full cursor-pointer transition"
      >
        <IoNotificationsOutline
          size={24}
          className="text-gray-700 hover:text-blue-500 "
        />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-64 bg-slate-200 shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-4 border-b text-black flex justify-between">
            <span className="font-semibold">Notifications</span>
            <button
              onClick={handleClearNotifications}
              className="text-xs text-blue-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          {notifications.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((notif) => (
                <li
                  key={notif._id}
                  className="p-3 border-b text-black hover:bg-gray-400 transition"
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default NotificationBell;
