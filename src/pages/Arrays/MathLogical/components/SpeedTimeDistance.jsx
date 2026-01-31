import React, { useState } from "react";

const SpeedTimeDistance = () => {
  const [distance, setDistance] = useState(100);
  const [speed, setSpeed] = useState(50);
  const [time, setTime] = useState(null);

  const calc = () => {
    if (speed > 0) setTime(distance / speed);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-red-400 text-center mb-6">
          🏎 Speed Time Distance
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Dist"
            className="w-24 px-2 py-1 bg-gray-700"
          />
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Speed"
            className="w-24 px-2 py-1 bg-gray-700"
          />
          <button
            onClick={calc}
            className="bg-red-600 px-6 py-2 rounded font-bold"
          >
            Calc Time
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">
            {time !== null ? `${time} hrs` : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SpeedTimeDistance;
