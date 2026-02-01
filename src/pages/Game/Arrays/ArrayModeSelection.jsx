import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ArrayModeSelection = () => {
  return (
    <div className="min-h-screen bg-[#0b0c15] text-white flex flex-col items-center justify-center relative pt-24 pb-12 overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Kingdom of Arrays
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Choose your path, Traveler. How do you wish to conquer memory?
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 px-4">
        {/* Visual Mode Card */}
        <Link to="/game/arrays/visual">
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="w-80 h-96 bg-gray-900/50 backdrop-blur border border-gray-700 rounded-3xl p-8 flex flex-col items-center text-center group hover:border-cyan-500 hover:bg-gray-800 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
              🎮
            </div>
            <h2 className="text-3xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300">
              Visual Quest
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Interactive games and puzzles. Drag, drop, and click to understand
              the core concepts without writing code.
            </p>
            <span className="mt-auto px-6 py-2 bg-gray-700 rounded-full text-sm font-bold group-hover:bg-cyan-600 transition-colors">
              Play Games
            </span>
          </motion.div>
        </Link>

        {/* OR Divider */}
        <div className="flex items-center justify-center">
          <div className="w-1 md:w-[1px] h-12 md:h-32 bg-gray-700"></div>
        </div>

        {/* Code Mode Card */}
        <Link to="/game/arrays/code">
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="w-80 h-96 bg-gray-900/50 backdrop-blur border border-gray-700 rounded-3xl p-8 flex flex-col items-center text-center group hover:border-yellow-500 hover:bg-gray-800 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform">
              👨‍💻
            </div>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400 group-hover:text-yellow-300">
              Code Quest
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The true developer's path. Solve the same challenges by writing
              real syntax. Live visualization included.
            </p>
            <span className="mt-auto px-6 py-2 bg-gray-700 rounded-full text-sm font-bold group-hover:bg-yellow-600 transition-colors">
              Write Code
            </span>
          </motion.div>
        </Link>
      </div>

      <div className="absolute bottom-10 text-gray-500 text-sm">
        Select a mode to view the Level Map
      </div>
    </div>
  );
};

export default ArrayModeSelection;
