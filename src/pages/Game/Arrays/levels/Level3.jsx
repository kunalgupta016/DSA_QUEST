import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level3 = () => {
  // Array size 6. 4 filled, 2 empty at end.
  // Insert 99 at index 1.
  // [10, 20, 30, 40, null, null] -> want [10, 99, 20, 30, 40, null]
  // Steps: Shift 40->4, 30->3, 20->2, Place 99->1

  const [slots, setSlots] = useState([10, 20, 30, 40, null, null]);
  const [mission, setMission] = useState({ val: 99, idx: 1 });
  const [message, setMessage] = useState(
    "Shift elements to right to make space at Index 1!",
  );
  const [completed, setCompleted] = useState(false);

  const handleSlotClick = (idx) => {
    if (completed) return;

    // Logic for Shifting:
    // If clicking a filled slot, check if right slot is empty. If so, move it.
    if (slots[idx] !== null && slots[idx + 1] === null) {
      const newSlots = [...slots];
      newSlots[idx + 1] = newSlots[idx];
      newSlots[idx] = null;
      setSlots(newSlots);
      setMessage("Moved! Keep shifting.");
    }
    // Logic for Placing Target:
    // If clicking empty slot matching target index, and we have space?
    else if (slots[idx] === null && idx === mission.idx) {
      // Check if it's safe (is index 1 actually free?)
      // Yes it is.
      const newSlots = [...slots];
      newSlots[idx] = mission.val;
      setSlots(newSlots);
      setCompleted(true);
      setMessage("Inserted Successfully!");
    } else {
      setMessage("⚠️ Can't move that! Use the empty space to the right.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 3: The Sliding Wall
        </h2>
      </div>

      <h3 className="text-2xl mb-2 text-center">
        Mission: Insert{" "}
        <span className="text-yellow-400 font-bold">{mission.val}</span> at{" "}
        <span className="text-red-400 font-bold">Index {mission.idx}</span>
      </h3>
      <p className="text-gray-400 mb-12 text-center">{message}</p>

      <div className="flex gap-2">
        {slots.map((val, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => handleSlotClick(i)}
            className={`w-24 h-32 border-2 rounded-xl flex flex-col items-center justify-center relative cursor-pointer
                            ${val === null ? "border-dashed border-gray-600 bg-gray-800/20" : "border-blue-500 bg-blue-900/30 shadow-lg"}
                            ${i === mission.idx && val === null ? "border-yellow-500 bg-yellow-900/10" : ""}
                        `}
          >
            <span className="text-3xl font-bold">{val}</span>
            <span className="absolute -bottom-8 text-gray-500 font-mono">
              idx:{i}
            </span>

            {/* Highlight Target Index */}
            {i === mission.idx && !completed && (
              <div className="absolute -top-10 text-yellow-500 font-bold text-xs animate-bounce">
                TARGET
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <h2 className="text-green-400 text-3xl font-bold mb-4">
              Shift & Insert Logic Mastered!
            </h2>
            <p className="text-gray-400">
              O(N) operation complexity due to shifting.
            </p>
            <Link
              to="/game/arrays/4"
              className="mt-4 inline-block px-6 py-2 bg-green-600 rounded font-bold hover:bg-green-700 transition"
            >
              Continue
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level3;
