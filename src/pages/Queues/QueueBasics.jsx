import React from "react";
import { motion } from "framer-motion";

const QueueBasics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-green-500 text-center">
          Queue Basics
        </h1>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              What is a Queue?
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A Queue is a linear data structure that follows the{" "}
              <strong>FIFO (First In First Out)</strong> principle. The element
              inserted first is the first one to be removed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Real World Examples
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Standing in a line at a ticket counter</li>
              <li>Printer job scheduling</li>
              <li>CPU Task Scheduling</li>
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
                    <td className="px-4 py-2">Enqueue</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Dequeue</td>
                    <td className="px-4 py-2 text-green-400">O(1)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Front</td>
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

export default QueueBasics;
