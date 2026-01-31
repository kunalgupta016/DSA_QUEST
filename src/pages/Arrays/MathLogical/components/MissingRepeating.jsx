import React, { useState } from "react";

const MissingRepeating = () => {
  const [array] = useState([3, 1, 2, 5, 3]); // N=5. Missing 4, Repeating 3.
  // S = n(n+1)/2. SN = sum(arr).  S - SN = X - Y (Missing - Repeating)? No.
  // Let X = Missing, Y = Repeating.
  // Sum(1..N) - Sum(Arr) = X - Y
  // Sum(1^2..N^2) - Sum(Arr^2) = X^2 - Y^2
  const [message, setMessage] = useState(
    "Using Math Method: Sum & Sum of Squares",
  );
  const [result, setResult] = useState(null);

  const solve = async () => {
    const n = array.length;
    const SN = (n * (n + 1)) / 2;
    const S2N = (n * (n + 1) * (2 * n + 1)) / 6;

    let S = 0;
    let S2 = 0;

    for (let x of array) {
      S += x;
      S2 += x * x;
    }

    // val1 = X - Y = SN - S
    // val2 = X^2 - Y^2 = S2N - S2
    const val1 = SN - S; // (Missing - Repeating)
    const val2 = S2N - S2; // (Missing^2 - Repeating^2)

    // val2 = (X-Y)(X+Y)
    // X + Y = val2 / val1
    const val3 = val2 / val1;

    const x = (val1 + val3) / 2; // Missing
    const y = x - val1; // Repeating

    setMessage("Calculating...");
    await new Promise((r) => setTimeout(r, 1000));
    setResult({ missing: x, repeating: y });
    setMessage(`✅ Missing: ${x}, Repeating: ${y}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          🔍 Find Missing & Repeating
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={solve}
            className="bg-blue-600 px-6 py-2 rounded font-bold"
          >
            Solve (Math Method)
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {array.map((val, idx) => (
            <div
              key={idx}
              className="w-12 h-12 flex items-center justify-center bg-gray-700 border-2 border-gray-500 rounded font-bold text-xl"
            >
              {val}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 text-center">
          <div className="bg-gray-700 p-4 rounded">
            <h3>Repeating (Y)</h3>
            <p className="text-4xl font-bold text-red-400">
              {result ? result.repeating : "-"}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h3>Missing (X)</h3>
            <p className="text-4xl font-bold text-green-400">
              {result ? result.missing : "-"}
            </p>
          </div>
        </div>

        <div className="text-center mt-6 p-4 bg-black/30 rounded text-yellow-300 font-mono">
          {message}
        </div>
      </div>
    </div>
  );
};
export default MissingRepeating;
