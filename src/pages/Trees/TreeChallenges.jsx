import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const challenges = [
  { name: "Max Depth of Binary Tree", path: "/trees/challenges/max-depth" },
  { name: "Invert Binary Tree", path: "/trees/challenges/invert" },
  { name: "Symmetric Tree", path: "/trees/challenges/symmetric" },
];

const TreeChallenges = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-8">
        🌳 Tree Challenges
      </h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {challenges.map((c, i) => (
          <Link key={i} to={c.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl border border-green-500/30 hover:border-green-500 shadow-lg text-center font-bold text-xl"
            >
              {c.name}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default TreeChallenges;
