import React, { useState } from "react";
import { motion } from "framer-motion";

const IntersectionArrays = () => {
  const [arr1] = useState([1, 2, 2, 3, 4, 6]);
  const [arr2] = useState([2, 2, 4, 6, 8]); // Sorted inputs
  const [intersection, setIntersection] = useState([]);
  const [ptr1, setPtr1] = useState(0);
  const [ptr2, setPtr2] = useState(0);
  const [message, setMessage] = useState(
    "Inputs are sorted. Using Two Pointers.",
  );
  const [processing, setProcessing] = useState(false);

  const findIntersection = async () => {
    setProcessing(true);
    setIntersection([]);
    let p1 = 0,
      p2 = 0;
    let res = [];

    while (p1 < arr1.length && p2 < arr2.length) {
      setPtr1(p1);
      setPtr2(p2);
      await new Promise((r) => setTimeout(r, 800));

      if (arr1[p1] === arr2[p2]) {
        setMessage(`Match Found: ${arr1[p1]}! Adding to result.`);
        res.push(arr1[p1]);
        setIntersection([...res]);
        p1++;
        p2++;
      } else if (arr1[p1] < arr2[p2]) {
        setMessage(`${arr1[p1]} < ${arr2[p2]}, moving pointer 1.`);
        p1++;
      } else {
        setMessage(`${arr2[p2]} < ${arr1[p1]}, moving pointer 2.`);
        p2++;
      }
    }
    setMessage("✅ Intersection Complete");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-cyan-500">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          ∩ Intersection of Sorted Arrays
        </h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={findIntersection}
            disabled={processing}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-md font-bold disabled:opacity-50"
          >
            Find Intersection
          </button>
          <button
            onClick={() => {
              setIntersection([]);
              setPtr1(0);
              setPtr2(0);
            }}
            className="ml-4 bg-gray-600 px-4 py-2 rounded"
          >
            Reset
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
                    scale: ptr1 === idx ? 1.2 : 1,
                    backgroundColor: ptr1 === idx ? "#06b6d4" : "#374151",
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
                    scale: ptr2 === idx ? 1.2 : 1,
                    backgroundColor: ptr2 === idx ? "#06b6d4" : "#374151",
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded border border-gray-500 font-bold"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">
            Result (Intersection)
          </h3>
          <div className="flex justify-center gap-2 min-h-[50px]">
            {intersection.map((val, i) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-900 border border-cyan-400 font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-gray-400 font-mono">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default IntersectionArrays;
