import React, { useState } from "react";

const DuplicateXOR = () => {
  // Note: XOR method for finding duplicate works if array has 1...N-1 elements and one duplicate.
  // Or if all elements appear twice except one (which is covered in OddOccurrence).
  // The menu says "Find Duplicate (XOR)", usually referring to finding one duplicate in 1..N-1 range (XOR 1..N-1 ^ XOR Arr)
  const [array, setArray] = useState([1, 3, 4, 2, 2]);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("XOR(1..N-1) ^ XOR(Arr)");

  const solve = async () => {
    let x1 = 0;
    let x2 = 0;
    let n = array.length;

    // XOR 1 to N-1
    for (let i = 1; i < n; i++) x1 ^= i;

    // XOR Array
    for (let x of array) x2 ^= x;

    setResult(x1 ^ x2);
    setMessage(`✅ Duplicate is ${x1 ^ x2}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">
          👯 Find Duplicate (XOR)
        </h1>
        <p className="text-center text-gray-400 mb-6">[1, 3, 4, 2, 2]</p>
        <div className="flex justify-center mb-6">
          <button
            onClick={solve}
            className="bg-purple-600 px-6 py-2 rounded font-bold"
          >
            Find
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">
            {result !== null ? result : "-"}
          </p>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};
export default DuplicateXOR;
