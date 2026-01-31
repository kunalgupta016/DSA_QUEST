import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    path: "/sorting/bubble",
    icon: "🫧",
    color: "bg-red-500",
  },
  {
    name: "Selection Sort",
    path: "/sorting/selection",
    icon: "🧲",
    color: "bg-blue-500",
  },
  {
    name: "Insertion Sort",
    path: "/sorting/insertion",
    icon: "📥",
    color: "bg-green-500",
  },
  {
    name: "Merge Sort",
    path: "/sorting/merge",
    icon: "🔀",
    color: "bg-purple-500",
  },
  {
    name: "Quick Sort",
    path: "/sorting/quick",
    icon: "⚡",
    color: "bg-pink-500",
  },
  {
    name: "Heap Sort",
    path: "/sorting/heap",
    icon: "🏔️",
    color: "bg-yellow-500",
  },
  {
    name: "Counting Sort",
    path: "/sorting/counting",
    icon: "🔢",
    color: "bg-indigo-500",
  },
  {
    name: "Radix Sort",
    path: "/sorting/radix",
    icon: "🧮",
    color: "bg-teal-500",
  },
];

const SortingList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <h1 className="text-center text-4xl font-bold text-yellow-400 mb-10 mt-10">
        📂 Sorting Algorithms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {sortingAlgorithms.map((algo, index) => (
          <Link key={index} to={algo.path}>
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-xl shadow-lg ${algo.color} text-center font-bold text-xl hover:shadow-2xl transition cursor-pointer`}
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">{algo.icon}</span> {algo.name}
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Visualize & understand how it works
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SortingList;
