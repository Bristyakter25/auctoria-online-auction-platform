import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const socket = io("https://auctoria-online-auction-platform.onrender.com");

const ChatBox = ({ sellerEmail, productId }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (user?.email) {
      socket.emit("joinRoom", user.email);
    }

    socket.on("receiveMessage", (msg) => {
      if (msg.productId === productId) {
        setChat((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [productId, user?.email]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      sender: user.email,
      receiver: sellerEmail,
      message,
      productId,
    };
    socket.emit("privateMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-bold mb-2">Private Chat with Seller</h3>
      <div className="h-40 overflow-y-auto border p-2 mb-2 rounded">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-1 ${
              msg.sender === user.email ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-1 rounded-lg ${
                msg.sender === user.email
                  ? "bg-teal-200 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="bg-teal-400 hover:bg-teal-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
