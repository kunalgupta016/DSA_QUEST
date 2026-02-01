import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ArrayGameMap = () => {
  // In a real app, we'd fetch unlocked status from LocalStorage/Backend
  // For now, let's unlock the first 3 for testing
  const [progress, setProgress] = useState(10); // Unlocking all for user testing

  const levels = [
    { id: 1, title: "The Allocation", x: 10, y: 80, path: "/game/arrays/1" },
    { id: 2, title: "Index Sniper", x: 25, y: 60, path: "/game/arrays/2" },
    { id: 3, title: "Sliding Wall", x: 50, y: 70, path: "/game/arrays/3" },
    { id: 4, title: "Trash Collector", x: 70, y: 50, path: "/game/arrays/4" },
    { id: 5, title: "Linear Hunt", x: 80, y: 20, path: "/game/arrays/5" },
    { id: 6, title: "Divider Quest", x: 60, y: 10, path: "/game/arrays/6" },
    { id: 7, title: "The Rotator", x: 40, y: 15, path: "/game/arrays/7" },
    { id: 8, title: "Twin Pairs", x: 20, y: 25, path: "/game/arrays/8" },
    { id: 9, title: "The Leader", x: 10, y: 40, path: "/game/arrays/9" },
    {
      id: 10,
      title: "Boss: Kadane",
      x: 50,
      y: 50,
      path: "/game/arrays/10",
      isBoss: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c15] text-white pt-20 overflow-hidden relative">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0b0c15] to-[#0b0c15]" />
        {/* Connecting Lines (SVG) */}
        <svg className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30">
          <path
            d="M 10% 80% Q 25% 60% 50% 70% T 70% 50% T 80% 20% T 60% 10% T 40% 15% T 20% 25% T 10% 40% T 50% 50%"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeDasharray="10 10"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto h-[80vh] w-full mt-10 p-4 border border-gray-800 bg-black/40 rounded-3xl backdrop-blur-sm shadow-2xl relative">
        <h1 className="absolute top-6 left-6 text-3xl font-bold text-cyan-400 drop-shadow-lg">
          🏰 Kingdom of Arrays
        </h1>

        <Link
          to="/game"
          className="absolute top-6 right-6 px-4 py-2 bg-gray-700/50 hover:bg-gray-600 rounded-lg backdrop-blur-md transition"
        >
          ← World Map
        </Link>

        {/* Level Nodes */}
        {levels.map((level, i) => {
          const isUnlocked = level.id <= progress + 2; // Temporary unlock logic logic
          const isCompleted = level.id < progress;

          return (
            <Link
              key={level.id}
              to={isUnlocked ? level.path : "#"}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${level.x}%`, top: `${level.y}%` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Pulse Effect for Current Level */}
                {level.id === progress && (
                  <div className="absolute w-16 h-16 bg-cyan-500/50 rounded-full animate-ping" />
                )}

                <motion.div
                  whileHover={isUnlocked ? { scale: 1.2 } : {}}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300
                                        ${
                                          isUnlocked
                                            ? level.isBoss
                                              ? "bg-red-900 border-red-500 shadow-red-500/50"
                                              : "bg-gray-900 border-cyan-500 shadow-cyan-500/50"
                                            : "bg-gray-800 border-gray-600 grayscale opacity-50"
                                        }
                                    `}
                >
                  <span
                    className={`font-bold text-lg md:text-xl ${level.isBoss ? "text-red-400" : "text-cyan-300"}`}
                  >
                    {level.id}
                  </span>
                </motion.div>

                {/* Label */}
                <div
                  className={`mt-2 px-3 py-1 rounded bg-black/80 border border-gray-700 text-xs md:text-sm font-bold whitespace-nowrap transition-opacity
                                    ${isUnlocked ? "text-gray-200" : "text-gray-600"}
                                    opacity-0 group-hover:opacity-100
                                `}
                >
                  {level.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ArrayGameMap;
