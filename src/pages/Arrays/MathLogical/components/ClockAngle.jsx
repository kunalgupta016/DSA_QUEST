import React, { useState } from "react";

const ClockAngle = () => {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(30);
  const [angle, setAngle] = useState(null);

  const calculate = () => {
    // Hour hand moves 0.5 degrees per minute
    // Minute hand moves 6 degrees per minute
    const h = (hour % 12) * 30 + minute * 0.5;
    const m = minute * 6;
    let diff = Math.abs(h - m);
    if (diff > 180) diff = 360 - diff;
    setAngle(diff);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-500">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          ⏰ Clock Angle Problem
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-xs">Hour</label>
            <input
              type="number"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-20 px-2 py-1 bg-gray-700"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs">Minute</label>
            <input
              type="number"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-20 px-2 py-1 bg-gray-700"
            />
          </div>
          <button
            onClick={calculate}
            className="bg-blue-600 px-6 py-2 rounded font-bold mt-4"
          >
            Calc
          </button>
        </div>
        <div className="text-center p-4 bg-black/30 rounded">
          <p className="text-4xl font-mono text-white">
            {angle !== null ? `${angle}°` : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ClockAngle;
