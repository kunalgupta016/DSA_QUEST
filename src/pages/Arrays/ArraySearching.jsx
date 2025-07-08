import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router";
const ArraySearching = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-gray-800 p-8 mt-10 mb-10 rounded-xl shadow-lg border border-yellow-400"
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">🔍 Array Searching</h1>

        <p className="text-gray-300 mb-4 text-lg leading-7">
          Searching means finding a specific element in an array. There are two main types:
        </p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-base mb-8">
          <li><span className="text-yellow-300 font-semibold">Linear Search:</span> Check every element one by one (O(n))</li>
          <li><span className="text-yellow-300 font-semibold">Binary Search:</span> Works on sorted arrays, divide & conquer (O(log n))</li>
        </ul>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Linear Search Visual Link */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/array/searching/linear">
              <div className="p-6 bg-gray-900 rounded-lg border border-green-400 hover:bg-green-800 transition">
                <h2 className="text-xl font-bold text-green-400">🔁 Linear Search</h2>
                <p className="text-gray-300 mt-2">Sequentially checks each element.</p>
              </div>
            </Link>
          </motion.div>

          {/* Binary Search Visual Link */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/array/searching/binary">
              <div className="p-6 bg-gray-900 rounded-lg border border-blue-400 hover:bg-blue-800 transition">
                <h2 className="text-xl font-bold text-blue-400">📈 Binary Search</h2>
                <p className="text-gray-300 mt-2">Works only on sorted arrays by dividing the range.</p>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              alert(
                `🔍 Hinglish Explanation:

Linear Search: Ek ek element ko check karte hain jab tak value mil jaaye. Slow but simple.
Binary Search: Jab array sorted ho, to middle value se start karte hain — har baar half discard karte hain.`
              )
            }
            className="mt-6 bg-yellow-400 cursor-pointer text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Explain in Hinglish 🧠
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ArraySearching;
