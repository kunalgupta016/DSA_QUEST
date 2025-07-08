import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
};

const SelectionSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }
    }

    setIsSorting(false);
  };

  const explainInHinglish = () => {
    alert(`📘 Selection Sort ka easy samjhauta (Hinglish me):

1️⃣ Har iteration me hum array ke unsorted part se sabse chhota element dhundhte hain.
2️⃣ Fir uss smallest element ko current index (i) ke sath swap kar dete hain.
3️⃣ Har baar ek element apni final sorted position pe chala jata hai.
4️⃣ Ye process tab tak repeat hoti hai jab tak poora array sorted na ho jaye.

💡 Isme har baar minimum dhundhne ka kaam hota hai, uske baad swap. Step by step array sort hota hai.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">

      {/* 📘 Explanation Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Selection Sort: Detailed Approach</h2>

        <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
        <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
          <li>
            🔍 First, we divide the array into two parts — sorted and unsorted.
          </li>
          <li>
            🟡 We start from index 0 and assume it is the minimum.
          </li>
          <li>
            🔁 Then we search the rest of the array to find the actual minimum.
          </li>
          <li>
            🔄 Once found, we <b>swap the minimum element</b> with the current index.
          </li>
          <li>
            ✅ After each iteration, one more element is sorted at the beginning of the array.
          </li>
          <li className="bg-gray-700 rounded-md p-3">
            💡 <b>Note:</b> Selection Sort does not depend on adjacent comparison like Bubble Sort. 
            It focuses on finding the minimum and fixing it in place.
          </li>
        </ul>

        <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
        <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`for i in 0 to n-1:
    minIndex = i
    for j in i+1 to n:
        if arr[j] < arr[minIndex]:
            minIndex = j
    swap(arr[i], arr[minIndex])`}
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
          onClick={selectionSort}
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

export default SelectionSort;
