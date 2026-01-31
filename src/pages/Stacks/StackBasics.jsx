import React from "react";
import { motion } from "framer-motion";

const StackBasics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-red-500 text-center">
          Stack Basics
        </h1>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              What is a Stack?
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A Stack is a linear data structure that follows the{" "}
              <strong>LIFO (Last In First Out)</strong> principle. The element
              inserted last is the first one to be deleted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Real World Examples
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Pile of plates in a cafeteria</li>
              <li>Undo mechanism in text editors</li>
              <li>Browser history (Back button)</li>
              <li>Function call stack in programming</li>
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
                    <td className="px-4 py-2">Push</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Pop</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Peek</td>
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

export default StackBasics;
