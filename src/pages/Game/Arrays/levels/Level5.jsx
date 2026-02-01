import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Level5 = () => {
  // Linear Search mechanics:
  // Elements are hidden (Box with '?').
  // User must click indices 0 -> 1 -> 2 -> ... in order to "scan"
  // Finding key at index 4 for example.

  // Mechanics:
  // Array: [12, 45, 67, 23, 89, 34]
  // Key: 23
  // User must click boxes. If they click out of order (random access), warn them "Linear Search scans sequentially!".
  // They must reveal 0, then 1, then 2, then 3 (Found).

  const [array] = useState([12, 45, 67, 23, 89, 34]);
  const [key] = useState(23);
  const [currentIndex, setCurrentIndex] = useState(0); // The index pointer is currently at
  const [revealed, setRevealed] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("Start scanning from Index 0");

  const handleBoxClick = (idx) => {
    if (completed) return;

    if (idx === currentIndex) {
      // Correct sequential scan
      const newRevealed = [...revealed];
      newRevealed[idx] = true;
      setRevealed(newRevealed);

      if (array[idx] === key) {
        setCompleted(true);
        setMessage(`🎉 Found ${key} at Index ${idx}!`);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setMessage(`Not ${key}... Check next index.`);
      }
    } else {
      setMessage(
        "⚠️ Linear Search Rule: You must check elements one by one from the start!",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 5: Linear Hunt
        </h2>
      </div>

      <h3 className="text-3xl font-bold mb-8 text-center">
        Find Key: <span className="text-yellow-400 text-4xl">{key}</span>
      </h3>
      <p className="text-cyan-300 mb-8 font-mono">{message}</p>

      <div className="flex gap-4">
        {array.map((val, i) => (
          <motion.div
            key={i}
            onClick={() => handleBoxClick(i)}
            whileHover={
              !revealed[i] && i === currentIndex
                ? { scale: 1.1, cursor: "pointer" }
                : {}
            }
            className={`w-24 h-32 rounded-xl flex flex-col items-center justify-center border-2 relative transition-all duration-300
                            ${
                              revealed[i]
                                ? val === key
                                  ? "bg-green-600 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]"
                                  : "bg-gray-800 border-gray-600 opacity-50"
                                : i === currentIndex
                                  ? "bg-gray-700 border-yellow-500 animate-pulse"
                                  : "bg-gray-900 border-gray-700"
                            }
                        `}
          >
            <div className="text-3xl font-bold">{revealed[i] ? val : "?"}</div>
            <div className="absolute -bottom-8 text-gray-500 font-mono">
              idx:{i}
            </div>

            {i === currentIndex && !revealed[i] && (
              <div className="absolute -top-10 text-yellow-400 text-2xl font-bold">
                ↓
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {completed && (
        <div className="mt-12 mx-auto text-center">
          <Link
            to="/game/arrays/6"
            className="px-8 py-3 bg-green-600 rounded-full font-bold text-xl hover:bg-green-700 shadow-lg glow"
          >
            Victory! Next Level
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level5;
