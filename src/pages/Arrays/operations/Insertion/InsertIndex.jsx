import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const InsertIndex = () => {
  const [array, setArray] = useState(generateArray());
  const [index, setIndex] = useState('');
  const [value, setValue] = useState('');
  const [highlight, setHighlight] = useState(null);
  const [inserting, setInserting] = useState(false);

  const handleInsert = async () => {
    if (value === '' || index === '' || index < 0 || index > array.length) return;

    setInserting(true);
    const newArr = [...array];

    // Shift elements
    for (let i = newArr.length; i > index; i--) {
      newArr[i] = newArr[i - 1];
      setArray([...newArr]);
      setHighlight(i);
      await sleep(250);
    }

    newArr[index] = parseInt(value);
    setArray(newArr);
    setHighlight(null);
    setIndex('');
    setValue('');
    setInserting(false);
  };

  const explainInHinglish = () => {
    alert(`📌 Hinglish Explanation:

Insert at Index ka matlab hai array ke kisi particular position par naya element daalna.

1️⃣ Pehle us index ke baad ke sabhi elements ko right shift karna padta hai.
2️⃣ Phir desired value ko uss position par insert kiya jaata hai.
3️⃣ Jaise book me beech me naya page lagana.

Isme shifting thoda costly hota hai (O(n) time).`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-400">

        <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">
          🎯 Insert at Specific Index
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Insert at specific index
int arr[100], n = 6, index = 3, value = 25;
for (int i = n; i > index; i--) {
    arr[i] = arr[i - 1];
}
arr[index] = value;
n++;`}
</pre>
        </div>

        {/* 📊 Visualizer */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlight === idx ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <input
            type="number"
            placeholder="Index"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            className="px-4 py-2 rounded-md text-black font-semibold"
            disabled={inserting}
          />
          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-4 py-2 rounded-md text-black font-semibold"
            disabled={inserting}
          />
          <button
            onClick={handleInsert}
            className="bg-purple-500 px-5 py-2 rounded-md font-semibold hover:bg-purple-600 transition disabled:opacity-50"
            disabled={inserting || value === '' || index === ''}
          >
            Insert
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setIndex('');
              setValue('');
              setHighlight(null);
              setInserting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={inserting}
          >
            Reset Array
          </button>
        </div>

        {/* 💬 Hinglish Button */}
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

export default InsertIndex;
