import React, { useState } from "react";
import { motion } from "framer-motion";

const TopologicalSort = () => {
  // DAG: 5->0, 5->2, 4->0, 4->1, 2->3, 3->1
  const graph = {
    0: [],
    1: [],
    2: [3],
    3: [1],
    4: [0, 1],
    5: [0, 2],
  };

  const nodePositions = {
    0: { x: 300, y: 300 },
    1: { x: 500, y: 300 },
    2: { x: 300, y: 200 },
    3: { x: 500, y: 200 },
    4: { x: 500, y: 100 },
    5: { x: 300, y: 100 },
  };

  const [stack, setStack] = useState([]);
  const [visited, setVisited] = useState([]);
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const dfs = async (node, visitedSet, currentStack) => {
    visitedSet.add(node);
    setVisited(Array.from(visitedSet));
    setActiveNode(parseInt(node));
    setLog((prev) => [...prev, `Visiting ${node}`]);
    await sleep(800);

    const neighbors = graph[node] || [];
    for (let neighbor of neighbors) {
      if (!visitedSet.has(String(neighbor)) && !visitedSet.has(neighbor)) {
        await dfs(neighbor, visitedSet, currentStack);
      }
    }

    currentStack.push(node);
    setStack([...currentStack]); // copy to trigger render
    setLog((prev) => [...prev, `Pushed ${node} to stack`]);
    await sleep(500);
  };

  const runTopoSort = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLog([]);
    setStack([]);
    setVisited([]);

    const visitedSet = new Set();
    const currentStack = [];
    const nodes = Object.keys(graph);

    for (let node of nodes) {
      if (!visitedSet.has(node)) {
        await dfs(node, visitedSet, currentStack);
      }
    }

    setActiveNode(null);
    setIsRunning(false);
    setLog((prev) => [
      ...prev,
      "Sort Complete. Result is Stack (Top to Bottom)",
    ]);
  };

  const reset = () => {
    setStack([]);
    setVisited([]);
    setLog([]);
    setIsRunning(false);
    setActiveNode(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-orange-500">
        Topological Sort
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Linear ordering of vertices such that for
          every directed edge u-v, vertex u comes before v. (DFS approach).
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Vertices ka linear ordering jisme har
          directed edge u-v ke liye, vertex u vertex v se pehle aata hai.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={runTopoSort}
          disabled={isRunning}
          className="px-6 py-2 bg-orange-600 rounded hover:bg-orange-700 transition disabled:opacity-50"
        >
          Run Topo Sort
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
            {Object.keys(graph).map((from) =>
              graph[from].map((to) => (
                <line
                  key={`${from}-${to}`}
                  x1={nodePositions[from].x}
                  y1={nodePositions[from].y}
                  x2={nodePositions[to].x}
                  y2={nodePositions[to].y}
                  stroke="#4B5563"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              )),
            )}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="28"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
              </marker>
            </defs>
          </svg>

          {Object.keys(nodePositions).map((nodeId) => (
            <motion.div
              key={nodeId}
              className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl border-4 z-10 
                 ${activeNode === parseInt(nodeId) ? "bg-orange-600 border-white" : visited.includes(nodeId) || visited.includes(parseInt(nodeId)) ? "bg-gray-600 border-gray-400" : "bg-gray-800 border-orange-500"}
              `}
              style={{
                left: nodePositions[nodeId].x - 28,
                top: nodePositions[nodeId].y - 28,
              }}
            >
              {nodeId}
            </motion.div>
          ))}
        </div>

        {/* Stack & Result */}
        <div className="w-48 bg-gray-800 border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Result Stack</h3>
          <div className="flex flex-col-reverse w-full gap-2">
            {stack.map((val, i) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={i}
                className="w-full h-10 bg-orange-500 rounded flex items-center justify-center font-bold text-black"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Log */}
        <div className="w-64 bg-gray-800 border-2 border-gray-600 rounded-lg p-4 overflow-y-auto h-[500px]">
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

export default TopologicalSort;
