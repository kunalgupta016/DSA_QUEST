import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
};

const BubbleSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(300);
        }
      }
    }
    setIsSorting(false);
  };

  const explainInHinglish = () => {
  alert(
    `📘 Bubble Sort ka simple samjhauta (Hinglish me):

1️⃣ Pehle apn array ka ek range lete hain jo unsorted hai.
2️⃣ Fir usme bar bar adjacent numbers ko compare karte hain.
3️⃣ Agar left wala bada hota hai to dono ka swap kar dete hain.
4️⃣ Har pass ke baad, sabse bada number end me chala jata hai (sorted part banne lagta hai).
5️⃣ Ye process repeat hoti hai jab tak pura array sorted nahi ho jata.

💡 Outer loop range control karta hai, aur inner loop maximum element ko end me bhejta hai.`
  );
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">

      {/* 📘 Explanation Section */}
      {/* 📘 Bubble Sort Approach (Structured Version) */}
<div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
  <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Bubble Sort: Detailed Approach</h2>

  <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
  <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

  <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
    <li>
      🟡 First, we will select the <b>range of the unsorted array</b>.
      For that, we will run a loop (<i>say i</i>) that will signify the last index of the selected range.
    </li>
    <li>
      🔁 The loop will run backward from index <code>n-1</code> to <code>0</code> (where n = size of the array).
      <br />
      For example, <b>i = n-1</b> means the range is from 0 to n-1.
    </li>
    <li>
      🔄 Inside the loop, we will run another loop (<i>say j</i>) from 0 to i-1.
      This will help us <b>push the maximum element</b> to the end of the selected range by swapping adjacent elements.
    </li>
    <li>
      🔃 Basically, we will keep swapping adjacent elements (<code>if arr[j] &gt; arr[j+1]</code>) until the max element reaches the end.
    </li>
    <li>
      ✅ After each iteration, the <b>last part becomes sorted</b>. For example:
      <br />- 1st pass: up to last index sorted
      <br />- 2nd pass: up to second last index sorted
    </li>
    <li>
      📦 After (n-1) iterations, the whole array will be sorted.
    </li>
    <li className="bg-gray-700 rounded-md p-3">
      💡 <b>Note:</b> After each iteration, the array becomes sorted up to the last index of the range.
      <br />
      This is why the range decreases with each outer loop.
      <br />
      The outer loop (i) controls this range, and the inner loop (j) pushes the max element to index i.
    </li>
  </ul>

  <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
  <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`for i in 0 to n-1:
    for j in 0 to n-i-1:
        if arr[j] > arr[j+1]:
            swap(arr[j], arr[j+1])`}
  </pre>
</div>

      {/* 📊 Bars Section */}
      <div className="flex justify-center gap-2 items-end h-64 mt-20 mb-6">
        {array.map((value, index) => (
          <motion.div
            key={`bar-${index}`}
            layout
            className="bg-yellow-400 rounded-t-md"
            style={{ height: `${value * 3}px`, width: '30px' }}
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
          onClick={bubbleSort}
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

export default BubbleSort;
