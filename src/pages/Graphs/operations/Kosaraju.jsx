import React, { useState } from "react";
import { motion } from "framer-motion";

const Kosaraju = () => {
  // Graph Data
  const graph = {
    0: [1],
    1: [2],
    2: [0, 3],
    3: [4],
    4: [5, 7],
    5: [6],
    6: [4, 7],
    7: [],
  };

  const reversedGraph = {
    0: [2],
    1: [0],
    2: [1],
    3: [2],
    4: [3, 6],
    5: [4],
    6: [5],
    7: [4, 6],
  };

  const nodePositions = {
    0: { x: 100, y: 100 },
    1: { x: 250, y: 100 },
    2: { x: 175, y: 200 },
    3: { x: 350, y: 200 },
    4: { x: 500, y: 200 },
    5: { x: 650, y: 100 },
    6: { x: 650, y: 300 },
    7: { x: 800, y: 200 },
  };

  const [activeNode, setActiveNode] = useState(null);
  const [visited, setVisited] = useState([]); // for current pass
  const [stack, setStack] = useState([]);
  const [sccs, setSccs] = useState([]); // Array of arrays
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pass, setPass] = useState(0); // 0: Idle, 1: First Pass, 2: Second Pass

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Regular DFS for Pass 1
  const dfs1 = async (node, visitedSet, stackRef) => {
    visitedSet.add(String(node));
    setVisited(Array.from(visitedSet));
    setActiveNode(parseInt(node));
    setLog((prev) => [...prev, `Pass 1: Visiting ${node}`]);
    await sleep(400);

    const neighbors = graph[node] || [];
    for (let neighbor of neighbors) {
      if (!visitedSet.has(String(neighbor))) {
        await dfs1(neighbor, visitedSet, stackRef);
      }
    }
    stackRef.push(node);
    setStack([...stackRef]);
    await sleep(200);
  };

  // DFS on Transpose Graph for Pass 2
  const dfs2 = async (node, visitedSet, component) => {
    visitedSet.add(String(node));
    component.push(parseInt(node));
    setActiveNode(parseInt(node));
    // Update visual SCCs immediately so they colorize
    setSccs((prev) => {
      // Remove potential partial component if it exists?
      // Actually just appending to the last one or creating new is tricky with state updates in recursion.
      // We'll rely on a fresh render of 'sccs' from the main loop,
      // but specifically here we might want to see it grow.
      // For simplicity, we won't visualize the "growing" component inside the state until the DFS returns or we use a separate "currentSCC" state.
      return prev;
    });
    setLog((prev) => [...prev, `Pass 2: Found ${node} in SCC`]);
    await sleep(500);

    const neighbors = reversedGraph[node] || [];
    for (let neighbor of neighbors) {
      if (!visitedSet.has(String(neighbor))) {
        await dfs2(neighbor, visitedSet, component);
      }
    }
  };

  const runKosaraju = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLog([]);
    setStack([]);
    setSccs([]);
    setVisited([]);

    // --- PASS 1 ---
    setPass(1);
    setLog((prev) => [...prev, "--- Start Pass 1: Fill Queue ---"]);
    const visitedSet1 = new Set();
    const stackRef = [];

    for (let node of Object.keys(graph)) {
      if (!visitedSet1.has(node)) {
        await dfs1(node, visitedSet1, stackRef);
      }
    }

    setLog((prev) => [...prev, "Pass 1 Complete. Transposing Graph..."]);
    await sleep(1000);

    // --- PASS 2 ---
    setPass(2);
    setVisited([]); // Reset visual visited for pass 2
    setActiveNode(null);
    const visitedSet2 = new Set();
    const finalSCCs = [];

    // Process stack in reverse (LIFO)
    while (stackRef.length > 0) {
      const node = stackRef.pop();
      setStack([...stackRef]); // update visual stack

      if (!visitedSet2.has(String(node))) {
        setLog((prev) => [...prev, `Start SCC Search from ${node}`]);
        const component = [];
        await dfs2(node, visitedSet2, component);
        finalSCCs.push(component);
        setSccs([...finalSCCs]); // Update state to show colors
        await sleep(500);
      }
    }

    setLog((prev) => [
      ...prev,
      "Kosaraju Complete. Found " + finalSCCs.length + " SCCs.",
    ]);
    setActiveNode(null);
    setIsRunning(false);
    setPass(0);
  };

  const reset = () => {
    setStack([]);
    setSccs([]);
    setVisited([]);
    setLog([]);
    setIsRunning(false);
    setPass(0);
    setActiveNode(null);
  };

  // Helper to colorize SCCs
  const getNodeColor = (nodeId) => {
    if (pass === 2) {
      // check if in sccs
      const sccIndex = sccs.findIndex((comp) =>
        comp.includes(parseInt(nodeId)),
      );
      if (sccIndex !== -1) {
        // Cycle through some colors
        const colors = [
          "bg-red-500",
          "bg-green-500",
          "bg-purple-500",
          "bg-yellow-500",
        ];
        return colors[sccIndex % colors.length];
      }
    }
    // Default behaviors
    if (activeNode === parseInt(nodeId)) return "bg-blue-500";
    if (visited.includes(String(nodeId))) return "bg-gray-500";

    return "bg-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-teal-500">
        Kosaraju's Algorithm
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Finds Strongly Connected Components (SCCs).{" "}
          <br /> Pass 1: DFS to get finish times (Stack). <br /> Pass 2: DFS on
          Transpose Graph popping from Stack.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Strongly Connected Components (SCCs)
          dhundta hai. <br /> Pass 1: DFS se finish times milte hain (Stack).{" "}
          <br /> Pass 2: Stack se pop karke Transpose Graph par DFS chalta hai.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={runKosaraju}
          disabled={isRunning}
          className="px-6 py-2 bg-teal-600 rounded hover:bg-teal-700 transition disabled:opacity-50"
        >
          Run Kosaraju
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
          {/* Draw edges based on Pass. Pass 1 = Normal, Pass 2 = Transpose for better visualization? 
                 Actually keeping original arrows is less confusing, but explaining traversal goes against arrows.
                 Let's keep original arrows. */}
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
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 z-10 
                 ${getNodeColor(nodeId)} border-white
              `}
              style={{
                left: nodePositions[nodeId].x - 24,
                top: nodePositions[nodeId].y - 24,
              }}
            >
              {nodeId}
            </motion.div>
          ))}
        </div>

        {/* Stack & Info */}
        <div className="w-48 bg-gray-800 border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Stack</h3>
          <div className="flex flex-col-reverse w-full gap-2 overflow-y-auto">
            {stack.map((val, i) => (
              <div
                key={i}
                className="w-full h-8 bg-teal-500 rounded flex items-center justify-center font-bold text-black"
              >
                {val}
              </div>
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

export default Kosaraju;
