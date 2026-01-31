import React, { useState } from "react";
import { motion } from "framer-motion";

const Dijkstra = () => {
  // Weighted graph: 0 -> 1 (4), 0 -> 2 (1) ...
  const graph = {
    0: { 1: 4, 2: 1 },
    1: { 3: 1 },
    2: { 1: 2, 3: 5 },
    3: {},
  };

  const nodePositions = {
    0: { x: 100, y: 200 },
    1: { x: 300, y: 100 },
    2: { x: 300, y: 300 },
    3: { x: 500, y: 200 },
  };

  const [distances, setDistances] = useState({
    0: 0,
    1: Infinity,
    2: Infinity,
    3: Infinity,
  });
  const [visited, setVisited] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runDijkstra = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLog([]);
    const dist = { 0: 0, 1: Infinity, 2: Infinity, 3: Infinity };
    const prev = {};
    const unvisited = new Set(["0", "1", "2", "3"]);
    setDistances({ ...dist });
    setVisited([]);

    while (unvisited.size > 0) {
      // Find node with min distance in unvisited
      let minNode = null;
      let minVal = Infinity;
      for (let node of unvisited) {
        if (dist[node] < minVal) {
          minVal = dist[node];
          minNode = node;
        }
      }

      if (minNode === null || dist[minNode] === Infinity) break;

      setActiveNode(minNode);
      setLog((prevLog) => [
        ...prevLog,
        `Visiting Node ${minNode} (Dist: ${dist[minNode]})`,
      ]);
      await sleep(1000);

      // Relax neighbors
      const neighbors = graph[minNode];
      for (let neighbor in neighbors) {
        if (unvisited.has(neighbor)) {
          const newDist = dist[minNode] + neighbors[neighbor];
          if (newDist < dist[neighbor]) {
            dist[neighbor] = newDist;
            prev[neighbor] = minNode;
            setDistances({ ...dist });
            setLog((prevLog) => [
              ...prevLog,
              `  Updated Node ${neighbor}: ${newDist}`,
            ]);
            await sleep(800);
          }
        }
      }

      unvisited.delete(minNode);
      setVisited((prevVisited) => [...prevVisited, parseInt(minNode)]);
    }

    setActiveNode(null);
    setIsRunning(false);
    setLog((prevLog) => [...prevLog, "Algorithm Complete"]);
  };

  const reset = () => {
    setDistances({ 0: 0, 1: Infinity, 2: Infinity, 3: Infinity });
    setVisited([]);
    setActiveNode(null);
    setLog([]);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-500">
        Dijkstra's Algorithm
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Finds the shortest paths from a source node
          to all other nodes in a weighted graph (non-negative weights).
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Weighted graph mein source node se baaki
          sabhi nodes tak ka shortest path dhundta hai (non-negative weights
          honi chahiye).
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={runDijkstra}
          disabled={isRunning}
          className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Run Dijkstra
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
              Object.keys(graph[from]).map((to) => (
                <g key={`${from}-${to}`}>
                  <line
                    x1={nodePositions[from].x}
                    y1={nodePositions[from].y}
                    x2={nodePositions[to].x}
                    y2={nodePositions[to].y}
                    stroke="#4B5563"
                    strokeWidth="2"
                  />
                  {/* Weight Label */}
                  <text
                    x={(nodePositions[from].x + nodePositions[to].x) / 2}
                    y={(nodePositions[from].y + nodePositions[to].y) / 2 - 10}
                    fill="white"
                    fontSize="14"
                    textAnchor="middle"
                  >
                    {graph[from][to]}
                  </text>
                </g>
              )),
            )}
          </svg>

          {Object.keys(nodePositions).map((nodeId) => (
            <motion.div
              key={nodeId}
              className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-sm border-4 z-10 
                ${activeNode === nodeId ? "border-white bg-blue-600" : visited.includes(parseInt(nodeId)) ? "border-blue-300 bg-blue-900" : "border-gray-500 bg-gray-700"}
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

export default Dijkstra;
