import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  // Counting Sort works best with small range of non-negative integers
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10));
};

const CountingSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const countingSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    // Step 1: Count frequency
    for (let num of arr) {
      count[num]++;
    }

    // Step 2: Rebuild the array from counts
    let index = 0;
    for (let i = 0; i <= max; i++) {
      while (count[i] > 0) {
        arr[index++] = i;
        setArray([...arr]);
        await sleep(300);
        count[i]--;
      }
    }

    setIsSorting(false);
  };

  const explainInHinglish = () => {
    alert(`📘 Counting Sort ka simple samjhauta (Hinglish me):

1️⃣ Array ke sabhi elements ke occurrence count karte hain.
2️⃣ Ek frequency array bante hain (count[]).
3️⃣ Fir har element ko uski frequency ke hisaab se sorted order me rakhte hain.
4️⃣ Isme comparison nahi hota — isi liye ye counting-based sort hai!

💡 Ye tab best hai jab input numbers chhote aur non-negative ho.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">

      {/* 📘 Explanation Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Counting Sort: Detailed Approach</h2>

        <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
        <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
          <li>📊 Find the max element to create a frequency array (count[]).</li>
          <li>🔢 Count the occurrences of each number from the input.</li>
          <li>↪️ Reconstruct the sorted array using the frequency data.</li>
          <li>📦 Output is sorted array — stable if done with position tracking.</li>
          <li className="bg-gray-700 rounded-md p-3">
            💡 <b>Note:</b> Best for small integers. Time: O(n + k) where k is the max element.
          </li>
        </ul>

        <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
        <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`function countingSort(arr):
    max = maximum value in arr
    count = array of size (max+1) filled with 0

    for each number in arr:
        count[number]++

    index = 0
    for i = 0 to max:
        while count[i] > 0:
            arr[index++] = i
            count[i]--`}
        </pre>
      </div>

      {/* 📊 Bars Section */}
      <div className="flex justify-center gap-2 items-end h-64 mt-20 mb-6">
        {array.map((value, index) => (
          <motion.div
            key={`bar-${index}`}
            layout
            className="bg-yellow-400 rounded-t-md"
            style={{ height: `${(value + 1) * 20}px`, width: '30px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* 🔢 Array Blocks */}
      <div className="flex justify-center gap-4 mb-10">
        {array.map((value, index) => (
          <motion.div
            key={`block-${index}`}
            layout
            className="bg-gray-800 border border-yellow-400 rounded-md px-4 py-2 text-lg font-bold shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            [{value}]
          </motion.div>
        ))}
      </div>

      {/* 🎛 Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => setArray(generateRandomArray(10))}
          className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          disabled={isSorting}
        >
          Generate New
        </button>

        <button
          onClick={countingSort}
          className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
          disabled={isSorting}
        >
          Start Sorting
        </button>

        <button
          onClick={explainInHinglish}
          className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          Explain in Hinglish 🧠
        </button>
      </div>
    </div>
  );
};

export default CountingSort;
