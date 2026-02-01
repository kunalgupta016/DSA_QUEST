import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Level1 = () => {
  const [memorySlots, setMemorySlots] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const valuesToStore = [10, 20, 30, 40, 50];
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  const handleDragStart = (val) => {
    setDraggedItem(val);
  };

  const handleDrop = (index) => {
    if (memorySlots[index] !== null) return; // Already occupied

    // Check if it's strictly sequential for "Contiguous" learning?
    // Or just let them fill anywhere? Let's enforce contiguous for Level 1 logic!

    // Find first empty slot
    const firstEmpty = memorySlots.findIndex((val) => val === null);

    if (index === firstEmpty) {
      // Correct placement (Contiguous)
      const newSlots = [...memorySlots];
      newSlots[index] = draggedItem;
      setMemorySlots(newSlots);
      setScore((s) => s + 100);

      if (currentValueIndex < valuesToStore.length - 1) {
        setCurrentValueIndex((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    } else {
      // Wrong placement
      alert(
        "Arrays must store elements contiguously! Fill the first available slot.",
      );
    }
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center relative overflow-hidden">
      {/* HUD */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10 z-10">
        <div className="flex items-center gap-4">
          <Link to="/game/arrays" className="text-gray-400 hover:text-white">
            ← Exit Level
          </Link>
          <h2 className="text-2xl font-bold text-cyan-400">
            Level 1: The Allocation
          </h2>
        </div>
        <div className="text-xl font-mono text-yellow-400">Score: {score}</div>
      </div>

      {/* Game Area */}
      <div className="relative flex-1 w-full max-w-5xl flex flex-col items-center justify-center">
        <h3 className="text-xl mb-8 text-gray-300 text-center max-w-2xl">
          Mission: Allocate memory for an array of size 5. <br />
          <span className="text-cyan-400 text-sm">
            Rule: Elements must be stored contiguously (next to each other).
          </span>
        </h3>

        {/* Memory Block (The Array) */}
        <div className="flex gap-2 p-6 bg-gray-900 rounded-2xl border-2 border-gray-700 shadow-2xl relative">
          {/* Memory Label */}
          <div className="absolute -top-4 left-6 bg-gray-800 px-2 text-xs text-gray-400 border border-gray-700">
            RAM: 0x1000
          </div>

          {memorySlots.map((slot, i) => (
            <div
              key={i}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className={`w-20 h-24 md:w-24 md:h-32 rounded border-2 border-dashed flex items-center justify-center text-3xl font-bold transition-all relative
                                ${
                                  slot !== null
                                    ? "border-green-500 bg-green-900/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                    : "border-gray-600 bg-gray-800/30 text-gray-600 hover:bg-gray-800/50"
                                }
                            `}
            >
              {slot}
              <div className="absolute -bottom-6 text-xs text-gray-500 font-mono">
                idx: {i}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Source */}
        {!completed && (
          <div className="mt-20 flex flex-col items-center">
            <p className="mb-4 text-gray-400 animate-pulse">
              Drag this value into the correct memory slot:
            </p>
            <motion.div
              draggable
              onDragStart={() =>
                handleDragStart(valuesToStore[currentValueIndex])
              }
              whileHover={{ scale: 1.1, cursor: "grab" }}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg z-20"
            >
              {valuesToStore[currentValueIndex]}
            </motion.div>
          </div>
        )}

        {/* Victory Modal */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl border border-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,0.3)] text-center z-50 flex flex-col gap-4"
            >
              <h1 className="text-4xl font-bold text-yellow-400">
                🎉 Array Created!
              </h1>
              <p className="text-gray-300">
                You successfully allocated continuous memory.
              </p>
              <Link
                to="/game/arrays/2"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition shadow-lg mt-4"
              >
                Continue to Level 2 →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Level1;
