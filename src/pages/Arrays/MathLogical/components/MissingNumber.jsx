import React, { useState } from "react";
import { motion } from "framer-motion";

const MissingNumber = () => {
  const [n, setN] = useState(5);
  const [array, setArray] = useState([1, 2, 4, 5]); // Missing 3
  const [method, setMethod] = useState("sum"); // 'sum' or 'xor'
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [processing, setProcessing] = useState(false);

  const solve = async () => {
    setProcessing(true);
    setLogs([]);
    setResult(null);
    let logArr = [];

    if (method === "sum") {
      logArr.push("Using Sum Formula: Sum(N) - Sum(Array)");
      setLogs([...logArr]);

      const expectedSum = (n * (n + 1)) / 2;
      logArr.push(`Expected Sum for 1 to ${n} = ${expectedSum}`);
      setLogs([...logArr]);
      await new Promise((r) => setTimeout(r, 800));

      let currentSum = 0;
      for (let x of array) {
        currentSum += x;
        logArr.push(`Adding ${x}... Current Sum = ${currentSum}`);
        setLogs([...logArr]);
        await new Promise((r) => setTimeout(r, 400));
      }

      const missing = expectedSum - currentSum;
      logArr.push(`Missing = ${expectedSum} - ${currentSum} = ${missing}`);
      setLogs([...logArr]);
      setResult(missing);
    } else {
      logArr.push("Using XOR Method: XOR(1..N) ^ XOR(Array)");
      setLogs([...logArr]);

      let xorAll = 0;
      for (let i = 1; i <= n; i++) xorAll ^= i;
      logArr.push(`XOR of 1 to ${n} = ${xorAll}`);
      setLogs([...logArr]);

      let xorArr = 0;
      for (let x of array) xorArr ^= x;
      logArr.push(`XOR of Array Elements = ${xorArr}`);
      setLogs([...logArr]);

      const missing = xorAll ^ xorArr;
      logArr.push(`Missing = ${xorAll} ^ ${xorArr} = ${missing}`);
      setLogs([...logArr]);
      setResult(missing);
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          🕵️ Find Missing Number
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            <option value="sum">Sum Formula</option>
            <option value="xor">XOR Method</option>
          </select>
          <button
            onClick={solve}
            disabled={processing}
            className="bg-red-500 px-6 py-2 rounded font-bold"
          >
            Find Missing
          </button>
          <button
            onClick={() => {
              setN(5);
              setArray([1, 3, 4, 5]);
              setLogs([]);
              setResult(null);
            }}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center bg-gray-700 border border-gray-500 rounded font-bold"
            >
              {val}
            </div>
          ))}
          <div className="w-10 h-10 flex items-center justify-center bg-gray-800 border border-dashed border-gray-500 rounded font-bold text-gray-500">
            ?
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
          {logs.map((l, i) => (
            <p key={i} className="mb-1 text-green-300">
              {" "}
              {">"} {l}
            </p>
          ))}
          {result && (
            <p className="text-xl font-bold text-white mt-4 border-t pt-2 border-gray-600">
              Result: {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingNumber;
