import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level2 = () => {
  const [array, setArray] = useState([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateRound();
  }, [round]);

  const generateRound = () => {
    const newArr = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 99) + 1,
    );
    setArray(newArr);
    setTargetIndex(Math.floor(Math.random() * 6));
    setMessage("");
  };

  const handleBoxClick = (index) => {
    if (index === targetIndex) {
      setScore((s) => s + 100);
      setMessage("✅ Hit!");
      setTimeout(() => {
        if (round < 5) {
          setRound((r) => r + 1);
        } else {
          setCompleted(true);
        }
      }, 800);
    } else {
      setScore((s) => Math.max(0, s - 50));
      setMessage("❌ Miss! Check the index.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 2: Index Sniper
        </h2>
        <div className="text-xl font-mono text-yellow-400">Score: {score}</div>
      </div>

      {!completed ? (
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">
            Mission: Shoot{" "}
            <span className="text-yellow-400">arr[{targetIndex}]</span>
          </h3>

          <div className="flex gap-4 justify-center flex-wrap">
            {array.map((val, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBoxClick(idx)}
                className="w-24 h-24 bg-gray-900 border-2 border-cyan-500 rounded-xl flex flex-col items-center justify-center relative group"
              >
                <span className="text-3xl font-bold text-white">{val}</span>
                <span className="absolute -bottom-8 text-gray-500 font-mono text-sm">
                  index: {idx}
                </span>

                {/* Crosshair on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-[1px] bg-red-500/50 absolute" />
                  <div className="h-full w-[1px] bg-red-500/50 absolute" />
                </div>
              </motion.button>
            ))}
          </div>

          <div className="h-12 mt-12 text-2xl font-bold animate-pulse">
            {message}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl border border-green-500 text-center"
        >
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Mission Complete!
          </h1>
          <p className="text-gray-300 mb-6">You verified O(1) Access Time.</p>
          <Link
            to="/game/arrays/3"
            className="px-6 py-3 bg-cyan-600 rounded-lg font-bold hover:bg-cyan-700"
          >
            Next Level →
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Level2;
