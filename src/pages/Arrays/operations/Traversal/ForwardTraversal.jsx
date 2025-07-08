import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 7) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const ForwardTraversal = () => {
  const [array, setArray] = useState(generateArray());
  const [highlight, setHighlight] = useState(null);
  const [traversing, setTraversing] = useState(false);

  const handleTraverse = async () => {
    setTraversing(true);
    for (let i = 0; i < array.length; i++) {
      setHighlight(i);
      await sleep(400);
    }
    setHighlight(null);
    setTraversing(false);
  };

  const explainInHinglish = () => {
    alert(`🔄 Hinglish Explanation:

Forward Traversal ka matlab hota hai array ko left se right (0 index se n-1 tak) traverse karna.

1️⃣ Har element ko ek ek karke dekhte hain.
2️⃣ Is traversal me generally loop use hota hai from i = 0 to i < n.
3️⃣ Ye base operation hai saari searching aur processing ke liye.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-400">

        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-8">
          ➡️ Forward Traversal (Left to Right)
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Forward Traversal
int arr[100], n = 7;
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}`}
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

        {/* 🎛 Controls */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleTraverse}
            className="bg-cyan-500 px-5 py-2 rounded-md font-semibold hover:bg-cyan-600 transition disabled:opacity-50"
            disabled={traversing}
          >
            Start Traversal
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlight(null);
              setTraversing(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={traversing}
          >
            Reset Array
          </button>
        </div>

        {/* 🧠 Explain */}
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

export default ForwardTraversal;
