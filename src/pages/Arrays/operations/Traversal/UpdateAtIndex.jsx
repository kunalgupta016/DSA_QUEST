import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const UpdateAtIndex = () => {
  const [array, setArray] = useState(generateArray());
  const [index, setIndex] = useState('');
  const [newValue, setNewValue] = useState('');
  const [highlight, setHighlight] = useState(null);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (
      index === '' ||
      newValue === '' ||
      index < 0 ||
      index >= array.length
    )
      return;

    setUpdating(true);
    setHighlight(Number(index));
    await sleep(400);

    const newArr = [...array];
    newArr[index] = Number(newValue);
    setArray(newArr);

    await sleep(300);
    setHighlight(null);
    setIndex('');
    setNewValue('');
    setUpdating(false);
  };

  const explainInHinglish = () => {
    alert(`🛠 Hinglish Explanation:

Update at Index ka matlab hai kisi particular index pe value ko replace karna.

1️⃣ Jaise agar index 2 pe 45 hai, aur hume usko 99 karna hai — to bas arr[2] = 99.
2️⃣ Ye ek simple operation hai — koi shifting nahi.
3️⃣ Time complexity: O(1) — direct access hota hai.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-400">

        <h1 className="text-3xl font-bold text-green-300 text-center mb-8">
          🛠️ Update at Specific Index
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Update at specific index
int arr[100], index = 3;
arr[index] = 99; // replace old value`}
</pre>
        </div>

        {/* 📊 Array Blocks */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlight === idx ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Input Controls */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <input
            type="number"
            placeholder="Index"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            className="px-4 py-2 rounded-md text-black font-semibold w-32"
            disabled={updating}
          />
          <input
            type="number"
            placeholder="New Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="px-4 py-2 rounded-md text-black font-semibold w-32"
            disabled={updating}
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 px-5 py-2 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
            disabled={updating}
          >
            Update
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setIndex('');
              setNewValue('');
              setHighlight(null);
              setUpdating(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={updating}
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

export default UpdateAtIndex;
