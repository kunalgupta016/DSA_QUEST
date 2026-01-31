import React, { useState } from "react";
import { motion } from "framer-motion";

const UnionArrays = () => {
  const [arr1] = useState([1, 2, 4, 5, 6]);
  const [arr2] = useState([2, 3, 5, 7]);
  const [union, setUnion] = useState([]);
  const [message, setMessage] = useState("Sorted Arrays Input");
  const [processing, setProcessing] = useState(false);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);

  const findUnion = async () => {
    setProcessing(true);
    setUnion([]);
    let res = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      setP1(i);
      setP2(j);
      await new Promise((r) => setTimeout(r, 600));

      if (arr1[i] <= arr2[j]) {
        if (res.length === 0 || res[res.length - 1] !== arr1[i]) {
          res.push(arr1[i]);
          setMessage(`Adding ${arr1[i]} from Arr1`);
        } else {
          setMessage(`Skipping duplicate ${arr1[i]}`);
        }
        i++;
      } else {
        if (res.length === 0 || res[res.length - 1] !== arr2[j]) {
          res.push(arr2[j]);
          setMessage(`Adding ${arr2[j]} from Arr2`);
        } else {
          setMessage(`Skipping duplicate ${arr2[j]}`);
        }
        j++;
      }
      setUnion([...res]);
    }

    while (i < arr1.length) {
      setP1(i);
      setP2(null);
      await new Promise((r) => setTimeout(r, 400));
      if (res.length === 0 || res[res.length - 1] !== arr1[i])
        res.push(arr1[i]);
      i++;
      setUnion([...res]);
    }

    while (j < arr2.length) {
      setP1(null);
      setP2(j);
      await new Promise((r) => setTimeout(r, 400));
      if (res.length === 0 || res[res.length - 1] !== arr2[j])
        res.push(arr2[j]);
      j++;
      setUnion([...res]);
    }
    setMessage("✅ Union Complete");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-500">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          ∪ Union of Sorted Arrays
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={findUnion}
            disabled={processing}
            className="bg-indigo-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Find Union
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-700/50 p-4 rounded text-center">
            <h3 className="mb-2 font-bold">Array 1</h3>
            <div className="flex justify-center gap-2">
              {arr1.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: p1 === idx ? 1.2 : 1,
                    backgroundColor: p1 === idx ? "#4f46e5" : "#374151",
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded border border-gray-500 font-bold"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded text-center">
            <h3 className="mb-2 font-bold">Array 2</h3>
            <div className="flex justify-center gap-2">
              {arr2.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: p2 === idx ? 1.2 : 1,
                    backgroundColor: p2 === idx ? "#4f46e5" : "#374151",
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded border border-gray-500 font-bold"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded min-h-[80px] flex items-center justify-center gap-2 flex-wrap">
          {union.map((val, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={i}
              className="w-10 h-10 flex items-center justify-center rounded bg-indigo-900 border border-indigo-500 font-bold"
            >
              {val}
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center text-gray-400">{message}</div>
      </div>
    </div>
  );
};

export default UnionArrays;
