import { useState } from "react";
import { motion } from "framer-motion";

import { Sparkles, Gavel,  Gift, PartyPopper } from "lucide-react";

export default function EidAuctionAnimation() {
  const [bidAmount, setBidAmount] = useState(500);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleBid = () => {
    setBidAmount((prev) => prev + Math.floor(Math.random() * 100) + 50);
    if (bidAmount > 1000) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 p-6">
      {/* Eid Banner */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-yellow-800 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Sparkles className="text-yellow-600" /> Eid Auction Extravaganza! <Sparkles className="text-yellow-600" />
      </motion.h1>

      {/* Auction Stage */}
      <motion.div
        className="bg-white shadow-lg p-6 rounded-xl mt-8 w-full max-w-md text-center relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="text-xl md:text-2xl font-semibold text-yellow-700 flex justify-center items-center gap-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Gavel className="text-yellow-700" /> Current Bid: ${bidAmount}
        </motion.div>

        {/* Bidders Raising Paddles */}
        <motion.div className="flex justify-center gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-md"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
            >
              Bidder {i}
            </motion.div>
          ))}
        </motion.div>

        {/* Bid Button */}
        <button className="btn btn-primary">Place a Bid</button>
      </motion.div>

      {/* Celebration Effect */}
      {showCelebration && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-yellow-200 bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PartyPopper className="text-yellow-700 w-16 h-16" />
          <motion.h2
            className="text-4xl font-bold text-yellow-800 mt-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.5, yoyo: Infinity }}
          >
            🎉 Congratulations! Auction Won! 🎉
          </motion.h2>
        </motion.div>
      )}
    </div>
  );
}
