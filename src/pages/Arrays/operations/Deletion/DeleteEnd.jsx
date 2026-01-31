import React, { useState } from "react";
import { motion } from "framer-motion";

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const DeleteEnd = () => {
  const [array, setArray] = useState(generateArray());
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (array.length === 0) return;
    setDeleting(true);
    const lastIndex = array.length - 1;
    setHighlightIndex(lastIndex);

    await sleep(400);

    setArray(array.slice(0, lastIndex));
    setHighlightIndex(null);
    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-400">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-8">
          🗑️ Delete at End (Visualizer)
        </h1>

        <div className="mb-8 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-gray-300">
            <strong>English:</strong> Delete at End removes the last element of
            the array. No shifting is needed.
          </p>
          <p className="text-gray-400 italic">
            <strong>Hinglish:</strong> Delete at End ka matlab hai array ka last
            element hata dena. Isme koi shifting nahi hoti, bas last element
            ignore kar dete hain. Ye sabse fast operation hai.
          </p>
        </div>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
          <pre>
            {`// Delete from end
int arr[100], n = 6;
n--;  // Simply reduce size`}
          </pre>
        </div>

        {/* 📊 Array Visual */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlightIndex === idx ? "bg-yellow-400 text-black border-yellow-300" : "bg-gray-700 border-gray-600"}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={handleDelete}
            className="bg-red-500 px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition disabled:opacity-50"
            disabled={deleting || array.length === 0}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlightIndex(null);
              setDeleting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={deleting}
          >
            Reset Array
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEnd;
