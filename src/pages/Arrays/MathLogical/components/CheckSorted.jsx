import React, { useState } from "react";
import { motion } from "framer-motion";

const CheckSorted = () => {
  const [inputStr, setInputStr] = useState("1, 2, 3, 5, 4, 6");
  const [array, setArray] = useState([1, 2, 3, 5, 4, 6]);
  const [highlight, setHighlight] = useState([]);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleCheck = async () => {
    setProcessing(true);
    setResult(null);
    let arr = inputStr
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));
    setArray(arr);

    let isSorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
      setHighlight([i, i + 1]);
      await new Promise((r) => setTimeout(r, 500));

      if (arr[i] > arr[i + 1]) {
        isSorted = false;
        setResult(`❌ Unsorted Pair Found: ${arr[i]} > ${arr[i + 1]}`);
        setProcessing(false);
        return;
      }
    }

    setResult("✅ The array IS sorted.");
    setHighlight([]);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-yellow-500">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          📊 Check if Array is Sorted
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-300">
            Iterate through the array and check if every element is smaller than
            or equal to the next one.
          </p>
          <p className="text-gray-400 italic">
            Hinglish: Har element ko uske agle element se compare karo. Agar
            pichla bada hai, toh sorted nahi hai.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 w-64"
            placeholder="1, 2, 3, 4..."
          />
          <button
            onClick={handleCheck}
            disabled={processing}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md font-bold text-black disabled:opacity-50"
          >
            Check Sorted
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {array.map((val, idx) => {
            let isHighlighted = highlight.includes(idx);
            return (
              <motion.div
                key={idx}
                layout
                className={`px-4 py-3 rounded text-lg font-bold border-2 ${isHighlighted ? "bg-blue-500 border-blue-400 scale-110" : "bg-gray-700 border-gray-500"}`}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        {result && (
          <div className="text-center text-xl font-bold bg-black/40 p-4 rounded-lg">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckSorted;
