import React, { useState } from "react";
import { motion } from "framer-motion";

const MergeSortedArrays = () => {
  const [arr1, setArr1] = useState([1, 3, 5, 7]);
  const [arr2, setArr2] = useState([2, 4, 6, 8]);
  const [merged, setMerged] = useState([]);
  const [ptr1, setPtr1] = useState(0);
  const [ptr2, setPtr2] = useState(0);
  const [message, setMessage] = useState("Ready to merge...");
  const [processing, setProcessing] = useState(false);

  const merge = async () => {
    setProcessing(true);
    setMerged([]);
    let p1 = 0,
      p2 = 0;
    setPtr1(0);
    setPtr2(0);
    let res = [];

    while (p1 < arr1.length && p2 < arr2.length) {
      setPtr1(p1);
      setPtr2(p2);
      await new Promise((r) => setTimeout(r, 800));

      if (arr1[p1] < arr2[p2]) {
        setMessage(`Taken ${arr1[p1]} from Array 1 (smaller than ${arr2[p2]})`);
        res.push(arr1[p1]);
        p1++;
      } else {
        setMessage(`Taken ${arr2[p2]} from Array 2 (smaller than ${arr1[p1]})`);
        res.push(arr2[p2]);
        p2++;
      }
      setMerged([...res]);
    }

    while (p1 < arr1.length) {
      setPtr1(p1);
      setPtr2(null);
      setMessage(
        `Array 2 exhausted. Taking remaining ${arr1[p1]} from Array 1.`,
      );
      await new Promise((r) => setTimeout(r, 500));
      res.push(arr1[p1]);
      p1++;
      setMerged([...res]);
    }

    while (p2 < arr2.length) {
      setPtr1(null);
      setPtr2(p2);
      setMessage(
        `Array 1 exhausted. Taking remaining ${arr2[p2]} from Array 2.`,
      );
      await new Promise((r) => setTimeout(r, 500));
      res.push(arr2[p2]);
      p2++;
      setMerged([...res]);
    }

    setMessage("✅ Merge Complete!");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-green-500">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          🎋 Merge Two Sorted Arrays
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={merge}
            disabled={processing}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Start Merge
          </button>
          <button
            onClick={() => {
              setMerged([]);
              setPtr1(0);
              setPtr2(0);
              setMessage("");
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Array 1 */}
          <div className="bg-gray-700/50 p-4 rounded text-center">
            <h3 className="mb-4 font-bold text-blue-300">Array 1</h3>
            <div className="flex justify-center gap-2">
              {arr1.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: ptr1 === idx ? 1.2 : 1,
                    y: ptr1 === idx ? 10 : 0,
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded bg-gray-600 border ${ptr1 === idx ? "border-yellow-400 bg-gray-500" : "border-gray-500"}`}
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
          {/* Array 2 */}
          <div className="bg-gray-700/50 p-4 rounded text-center">
            <h3 className="mb-4 font-bold text-pink-300">Array 2</h3>
            <div className="flex justify-center gap-2">
              {arr2.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: ptr2 === idx ? 1.2 : 1,
                    y: ptr2 === idx ? 10 : 0,
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded bg-gray-600 border ${ptr2 === idx ? "border-yellow-400 bg-gray-500" : "border-gray-500"}`}
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Merged Array */}
        <div className="bg-gray-900 p-6 rounded-lg min-h-[100px] flex flex-col items-center">
          <h3 className="mb-4 font-bold text-green-300">Merged Result</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {merged.map((val, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                key={idx}
                className="w-10 h-10 flex items-center justify-center rounded bg-green-900 border border-green-500 font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-yellow-300 font-mono bg-black/30 p-2 rounded">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MergeSortedArrays;
