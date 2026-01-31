import React, { useState } from "react";
import { motion } from "framer-motion";

const generateArray = (size = 7) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const LeftRotate = () => {
  const [array, setArray] = useState(generateArray());
  const [rotating, setRotating] = useState(false);
  const [highlight, setHighlight] = useState(null);

  const handleRotate = async () => {
    setRotating(true);
    const newArr = [...array];
    const first = newArr[0];

    // Highlight the shifting
    for (let i = 0; i < newArr.length - 1; i++) {
      newArr[i] = newArr[i + 1];
      setHighlight(i);
      setArray([...newArr]);
      await sleep(300);
    }

    newArr[newArr.length - 1] = first;
    setHighlight(newArr.length - 1);
    setArray([...newArr]);

    await sleep(300);
    setHighlight(null);
    setRotating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-400">
        <h1 className="text-3xl font-bold text-indigo-300 text-center mb-8">
          🔄 Left Rotate (One Step)
        </h1>

        <div className="mb-8 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-gray-300">
            <strong>English:</strong> Left Rotate shifts every element of the
            array one step to the left. The first element moves to the last
            position.
          </p>
          <p className="text-gray-400 italic">
            <strong>Hinglish:</strong> Left Rotate ka matlab hai puray array ko
            ek step left shift karna. Pehla element last position par chala jata
            hai aur circular shift hota hai.
          </p>
        </div>

        {/* 💻 Code Block */}
        <div className="bg-gray-900 text-green-300 text-sm p-4 rounded-md mb-8 overflow-x-auto">
          <pre>
            {`// Left Rotate by 1
int arr[100], n = 7;
int first = arr[0];
for (int i = 0; i < n - 1; i++) {
    arr[i] = arr[i + 1];
}
arr[n - 1] = first;`}
          </pre>
        </div>

        {/* 📊 Array Boxes */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {array.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`px-4 py-2 rounded-md text-lg font-bold border
              ${highlight === idx ? "bg-yellow-400 text-black border-yellow-300" : "bg-gray-700 border-gray-600"}`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* 🎛 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={handleRotate}
            className="bg-indigo-500 px-5 py-2 rounded-md font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
            disabled={rotating}
          >
            Left Rotate
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
      </div>
    </div>
  );
};

export default LeftRotate;
