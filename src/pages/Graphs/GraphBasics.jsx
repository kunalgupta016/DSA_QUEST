import React from "react";
import { motion } from "framer-motion";

const GraphBasics = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-yellow-500 text-center">
          Graph Basics
        </h1>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              What is a Graph?
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              A Graph is a non-linear data structure consisting of nodes
              (vertices) and edges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Types of Graphs
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Directed vs Undirected</li>
              <li>Weighted vs Unweighted</li>
              <li>Cyclic vs Acyclic</li>
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
                    <th className="px-4 py-2">Algorithm</th>
                    <th className="px-4 py-2">Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-2">BFS</td>
                    <td className="px-4 py-2 text-green-400">O(V + E)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">DFS</td>
                    <td className="px-4 py-2 text-green-400">O(V + E)</td>
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

export default GraphBasics;
