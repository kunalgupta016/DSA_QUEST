import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const operations = [
  {
    category: "BST Operations",
    items: [
      { name: "Insert Node", path: "/trees/operations/insert" },
      {
        name: "Traversal (BFS/Level Order)",
        path: "/trees/operations/traversal",
      },
    ],
  },
];

const TreeOperations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-12">
          ⚙️ Tree Operations
        </h1>

        <div className="grid md:grid-cols-1 gap-8">
          {operations.map((group, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 border border-yellow-500 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-bold text-yellow-300 mb-4">
                {group.category}
              </h2>
              <ul className="space-y-3">
                {group.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      className="block bg-gray-700 hover:bg-yellow-500 hover:text-black transition px-4 py-2 rounded-md font-semibold"
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

export default TreeOperations;
