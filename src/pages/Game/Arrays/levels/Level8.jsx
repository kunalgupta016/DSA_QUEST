import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Level8 = () => {
  // Array: [2, 7, 11, 15]
  // Target: 9
  // Select 2 and 7.

  const [array] = useState([2, 5, 8, 12, 15, 7]);
  const [target] = useState(17); // 12 + 5 = 17
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("Select 2 numbers that sum to 17.");

  const handleClick = (idx) => {
    if (completed) return;

    if (selectedIndices.includes(idx)) {
      // Deselect
      setSelectedIndices((prev) => prev.filter((i) => i !== idx));
    } else {
      // Select (Max 2)
      if (selectedIndices.length < 2) {
        const newSelection = [...selectedIndices, idx];
        setSelectedIndices(newSelection);

        if (newSelection.length === 2) {
          checkSum(newSelection);
        }
      }
    }
  };

  const checkSum = (indices) => {
    const sum = array[indices[0]] + array[indices[1]];
    if (sum === target) {
      setCompleted(true);
      setMessage("🎉 Correct! 12 + 5 = 17");
    } else {
      setMessage(`❌ Sum is ${sum}. Try again.`);
      setTimeout(() => {
        setSelectedIndices([]); // Reset on fail
        setMessage("Select 2 numbers that sum to 17.");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 8: Twin Pairs
        </h2>
      </div>

      <h3 className="text-3xl font-bold mb-8 text-center px-4 py-2 bg-gray-800 rounded-lg border border-yellow-500">
        Target Sum: <span className="text-yellow-400">{target}</span>
      </h3>
      <p className="text-gray-300 mb-8 font-mono">{message}</p>

      <div className="flex gap-4">
        {array.map((val, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            whileHover={{ scale: 1.1 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-4 transition-all
                            ${
                              selectedIndices.includes(i)
                                ? "bg-yellow-600 border-yellow-300 scale-110 shadow-lg"
                                : "bg-gray-800 border-gray-600 hover:border-gray-400"
                            }
                             ${completed && selectedIndices.includes(i) ? "bg-green-600 border-green-300" : ""}
                        `}
          >
            {val}
          </motion.button>
        ))}
      </div>

      {completed && (
        <div className="mt-12 text-center">
          <Link
            to="/game/arrays/9"
            className="px-8 py-3 bg-green-600 rounded-full font-bold text-xl hover:bg-green-700 shadow-lg glow"
          >
            Victory! Next Level
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level8;
