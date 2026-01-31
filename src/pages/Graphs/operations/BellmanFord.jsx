import React, { useState } from "react";
import { motion } from "framer-motion";

const BellmanFord = () => {
  // Graph with negative edge: 1 -> 2 (-2)
  const edges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 2, weight: 5 },
    { from: 1, to: 2, weight: -2 }, // negative weight
    { from: 1, to: 3, weight: 3 },
    { from: 2, to: 3, weight: 3 },
  ];

  const nodePositions = {
    0: { x: 100, y: 250 },
    1: { x: 300, y: 150 },
    2: { x: 300, y: 350 },
    3: { x: 500, y: 250 },
  };

  const [distances, setDistances] = useState({
    0: 0,
    1: Infinity,
    2: Infinity,
    3: Infinity,
  });
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeEdge, setActiveEdge] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBellmanFord = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLog([]);
    const dist = { 0: 0, 1: Infinity, 2: Infinity, 3: Infinity };
    const V = 4;

    setDistances({ ...dist });

    // Relax all edges V-1 times
    for (let i = 0; i < V - 1; i++) {
      setLog((prev) => [...prev, `--- Iteration ${i + 1} ---`]);
      let changed = false;

      for (let j = 0; j < edges.length; j++) {
        const { from, to, weight } = edges[j];
        setActiveEdge(j);
        await sleep(500);

        if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
          dist[to] = dist[from] + weight;
          setDistances({ ...dist });
          setLog((prev) => [
            ...prev,
            `Relaxed ${from}->${to}: New Dist ${dist[to]}`,
          ]);
          changed = true;
          await sleep(500);
        }
      }
      if (!changed) {
        setLog((prev) => [
          ...prev,
          `No changes in iteration ${i + 1}. Stopping early.`,
        ]);
        break;
      }
    }

    // Check for negative cycles (optional for this demo but good practice)
    for (let j = 0; j < edges.length; j++) {
      const { from, to, weight } = edges[j];
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        setLog((prev) => [...prev, `Negative Cycle Detected!`]);
        break;
      }
    }

    setActiveEdge(null);
    setIsRunning(false);
    setLog((prev) => [...prev, "Algorithm Complete"]);
  };

  const reset = () => {
    setDistances({ 0: 0, 1: Infinity, 2: Infinity, 3: Infinity });
    setLog([]);
    setIsRunning(false);
    setActiveEdge(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-500">
        Bellman-Ford Algorithm
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Computes shortest paths from a source node
          to all other nodes. Can handle negative edge weights.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Source node se baaki sabhi nodes tak ka
          shortest path nikalta hai. Negative edge weights ko bhi handle kar
          sakta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={runBellmanFord}
          disabled={isRunning}
          className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Run Bellman-Ford
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-8 w-full max-w-6xl">
        {/* Canvas */}
        <div className="flex-1 h-[500px] bg-gray-800 border-2 border-gray-600 rounded-lg relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {edges.map((edge, i) => (
              <g key={i}>
                <line
                  x1={nodePositions[edge.from].x}
                  y1={nodePositions[edge.from].y}
                  x2={nodePositions[edge.to].x}
                  y2={nodePositions[edge.to].y}
                  stroke={activeEdge === i ? "#F59E0B" : "#4B5563"}
                  strokeWidth={activeEdge === i ? "4" : "2"}
                />
                <text
                  x={
                    (nodePositions[edge.from].x + nodePositions[edge.to].x) / 2
                  }
                  y={
                    (nodePositions[edge.from].y + nodePositions[edge.to].y) /
                      2 -
                    10
                  }
                  fill={edge.weight < 0 ? "#EF4444" : "white"}
                  fontSize="14"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              </g>
            ))}
          </svg>

          {Object.keys(nodePositions).map((nodeId) => (
            <motion.div
              key={nodeId}
              className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-sm border-4 z-10 
                   border-gray-500 bg-gray-700
              `}
              style={{
                left: nodePositions[nodeId].x - 32,
                top: nodePositions[nodeId].y - 32,
              }}
            >
              <div>Node {nodeId}</div>
              <div className="text-xs text-yellow-300">
                {distances[nodeId] === Infinity ? "∞" : distances[nodeId]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Log */}
        <div className="w-80 bg-gray-800 border-2 border-gray-600 rounded-lg p-4 overflow-y-auto h-[500px]">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
            Log
          </h3>
          <ul className="space-y-2 font-mono text-sm">
            {log.map((entry, i) => (
              <li key={i} className="text-green-400">
                {" "}
                &gt; {entry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BellmanFord;
