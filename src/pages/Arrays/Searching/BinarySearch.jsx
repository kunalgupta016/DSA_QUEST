import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateSortedArray = (size) => {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  return arr.sort((a, b) => a - b);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BinarySearch = () => {
  const [array, setArray] = useState(generateSortedArray(10));
  const [target, setTarget] = useState('');
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const binarySearch = async () => {
    let l = 0;
    let h = array.length - 1;
    setIsSearching(true);
    setFoundIndex(null);

    while (l <= h) {
      setLow(l);
      setHigh(h);
      let m = Math.floor((l + h) / 2);
      setMid(m);
      await sleep(600);

      if (array[m] === parseInt(target)) {
        setFoundIndex(m);
        break;
      } else if (array[m] < parseInt(target)) {
        l = m + 1;
      } else {
        h = m - 1;
      }
    }

    setIsSearching(false);
    setLow(null);
    setHigh(null);
    setMid(null);
  };

  const explainInHinglish = () => {
    alert(`🧠 Hinglish Explanation:

Binary Search sorted array pe kaam karta hai.
1. Low aur High index lete hain.
2. Beech ka middle element check karte hain.
3. Agar mid == target ➤ mil gaya!
4. Agar target chhota hai ➤ left half me jaate hain.
5. Agar target bada hai ➤ right half me jaate hain.

Ye process repeat hoti hai jab tak mil na jaaye.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto bg-gray-800 mt-10 mb-10 p-8 rounded-xl shadow-lg border border-blue-400">

        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          📈 Binary Search Visualizer
        </h1>

        {/* Array Blocks */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((value, index) => {
            let bg = 'bg-gray-700 border-gray-600';
            if (index === foundIndex) bg = 'bg-green-500 border-green-300';
            else if (index === mid) bg = 'bg-yellow-400 text-black border-yellow-300';
            else if (index >= low && index <= high) bg = 'bg-blue-700 border-blue-500';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`px-4 py-2 rounded-md text-lg font-bold border ${bg}`}
              >
                {value}
              </motion.div>
            );
          })}
        </div>

        {/* Input & Buttons */}
        <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter value to search"
            className="px-4 py-2 rounded-md text-black font-semibold"
            disabled={isSearching}
          />

          <button
            onClick={binarySearch}
            className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
            disabled={isSearching || target === ''}
          >
            Start Search
          </button>

          <button
            onClick={() => {
              setArray(generateSortedArray(10));
              setTarget('');
              setLow(null);
              setHigh(null);
              setMid(null);
              setFoundIndex(null);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isSearching}
          >
            Generate New
          </button>
        </div>

        {/* Explain */}
        <div className="flex justify-center">
          <button
            onClick={explainInHinglish}
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Explain in Hinglish 🧠
          </button>
        </div>

        {/* Result */}
        <div className="text-center mt-8 text-lg font-bold">
          {foundIndex !== null && (
            <span className="text-green-400">
              ✅ Element found at index {foundIndex}
            </span>
          )}
          {!isSearching && foundIndex === null && target !== '' && (
            <span className="text-red-400">❌ Element not found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinarySearch;
