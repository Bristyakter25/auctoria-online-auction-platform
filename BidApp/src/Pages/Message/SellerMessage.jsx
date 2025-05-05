import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SellerMessage = () => {
  const { sellerId } = useParams();  // Use React Router's useParams to get the sellerId from the URL
  const decodedEmail = decodeURIComponent(sellerId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isReplying, setIsReplying] = useState(null); // State to manage reply interface toggle

  useEffect(() => {
    // Fetch messages where receiverId === decodedEmail
    fetch(`https://auctoria-online-auction-platform.onrender.com/messages?receiverId=${decodedEmail}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, [decodedEmail]);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageData = {
      senderId: sellerId,  // Use sellerId as senderId for the message
      message: input.trim(),
    };

    try {
      const res = await fetch("https://auctoria-online-auction-platform.onrender.com/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      if (res.ok) {
        setMessages((prev) => [...prev, messageData]);
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        {/* Sidebar content */}
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 bg-white p-4">
        {/* Messages Table */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-200">Sender</th>
                <th className="border p-2 bg-gray-200">Message</th>
                <th className="border p-2 bg-gray-200">Timestamp</th>
             
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index} className="border-b">
                  <td className="border p-2">{message.senderId}</td>
                  <td className="border p-2">{message.message}</td>
                  <td className="border p-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </td>
                  {/* <td className="border p-2">
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      onClick={() => setIsReplying(index)}
                    >
                      Reply
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* If Replying, show reply interface */}
        {/* {isReplying !== null && (
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded p-2"
              placeholder="Type your reply..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Send Reply
            </button>
            <button
              onClick={() => setIsReplying(null)}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SellerMessage;
