import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Message = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state) {
      // Optional: Redirect to home or show an error message
      navigate("/", { replace: true });
      return;
    }
  }, [state, navigate]);

  const { senderId, receiverId, productId } = state || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!senderId || !receiverId || !productId) return;

    const fetchMessages = async () => {
      const res = await fetch(
        `https://auctoria-online-auction-platform.onrender.com/messages?senderId=${senderId}&receiverId=${receiverId}&productId=${productId}`
      );
      const data = await res.json();
      setMessages(data?.messages || []);
    };

    fetchMessages();
  }, [senderId, receiverId, productId]);

  const sendMessage = async () => {
    const messageData = {
      senderId,
      receiverId,
      productId,
      message: input,
    };

    const res = await fetch("https://auctoria-online-auction-platform.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (res.ok) {
      setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="flex mt-14 lg:h-[700px] h-[400px]">
      <div className="w-1/4 bg-gray-100 dark:bg-gray-800 dark:text-white p-4">
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
      </div>

      <div className="flex flex-col flex-1 dark:bg-gray-900 dark:text-white bg-white p-4">
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-xl max-w-xs ${
                  msg.senderId === senderId
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 dark:bg-gray-800 dark:text-white flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 dark:bg-gray-800 dark:text-white border border-gray-300 rounded p-2"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
