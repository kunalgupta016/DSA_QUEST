import React from "react";
import { motion } from "framer-motion";

const LinkedListBasics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-purple-500 text-center">
          Linked List Basics
        </h1>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              What is a Linked List?
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A Linked List is a linear data structure where elements are not
              stored at contiguous memory locations. The elements are linked
              using pointers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Types of Linked Lists
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Singly Linked List</li>
              <li>Doubly Linked List</li>
              <li>Circular Linked List</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              Time Complexity
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-4 py-2">Operation</th>
                    <th className="px-4 py-2">Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-2">Access</td>
                    <td className="px-4 py-2 text-red-400">O(n)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Search</td>
                    <td className="px-4 py-2 text-red-400">O(n)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Insertion (Start)</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Deletion (Start)</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
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

export default LinkedListBasics;
