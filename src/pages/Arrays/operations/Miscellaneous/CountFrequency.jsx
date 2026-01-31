import React, { useState } from "react";
import { motion } from "framer-motion";

const generateArray = (size = 12) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 5) + 1); // small numbers for repeat

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const CountFrequency = () => {
  const [array, setArray] = useState(generateArray());
  const [highlight, setHighlight] = useState(null);
  const [freqMap, setFreqMap] = useState({});
  const [counting, setCounting] = useState(false);

  const handleCount = async () => {
    setCounting(true);
    let freq = {};

    for (let i = 0; i < array.length; i++) {
      setHighlight(i);
      await sleep(300);

      const val = array[i];
      freq[val] = (freq[val] || 0) + 1;
      setFreqMap({ ...freq });
    }

    setHighlight(null);
    setCounting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-400">
        <h1 className="text-3xl font-bold text-purple-300 text-center mb-8">
          🔢 Count Frequency of Each Element
        </h1>

        <div className="mb-8 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-gray-300">
            <strong>English:</strong> Count Frequency calculates how many times
            each element appears in the array. It uses a Map/Object to store
            counts.
          </p>
          <p className="text-gray-400 italic">
            <strong>Hinglish:</strong> Frequency Count ka matlab hai ye pata
            lagana ki har number array me kitni baar aaya hai. Hum ek Map ya
            Frequency Array use karte hain store karne ke liye.
          </p>
        </div>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
          <pre>
            {`// Frequency count using map
int arr[100], n;
unordered_map<int, int> freq;
for (int i = 0; i < n; i++) {
    freq[arr[i]]++;
}`}
          </pre>
        </div>

        {/* 📊 Array Display */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border 
              ${
                highlight === idx
                  ? "bg-yellow-400 text-black border-yellow-300"
                  : "bg-gray-700 border-gray-600"
              }`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 📦 Frequency Map Output */}
        {Object.keys(freqMap).length > 0 && (
          <div className="bg-gray-700 text-white rounded-md p-4 mb-10 max-w-md mx-auto text-center">
            <h3 className="text-lg font-bold text-purple-300 mb-2">
              📦 Frequency Table
            </h3>
            {Object.entries(freqMap).map(([num, count]) => (
              <p key={num} className="text-sm sm:text-base">
                🔹 <b>{num}</b> occurs <b>{count}</b> time(s)
              </p>
            ))}
          </div>
        )}

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleCount}
            className="bg-purple-500 px-5 py-2 rounded-md font-semibold hover:bg-purple-600 transition disabled:opacity-50"
            disabled={counting}
          >
            Count Frequency
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setFreqMap({});
              setHighlight(null);
              setCounting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            disabled={counting}
          >
            Reset Array
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountFrequency;
