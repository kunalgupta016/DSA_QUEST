import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
};

const InsertionSort = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await sleep(300);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(300);
    }

    setIsSorting(false);
  };

  const explainInHinglish = () => {
    alert(`📘 Insertion Sort ka simple samjhauta (Hinglish me):

1️⃣ Hum array ke second element se start karte hain (index 1).
2️⃣ Har element ko uske pehle wale sorted part ke elements ke saath compare karte hain.
3️⃣ Agar usse pehle koi bada element hai, to usko shift kar dete hain.
4️⃣ Us jagah tak jaate hain jaha wo element fit ho jaaye (sorted ban jaye).
5️⃣ Ye process pura array ke liye repeat hoti hai.

💡 Ye bilkul aise hai jaise cards ko haath me sort karna — har naye card ko uski sahi jagah insert karna.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">

      {/* 📘 Explanation Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">📘 Insertion Sort: Detailed Approach</h2>

        <p className="text-gray-300 mb-3 font-semibold text-lg">Approach:</p>
        <p className="text-gray-300 mb-4">The algorithm steps are as follows:</p>

        <ul className="list-disc list-inside space-y-3 text-gray-200 text-sm sm:text-base">
          <li>
            🔁 We start from the second element (index 1) and treat the first part as sorted.
          </li>
          <li>
            🟡 Pick the element (key) and compare it with elements before it.
          </li>
          <li>
            🔃 Shift all elements that are greater than the key one position to the right.
          </li>
          <li>
            📥 Insert the key in its correct position in the sorted part.
          </li>
          <li>
            ✅ Repeat this for all elements in the array until it's completely sorted.
          </li>
          <li className="bg-gray-700 rounded-md p-3">
            💡 <b>Note:</b> Insertion sort is efficient for small or nearly sorted arrays. It works like sorting playing cards in hand.
          </li>
        </ul>

        <h3 className="text-yellow-400 text-lg mt-6 mb-2 font-semibold">🔁 Pseudocode:</h3>
        <pre className="bg-black text-green-300 text-sm p-4 rounded-md overflow-x-auto">
{`for i in 1 to n-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j = j - 1
    arr[j + 1] = key`}
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
          onClick={insertionSort}
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

export default InsertionSort;
