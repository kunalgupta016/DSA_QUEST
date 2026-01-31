import React, { useState } from "react";
import { motion } from "framer-motion";

const GraphVisualizer = () => {
  // Simple adjacency list graph for demo
  const initialGraph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 4],
    3: [1],
    4: [2, 5],
    5: [4],
  };

  // Coordinates for nodes
  const nodePositions = {
    0: { x: 400, y: 100 },
    1: { x: 200, y: 200 },
    2: { x: 600, y: 200 },
    3: { x: 100, y: 350 },
    4: { x: 700, y: 350 },
    5: { x: 500, y: 350 },
  };

  const [visited, setVisited] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [log, setLog] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bfs = async () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setVisited([]);
    setLog([]);

    const queue = [0];
    const visitedSet = new Set();
    visitedSet.add(0);

    const path = [];

    while (queue.length > 0) {
      const current = queue.shift();
      path.push(current);
      setVisited([...path]);
      setLog((prev) => [...prev, `Visited ${current}`]);

      await sleep(800);

      const neighbors = initialGraph[current] || [];
      for (let neighbor of neighbors) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    setIsTraversing(false);
    setLog((prev) => [...prev, "BFS Complete"]);
  };

  const dfs = async () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setVisited([]);
    setLog([]);

    const stack = [0];
    const visitedSet = new Set();
    const path = [];

    while (stack.length > 0) {
      const current = stack.pop();

      if (!visitedSet.has(current)) {
        visitedSet.add(current);
        path.push(current);
        setVisited([...path]);
        setLog((prev) => [...prev, `Visited ${current}`]);
        await sleep(800);

        const neighbors = initialGraph[current] || [];
        // Reverse to process in consistent order for stack
        for (let i = neighbors.length - 1; i >= 0; i--) {
          stack.push(neighbors[i]);
        }
      }
    }
    setIsTraversing(false);
    setLog((prev) => [...prev, "DFS Complete"]);
  };

  const reset = () => {
    setVisited([]);
    setLog([]);
    setIsTraversing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">
        Graph Visualizer (BFS / DFS)
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={bfs}
          disabled={isTraversing}
          className="px-6 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition disabled:opacity-50"
        >
          Run BFS
        </button>
        <button
          onClick={dfs}
          disabled={isTraversing}
          className="px-6 py-2 bg-orange-600 rounded hover:bg-orange-700 transition disabled:opacity-50"
        >
          Run DFS
        </button>
        <button
          onClick={reset}
          disabled={isTraversing}
          className="px-6 py-2 bg-gray-600 rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-8 w-full max-w-6xl">
        {/* Canvas Area */}
        <div className="flex-1 h-[500px] bg-gray-800 border-2 border-gray-600 rounded-lg relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Draw edges */}
            {Object.keys(initialGraph).map((from) =>
              initialGraph[from].map(
                (to) =>
                  // only draw if from < to to avoid duplicates in undirected visual (though this is directed implementation wise, we draw simple lines)
                  from < to && (
                    <line
                      key={`${from}-${to}`}
                      x1={nodePositions[from].x}
                      y1={nodePositions[from].y}
                      x2={nodePositions[to].x}
                      y2={nodePositions[to].y}
                      stroke="#4B5563"
                      strokeWidth="4"
                    />
                  ),
              ),
            )}
          </svg>

          {Object.keys(nodePositions).map((nodeId) => (
            <motion.div
              key={nodeId}
              className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl border-4 z-10 transition-colors duration-500
                            ${visited.includes(parseInt(nodeId)) ? "bg-yellow-500 border-yellow-300 text-black" : "bg-gray-700 border-gray-500 text-white"}
                        `}
              animate={{
                scale: visited.includes(parseInt(nodeId)) ? [1, 1.2, 1] : 1,
              }}
              style={{
                left: nodePositions[nodeId].x - 28, // center offset
                top: nodePositions[nodeId].y - 28,
              }}
            >
              {nodeId}
            </motion.div>
          ))}
        </div>

        {/* Log Area */}
        <div className="w-64 bg-gray-800 border-2 border-gray-600 rounded-lg p-4 overflow-y-auto h-[500px]">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
            Traversal Log
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

export default GraphVisualizer;
