import { useState } from "react";
// import { Button } from "@";
// import { Button} from ""
// import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const greetings = [
  "Eid Mubarak! May your day be filled with joy and blessings! 🌙✨",
  "Wishing you and your family a blessed Eid filled with love and happiness! 💖",
  "Eid Mubarak! May this special day bring peace and prosperity to your life! 🕌",
  "Celebrate with smiles, laughter, and lots of sweets! Eid Mubarak! 🎉",
  "May your sacrifices be appreciated, and your prayers be answered. Eid Mubarak! 🤲",
  "Eid Mubarak! Let’s spread kindness, love, and joy to everyone around us! 💕"
];

const EidGreetingGenerator = () => {
  const [greeting, setGreeting] = useState("Click the button to generate a special Eid greeting!");

  const generateGreeting = () => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shadow-lg bg-white rounded-2xl p-6">
          <div>
            <motion.p
              key={greeting}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-semibold text-gray-700"
            >
              {greeting}
            </motion.p>
            <button onClick={generateGreeting} className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
              <Sparkles size={20} /> Generate Greeting
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EidGreetingGenerator;
