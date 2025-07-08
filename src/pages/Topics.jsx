import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const topics = [
  { name: "Arrays", path: "/arrays", color: "bg-red-500" },
  { name: "Stacks", path: "/visualizer/stacks", color: "bg-blue-500" },
  { name: "Queues", path: "/visualizer/queues", color: "bg-green-500" },
  { name: "Linked Lists", path: "/visualizer/linkedlist", color: "bg-purple-500" },
  { name: "Trees", path: "/visualizer/trees", color: "bg-pink-500" },
  { name: "Graphs", path: "/visualizer/graphs", color: "bg-yellow-500" },
  { name: "Sorting", path: "/sortinglist", color: "bg-indigo-500" },
  { name: "Searching", path: "/visualizer/searching", color: "bg-teal-500" },
];

const Topics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">🔍 Choose a Topic</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={topic.path}>
              <div className={`p-8 rounded-xl shadow-lg ${topic.color} text-center font-bold text-xl hover:shadow-2xl transition`}>
                {topic.name}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
