import axios from "axios";

import { useState } from "react";

const AiChat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    setAnswer("");
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      method: "POST",
      data: {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      },
    });
    setAnswer(response.data.candidates[0].content.parts[0].text);
    setLoading(false);
  }

  return (
    <div className="min-h-screen mt-16 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20 relative overflow-hidden group transition-transform duration-300 hover:scale-[1.01]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            🤖 AI Chatbot
          </h1>
          <p className="text-center text-black text-lg mb-6">
            Ask anything related to AI — I'm here to answer intelligently.
          </p>

          <textarea
            className="textarea w-full h-32 p-4 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className="bg-white/20 p-4 rounded-lg min-h-[100px] text-white text-md mb-6 whitespace-pre-line transition-opacity duration-500 ease-in-out">
            {loading ? (
              <span className="animate-pulse flex gap-2 text-lg">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </span>
            ) : (
              answer && <p className="animate-fade-in text-black">{answer}</p>
            )}
          </div>

          <div className="text-center text-black font-bold text-lg">
            {/* <ShinyButton onClick={generateAnswer}>
              🚀 Generate Answer
            </ShinyButton> */}
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              onClick={generateAnswer}
            >
              🚀 Generate Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
