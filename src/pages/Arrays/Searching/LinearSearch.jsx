import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LinearSearch = () => {
  const [array, setArray] = useState(generateRandomArray(10));
  const [target, setTarget] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setFoundIndex(null);
    setIsSearching(true);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(500);

      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        break;
      }
    }

    setCurrentIndex(-1);
    setIsSearching(false);
  };

  const explainHinglish = () => {
    alert(`🧠 Hinglish Explanation:

Linear Search ek simple algorithm hai.
Apn array ke har element ko left to right check karte hain.
Agar kisi index pe element mil gaya jo target se match karta hai, to wahi answer hai.

Warna pura array check karne ke baad "not found" bolte hain.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl mt-10 mb-10 shadow-lg border border-yellow-400">

        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          🔍 Linear Search Visualizer
        </h1>

        {/* Array Display */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
                ${
                  foundIndex === index
                    ? 'bg-green-500 border-green-300'
                    : currentIndex === index
                    ? 'bg-yellow-400 text-black border-yellow-300'
                    : 'bg-gray-700 border-gray-600'
                }`}
            >
              {value}
            </motion.div>
          ))}
        </div>

        {/* Input */}
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
            onClick={handleSearch}
            className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
            disabled={isSearching || target === ''}
          >
            Start Search
          </button>

          <button
            onClick={() => {
              setArray(generateRandomArray(10));
              setTarget('');
              setCurrentIndex(-1);
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
            onClick={explainHinglish}
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

export default LinearSearch;
