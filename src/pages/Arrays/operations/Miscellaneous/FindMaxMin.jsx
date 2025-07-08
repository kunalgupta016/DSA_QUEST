import React, { useState } from 'react';
import { motion } from 'framer-motion';

const generateArray = (size = 8) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const FindMaxMin = () => {
  const [array, setArray] = useState(generateArray());
  const [maxIndex, setMaxIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleFind = async () => {
    setSearching(true);
    let maxI = 0;
    let minI = 0;

    for (let i = 1; i < array.length; i++) {
      await sleep(400);
      if (array[i] > array[maxI]) {
        maxI = i;
      }
      if (array[i] < array[minI]) {
        minI = i;
      }
      setMaxIndex(maxI);
      setMinIndex(minI);
    }

    setSearching(false);
  };

  const explainInHinglish = () => {
    alert(`🔍 Hinglish Explanation:

Max/Min nikalne ke liye hum array ko left se right traverse karte hain.

1️⃣ Pehle element ko max/min maan lete hain.
2️⃣ Har naye element se compare karte hain.
3️⃣ Agar bada mila to max update, chhota mila to min update.
4️⃣ End me dono values mil jaati hain.

⚙️ Time Complexity: O(n)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-400">

        <h1 className="text-3xl font-bold text-cyan-300 text-center mb-8">
          🔍 Find Maximum & Minimum
        </h1>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
<pre>
{`// Find max and min
int arr[100], n = 8;
int max = arr[0], min = arr[0];
for (int i = 1; i < n; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
}`}
</pre>
        </div>

        {/* 📊 Array Display */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => {
            let classes = "px-4 py-2 rounded-md text-lg font-bold border ";
            if (idx === maxIndex) {
              classes += "bg-green-400 text-black border-green-300";
            } else if (idx === minIndex) {
              classes += "bg-red-400 text-black border-red-300";
            } else {
              classes += "bg-gray-700 border-gray-600";
            }

            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={classes}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleFind}
            className="bg-cyan-500 px-5 py-2 rounded-md font-semibold hover:bg-cyan-600 transition disabled:opacity-50"
            disabled={searching}
          >
            Find Max & Min
          </button>
          <button
            onClick={() => {
              setArray(generateArray());
              setMaxIndex(null);
              setMinIndex(null);
              setSearching(false);
            }}
            className="bg-blue-500 px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={searching}
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

export default FindMaxMin;
