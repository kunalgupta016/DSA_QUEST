import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 6) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const DeleteBegin = () => {
  const [array, setArray] = useState(generateArray());
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (array.length === 0) return;
    setDeleting(true);
    setHighlightIndex(0);

    await sleep(500); // Wait to highlight

    const newArr = [...array];
    for (let i = 0; i < newArr.length - 1; i++) {
      newArr[i] = newArr[i + 1];
      setArray([...newArr.slice(0, newArr.length - 1)]);
      setHighlightIndex(i + 1);
      await sleep(200);
    }

    setHighlightIndex(null);
    setDeleting(false);
  };

  const explainInHinglish = () => {
    alert(`📤 Hinglish Explanation:

Delete at Beginning ka matlab hai array ka first element hata dena.

1️⃣ Saare elements ko ek index peeche shift karna padta hai.
2️⃣ Pehla element overwrite ho jaata hai.
3️⃣ Ye operation costly ho sakta hai (O(n)) because of shifting.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-400">

        <h1 className="text-3xl font-bold text-red-400 text-center mb-8">
          🗑️ Delete at Beginning (Visualizer)
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Delete from beginning
int arr[100], n = 6;
for (int i = 0; i < n - 1; i++) {
    arr[i] = arr[i + 1];
}
n--;`}
</pre>
        </div>

        {/* 📊 Array View */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlightIndex === idx ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={handleDelete}
            className="bg-red-500 px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition disabled:opacity-50"
            disabled={deleting || array.length === 0}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlightIndex(null);
              setDeleting(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={deleting}
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

export default DeleteBegin;
