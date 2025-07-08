import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  // Radix Sort works best with non-negative integers
  return Array.from({ length: size }, () => Math.floor(Math.random() * 900) + 100);
};

const getMax = (arr) => Math.max(...arr);

const getDigit = (num, place) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;

const getDigitCount = (num) => (num === 0 ? 1 : Math.floor(Math.log10(num)) + 1);

const getMaxDigits = (arr) => Math.max(...arr.map(getDigitCount));

const RadixSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const radixSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    const maxDigitCount = getMaxDigits(arr);

    for (let k = 0; k < maxDigitCount; k++) {
      let digitBuckets = Array.from({ length: 10 }, () => []);
      for (let i = 0; i < arr.length; i++) {
        const digit = getDigit(arr[i], k);
        digitBuckets[digit].push(arr[i]);
      }
      arr = [].concat(...digitBuckets);
      setArray([...arr]);
      await sleep(500);
    }

    setIsSorting(false);
  };

  const explainInHinglish = () => {
    alert(`📘 Radix Sort ka samjhauta (Hinglish me):

1️⃣ Ye sorting har digit level pe kaam karta hai (unit, tens, hundreds...).
2️⃣ Har digit position ke liye elements ko 0-9 buckets me divide kiya jata hai.
3️⃣ Buckets ko merge kar ke array update karte hain.
4️⃣ Ye step sabhi digits ke liye repeat hota hai.
5️⃣ Final output sorted array hota hai — bina comparison ke!

💡 Best for large list of integers. Time: O(nk) where k = max digits.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
      
      {/* 📘 Explanation Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Radix Sort: Detailed Approach</h2>

        <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
        <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
          <li>🔢 Determine the maximum number of digits in the array.</li>
          <li>🪣 For each digit position (starting from least significant digit):</li>
          <li>  ➡️ Place numbers into 10 buckets based on current digit (0-9).</li>
          <li>  ➡️ Concatenate buckets back into the array.</li>
          <li>🔁 Repeat for each digit place (unit, tens, hundreds...)</li>
          <li className="bg-gray-700 rounded-md p-3">
            💡 <b>Note:</b> Radix Sort is a non-comparison-based algorithm. Works best for uniform digit-length numbers.
          </li>
        </ul>

        <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
        <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`function radixSort(arr):
    maxDigits = number of digits in largest number
    for k = 0 to maxDigits - 1:
        create 10 buckets for digits 0 to 9
        place each number in corresponding bucket by digit at position k
        flatten all buckets into a new array
    return array`}
        </pre>
      </div>

      {/* 📊 Bars Section */}
      <div className="flex justify-center gap-2 items-end h-64 mt-55 mb-6">
        {array.map((value, index) => (
          <motion.div
            key={`bar-${index}`}
            layout
            className="bg-yellow-400 rounded-t-md"
            style={{ height: `${value / 2}px`, width: '30px' }}
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
          onClick={radixSort}
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

export default RadixSort;
