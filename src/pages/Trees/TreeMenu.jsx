import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const treeSubtopics = [
  { name: "Basics", path: "/trees/basics", color: "bg-red-500" },
  { name: "Tree Operations", path: "/trees/operations", color: "bg-pink-500" },
  { name: "Challenges", path: "/trees/challenges", color: "bg-green-500" },
];

const TreeMenu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10 pt-24">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10">
        🌳 Tree Topics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {treeSubtopics.map((topic, index) => (
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

export default TreeMenu;
