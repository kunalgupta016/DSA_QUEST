import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level7 = () => {
  // Goal: Rotate array Right by K=3 steps.
  // [1, 2, 3, 4, 5] -> K=1 -> [5, 1, 2, 3, 4]
  // K=3 -> [3, 4, 5, 1, 2]

  // Interaction: Button "Rotate Once".
  // Visual: Last element pops out and moves to front.

  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const [targetArray] = useState([3, 4, 5, 1, 2]);
  const [completed, setCompleted] = useState(false);
  const [rotations, setRotations] = useState(0);

  const rotateRight = () => {
    if (completed) return;

    // Visual Rotation logic
    const newArr = [...array];
    const last = newArr.pop();
    newArr.unshift(last);
    setArray(newArr);

    const nextRot = rotations + 1;
    setRotations(nextRot);

    // Check Match
    if (JSON.stringify(newArr) === JSON.stringify(targetArray)) {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 7: The Rotator
        </h2>
      </div>

      <div className="flex gap-12 items-center mb-12">
        <div className="text-center">
          <h3 className="mb-4 text-gray-400">Target (Right Rotate x3)</h3>
          <div className="flex gap-2">
            {targetArray.map((val, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-gray-800 border border-gray-600 flex items-center justify-center rounded text-gray-400"
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-xl mb-6">Current State (Rotations: {rotations})</h3>

      <div className="flex gap-2 mb-12">
        <AnimatePresence mode="popLayout">
          {array.map((val) => (
            <motion.div
              key={val} // Key is val to track element movement
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-20 h-24 rounded-xl flex items-center justify-center text-3xl font-bold border-2 shadow-lg
                                ${completed ? "bg-green-600 border-green-400" : "bg-blue-600 border-blue-400"}
                            `}
            >
              {val}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!completed ? (
        <button
          onClick={rotateRight}
          className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-xl shadow-lg border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 transition p-8"
        >
          🔄 Rotate Right
        </button>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-4">Matched!</h2>
          <Link
            to="/game/arrays/8"
            className="px-8 py-3 bg-green-600 rounded-full font-bold text-xl hover:bg-green-700 shadow-lg glow"
          >
            Victory! Next Level
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level7;
