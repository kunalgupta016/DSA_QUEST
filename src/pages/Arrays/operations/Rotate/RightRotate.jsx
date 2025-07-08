import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 7) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const RightRotate = () => {
  const [array, setArray] = useState(generateArray());
  const [highlight, setHighlight] = useState(null);
  const [rotating, setRotating] = useState(false);

  const handleRotate = async () => {
    setRotating(true);
    const newArr = [...array];
    const last = newArr[newArr.length - 1];

    // Highlight shifting
    for (let i = newArr.length - 1; i > 0; i--) {
      newArr[i] = newArr[i - 1];
      setHighlight(i);
      setArray([...newArr]);
      await sleep(300);
    }

    newArr[0] = last;
    setHighlight(0);
    setArray([...newArr]);

    await sleep(300);
    setHighlight(null);
    setRotating(false);
  };

  const explainInHinglish = () => {
    alert(`🔁 Hinglish Explanation:

Right Rotate ka matlab hota hai array ke last element ko uthake sabse pehle rakhna.

1️⃣ Sabhi elements ko ek step right shift karo.
2️⃣ Last element first position pe chala jata hai.
3️⃣ Circular rotation type hoti hai.
4️⃣ Time complexity: O(n)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-pink-400">

        <h1 className="text-3xl font-bold text-pink-300 text-center mb-8">
          🔁 Right Rotate (One Step)
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Right Rotate by 1
int arr[100], n = 7;
int last = arr[n - 1];
for (int i = n - 1; i > 0; i--) {
    arr[i] = arr[i - 1];
}
arr[0] = last;`}
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
              ${highlight === idx ? 'bg-yellow-400 text-black border-yellow-300' : 'bg-gray-700 border-gray-600'}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleRotate}
            className="bg-pink-500 px-5 py-2 rounded-md font-semibold hover:bg-pink-600 transition disabled:opacity-50"
            disabled={rotating}
          >
            Right Rotate
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setHighlight(null);
              setRotating(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={rotating}
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

export default RightRotate;
