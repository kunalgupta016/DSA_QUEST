import React from "react";
import { motion } from "framer-motion";

const TreeBasics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-pink-500 text-center">
          Tree Basics
        </h1>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              What is a Tree?
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A Tree is a hierarchical data structure defined by nodes and
              edges. It consists of a root node and zero or more subtrees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Types of Trees
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Binary Tree</li>
              <li>Binary Search Tree (BST)</li>
              <li>AVL Tree</li>
              <li>Heap</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              BST Time Complexity
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-4 py-2">Operation</th>
                    <th className="px-4 py-2">Average</th>
                    <th className="px-4 py-2">Worst</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-2">Search</td>
                    <td className="px-4 py-2 text-green-400">O(log n)</td>
                    <td className="px-4 py-2 text-red-400">O(n)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Insert</td>
                    <td className="px-4 py-2 text-green-400">O(log n)</td>
                    <td className="px-4 py-2 text-red-400">O(n)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TreeBasics;
