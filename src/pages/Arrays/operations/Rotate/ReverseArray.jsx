import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 7) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const ReverseArray = () => {
  const [array, setArray] = useState(generateArray());
  const [highlight, setHighlight] = useState([]);
  const [reversing, setReversing] = useState(false);

  const handleReverse = async () => {
    setReversing(true);
    let arr = [...array];
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      setHighlight([left, right]);
      setArray([...arr]);
      await sleep(400);
      left++;
      right--;
    }

    setHighlight([]);
    setReversing(false);
  };

  const explainInHinglish = () => {
    alert(`🔁 Hinglish Explanation:

Reverse Array ka matlab hai array ke elements ko ulta kar dena.

1️⃣ Start from both ends (left & right).
2️⃣ Har bar left aur right element ko swap karo.
3️⃣ Jab tak dono pointers center tak nahi aate, tab tak repeat.
4️⃣ Time complexity: O(n), Space: O(1) (in-place reverse)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-400">

        <h1 className="text-3xl font-bold text-orange-300 text-center mb-8">
          🔁 Reverse Array
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Reverse Array In-Place
int arr[100], n = 7;
int left = 0, right = n - 1;
while (left < right) {
    swap(arr[left], arr[right]);
    left++;
    right--;
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
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlight.includes(idx)
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleReverse}
            className="bg-orange-500 px-5 py-2 rounded-md font-semibold hover:bg-orange-600 transition disabled:opacity-50"
            disabled={reversing}
          >
            Reverse Array
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlight([]);
              setReversing(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={reversing}
          >
            Reset Array
          </button>
        </div>

        {/* 🧠 Explain Button */}
        <div className="flex justify-center">
          <button
            onClick={explainInHinglish}
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Explain in Hinglish 🧠
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReverseArray;
