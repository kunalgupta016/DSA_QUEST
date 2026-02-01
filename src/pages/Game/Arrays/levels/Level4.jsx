import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level4 = () => {
  // [10, 20, 30, 40, 50, null]
  // Delete Index 1 (Value 20).
  // Becomes [10, null, 30, 40, 50, null]
  // Must shift left: 30->1, 40->2, 50->3.

  const [slots, setSlots] = useState([10, 20, 30, 40, 50, null]);
  const [targetIdx, setTargetIdx] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState(
    "Click on Index 1 to delete the element.",
  );

  const handleClick = (idx) => {
    if (!deleted) {
      if (idx === targetIdx) {
        const newSlots = [...slots];
        newSlots[idx] = null;
        setSlots(newSlots);
        setDeleted(true);
        setMessage("Element deleted! Now shift elements LEFT to fill the gap.");
      } else {
        setMessage("❌ Wrong target! Delete Index 1.");
      }
    } else {
      // Shifting Phase
      // If clicking a filled slot (e.g. 30 at idx 2), and left is empty (idx 1), move it left.
      if (slots[idx] !== null && idx > 0 && slots[idx - 1] === null) {
        const newSlots = [...slots];
        newSlots[idx - 1] = newSlots[idx];
        newSlots[idx] = null;
        setSlots(newSlots);

        // Check completion: Logic is simpler -> if slot[4] (last val) is moved to 3?
        // Just check if we restored contiguous block.
        // Simple check: is slots[0..3] filled and others null?
        // Wait, we had 5 elements originally. Remaining 4.
        // Should be [10, 30, 40, 50, null, null]
      } else {
        // Maybe check success?
      }
    }
  };

  // Check win condition effect
  if (deleted && !completed) {
    // Expected: [10, 30, 40, 50, null, null]
    if (
      slots[0] === 10 &&
      slots[1] === 30 &&
      slots[2] === 40 &&
      slots[3] === 50 &&
      slots[4] === null
    ) {
      setCompleted(true);
      setMessage("Gap filled! Array is contiguous again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 4: Trash Collector
        </h2>
      </div>

      <h3 className="text-2xl mb-8 text-center">{message}</h3>

      <div className="flex gap-2">
        {slots.map((val, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => handleClick(i)}
            whileHover={{ scale: 1.05 }}
            className={`w-24 h-32 border-2 rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-colors
                            ${val === null ? "border-dashed border-gray-600 bg-gray-800/20" : "border-red-500 bg-red-900/30"}
                            ${!deleted && i === targetIdx ? "animate-pulse border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" : ""}
                        `}
          >
            {val && <span className="text-3xl font-bold">{val}</span>}
            {!val && <span className="text-gray-600">NULL</span>}

            <span className="absolute -bottom-8 text-gray-500 font-mono">
              idx:{i}
            </span>

            {!deleted && i === targetIdx && (
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-0 hover:opacity-100 bg-red-900/80 rounded-lg transition">
                🗑️
              </div>
            )}

            {deleted && val !== null && i > 0 && slots[i - 1] === null && (
              <div className="absolute -top-6 text-cyan-400 text-2xl font-bold">
                ←
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {completed && (
        <div className="mt-12 p-6 bg-gray-800 border border-green-500 rounded-xl text-center">
          <h2 className="text-green-400 text-3xl font-bold">
            Deletion Complete!
          </h2>
          <Link
            to="/game/arrays/5"
            className="mt-4 inline-block px-6 py-2 bg-green-600 rounded font-bold hover:bg-green-700 transition"
          >
            Next Level
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level4;
