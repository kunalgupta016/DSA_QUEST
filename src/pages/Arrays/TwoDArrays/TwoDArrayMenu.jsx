import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const twoDTopics = [
  {
    category: "🧩 Basic Traversal",
    items: [
      { name: "Matrix Traversal", path: "/arrays/2d/traversal" },
      { name: "Print Like a Wave", path: "/arrays/2d/wave-print" },
      { name: "Spiral Matrix", path: "/arrays/2d/spiral" },
    ],
  },
  {
    category: "🔄 Rotation & Transpose",
    items: [
      { name: "Transpose Matrix", path: "/arrays/2d/transpose" },
      { name: "Rotate Matrix 90°", path: "/arrays/2d/rotate-90" },
    ],
  },
  {
    category: "🔍 Search Algorithms",
    items: [
      { name: "Search in 2D Matrix I", path: "/arrays/2d/search-1" },
      { name: "Search in 2D Matrix II", path: "/arrays/2d/search-2" },
    ],
  },
];

const TwoDArrayMenu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-12">
          🔲 2D Arrays & Matrices
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {twoDTopics.map((group, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 border border-orange-500/30 rounded-xl p-6 shadow-md hover:shadow-orange-500/20 transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-bold text-orange-300 mb-4 border-b border-gray-700 pb-2">
                {group.category}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="block text-sm bg-gray-700/50 hover:bg-orange-600 hover:text-white transition px-4 py-2 rounded-md font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoDArrayMenu;
