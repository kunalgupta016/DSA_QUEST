import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const InsertEnd = () => {
  const [array, setArray] = useState(generateArray());
  const [newValue, setNewValue] = useState('');
  const [inserting, setInserting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleInsert = async () => {
    if (newValue === '') return;
    setInserting(true);

    setHighlightIndex(array.length);
    await sleep(400);

    setArray([...array, parseInt(newValue)]);
    setHighlightIndex(null);
    setNewValue('');
    setInserting(false);
  };

  const explainInHinglish = () => {
    alert(`📥 Hinglish Explanation:

Insert at End ka matlab hai array ke sabse aakhri position par naya element add karna.

1️⃣ Ye sabse simple insertion hota hai.
2️⃣ Koi shifting nahi hoti.
3️⃣ Bas array ke end me ek aur value lag jaati hai.

Jaise list me last me ek aur item add karna.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-400">

        <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
          ➕ Insert at End (Visualizer)
        </h1>

        {/* 🧠 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Insert at end
int arr[100], n = 5, value = 50;
arr[n] = value;
n++;`}
</pre>
        </div>

        {/* 📊 Array Boxes */}
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

export default InsertEnd;
