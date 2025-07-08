import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 7) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const InsertBegin = () => {
  const [array, setArray] = useState(generateArray());
  const [newValue, setNewValue] = useState('');
  const [inserting, setInserting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleInsert = async () => {
    if (newValue === '') return;
    setInserting(true);
    setHighlightIndex(0);
    await sleep(400);

    const newArr = [parseInt(newValue), ...array];
    setArray(newArr);
    setHighlightIndex(null);
    setNewValue('');
    setInserting(false);
  };

  const explainInHinglish = () => {
    alert(`📥 Hinglish Explanation:

Insert at Beginning ka matlab hai naya element array ke bilkul shuru me daalna.

1️⃣ Naya value front me insert hota hai.
2️⃣ Baaki sab elements ek index aage shift ho jaate hain.
3️⃣ Ye common operation hai — jaise queue me pehle aane wala element.`)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-400">

        <h1 className="text-3xl font-bold text-blue-400 text-center mb-8">
          📥 Insert at Beginning (Visualizer)
        </h1>

        {/* 🧠 DSA Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Insert at beginning
int arr[100], n = 5, value = 10;
for (int i = n - 1; i >= 0; i--) {
    arr[i + 1] = arr[i];
}
arr[0] = value;
n++;`}
</pre>
        </div>

        {/* 🟨 Array Bars */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((value, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlightIndex === index ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {value}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="New value"
            className="px-4 py-2 rounded-md text-black font-semibold"
            disabled={inserting}
          />
          <button
            onClick={handleInsert}
            className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
            disabled={inserting || newValue === ''}
          >
            Insert
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setNewValue('');
              setHighlightIndex(null);
              setInserting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={inserting}
          >
            Reset Array
          </button>
        </div>

        {/* 💬 Explain */}
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

export default InsertBegin;
