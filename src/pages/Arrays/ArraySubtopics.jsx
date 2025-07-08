import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const arraySubtopics = [
  { name: "Basics", path: "/arrays/basics", color: "bg-red-500" },
  { name: "Searching", path: "/arrays/searching", color: "bg-blue-500" },
  { name: "Sorting", path: "/sortinglist", color: "bg-green-500" },
  { name: "Array Operations", path: "/arrays/operations", color: "bg-purple-500" },
  { name: "Math / Logical Problems", path: "/arrays/logical", color: "bg-pink-500" },
  { name: "Advanced Searching", path: "/arrays/advanced-search", color: "bg-yellow-500" },
  { name: "Pattern Problems", path: "/arrays/patterns", color: "bg-indigo-500" },
  { name: "Sliding Window", path: "/arrays/sliding-window", color: "bg-teal-500" },
  { name: "2D Arrays", path: "/arrays/2d-arrays", color: "bg-orange-500" },
  { name: "Miscellaneous", path: "/arrays/misc", color: "bg-emerald-500" },
];


const ArraySubtopics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10 mt-10">
        📂 Array Subtopics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {arraySubtopics.map((topic, index) => (
          <Link key={index} to={topic.path}>
            <motion.div
              key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-8 rounded-xl shadow-lg ${topic.color} text-center font-bold text-xl hover:shadow-2xl transition`}
            >
              <h3 className="text-xl font-semibold  text-center">
                {topic.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArraySubtopics;
