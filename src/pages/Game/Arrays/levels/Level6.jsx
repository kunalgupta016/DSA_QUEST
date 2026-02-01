import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Level6 = () => {
  // Array: Sorted. [10, 20, 30, 40, 50, 60, 70, 80]
  // Target: 70
  // User must click: Mid (3 -> val 40).
  // Then click "Go Right" (since 40 < 70).
  // Current Range: [50, 60, 70, 80]. Mid (idx 5 -> 60) or (idx 6 -> 70).
  // Let's standard (low+high)/2.

  // Initial: L=0, H=7. Mid=3 (40).
  // 40 < 70. New L=4, H=7.
  // Range [4..7]. Mid = (4+7)/2 = 5 (60).
  // 60 < 70. New L=6, H=7.
  // Range [6..7]. Mid = 6 (70). Found.

  const [array] = useState([10, 20, 30, 40, 50, 60, 70, 80]);
  const [target] = useState(70);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(7);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState(
    "Click the MIDDLE element of the active range.",
  );

  const mid = Math.floor((low + high) / 2);

  const handleBoxClick = (idx) => {
    if (completed) return;

    // Active range check
    if (idx < low || idx > high) {
      setMessage(
        "⚠️ Outside current search space! Focus on the highlighted range.",
      );
      return;
    }

    if (idx === mid) {
      // Correct Mid chosen
      if (array[idx] === target) {
        setCompleted(true);
        setMessage("🎉 TARGET FOUND!");
      } else if (array[idx] < target) {
        setMessage(`Value ${array[idx]} < ${target}. Eliminate Left Half.`);
        setTimeout(() => {
          setLow(mid + 1);
          setMessage("New Range! Click the new MIDDLE.");
        }, 1000);
      } else {
        setMessage(`Value ${array[idx]} > ${target}. Eliminate Right Half.`);
        setTimeout(() => {
          setHigh(mid - 1);
          setMessage("New Range! Click the new MIDDLE.");
        }, 1000);
      }
    } else {
      setMessage(
        `❌ That's not the middle! Mid index is floor((${low}+${high})/2) = ${mid}`,
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
          Level 6: Divider Quest
        </h2>
      </div>

      <h3 className="text-3xl font-bold mb-4 text-center">
        Find Target: <span className="text-yellow-400 text-4xl">{target}</span>
      </h3>
      <p className="text-cyan-300 mb-8 font-mono bg-black/30 p-2 rounded">
        {message}
      </p>

      <div className="flex gap-2 relative">
        {/* Visual Range Indicator */}
        <motion.div
          layout
          className="absolute -top-6 h-1 bg-cyan-500"
          style={{
            left: `calc(${low * 5}rem + ${low * 0.5}rem)`,
            width: `calc(${(high - low + 1) * 5}rem + ${(high - low) * 0.5}rem)`,
          }}
        />

        {array.map((val, i) => (
          <motion.button
            key={i}
            layout
            onClick={() => handleBoxClick(i)}
            disabled={i < low || i > high}
            className={`w-20 h-24 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300
                            ${
                              i >= low && i <= high
                                ? "bg-gray-800 border-cyan-500 text-white cursor-pointer hover:bg-gray-700"
                                : "bg-gray-900 border-gray-800 text-gray-700 cursor-not-allowed"
                            }
                             ${completed && i === mid ? "bg-green-600 border-green-400 scale-110 shadow-xl" : ""}
                        `}
          >
            <span className="text-xl font-bold">{val}</span>
            <span className="text-xs text-gray-500 font-mono mt-2">{i}</span>
          </motion.button>
        ))}
      </div>

      {/* Low/High Labels */}
      <div className="relative w-full max-w-2xl h-8 mt-4">
        <motion.div
          layout
          className="absolute text-cyan-500 font-bold text-xs"
          style={{ left: `calc(${low * 12.5}% + 1.5rem)` }}
        >
          ↑ Low
        </motion.div>
        <motion.div
          layout
          className="absolute text-cyan-500 font-bold text-xs"
          style={{ left: `calc(${high * 12.5}% + 1.5rem)` }}
        >
          ↑ High
        </motion.div>
      </div>

      {completed && (
        <div className="mt-12 text-center">
          <Link
            to="/game/arrays/7"
            className="px-8 py-3 bg-green-600 rounded-full font-bold text-xl hover:bg-green-700 shadow-lg glow"
          >
            Victory! Next Level
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level6;
