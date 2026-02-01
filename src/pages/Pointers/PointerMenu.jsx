import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const pointerSubtopics = [
  { name: "Basics", path: "/pointers/basics", color: "bg-cyan-500" },
  { name: "Double Pointers", path: "/pointers/double", color: "bg-orange-500" },
  {
    name: "Functions & Pointers",
    path: "/pointers/functions",
    color: "bg-purple-500",
  },
  {
    name: "Practice Arena",
    path: "/pointers/practice",
    color: "bg-yellow-500",
  },
];

const PointerMenu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10 pt-24">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-10">
        👉 Pointer Topics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pointerSubtopics.map((topic, index) => (
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
              <h3 className="text-xl font-semibold text-center">
                {topic.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PointerMenu;
