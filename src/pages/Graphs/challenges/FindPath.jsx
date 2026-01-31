import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const FindPathVisualizer = () => {
  const [message, setMessage] = useState(
    "Find path from Node 0 to Node 4 using BFS.",
  );
  const [path, setPath] = useState([]);
  const [visited, setVisited] = useState(new Set());
  const [processing, setProcessing] = useState(false);

  const graph = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };

  const runBFS = async () => {
    setProcessing(true);
    setVisited(new Set());
    setPath([]);
    let q = [[0]];
    const visitedSet = new Set([0]);
    setVisited(new Set(visitedSet));

    while (q.length > 0) {
      const currentPath = q.shift();
      const node = currentPath[currentPath.length - 1];
      setMessage(`Visiting: ${node}`);
      setPath(currentPath);
      await new Promise((r) => setTimeout(r, 600));

      if (node === 4) {
        setMessage(`✅ Target 4 Found! Path: [${currentPath.join("->")}]`);
        setProcessing(false);
        return;
      }

      for (let neighbor of graph[node]) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          setVisited(new Set(visitedSet));
          q.push([...currentPath, neighbor]);
        }
      }
    }
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-purple-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex justify-center mb-4">
        <button
          onClick={runBFS}
          disabled={processing}
          className="bg-purple-600 px-4 py-1 rounded font-bold text-sm"
        >
          Find Path (0-4)
        </button>
      </div>

      <div className="relative h-[250px] bg-gray-900 border border-gray-700 rounded mb-4">
        <svg className="absolute w-full h-full">
          <line
            x1="80"
            y1="50"
            x2="180"
            y2="50"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="50"
            x2="280"
            y2="50"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="80"
            y1="150"
            x2="180"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="150"
            x2="280"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="80"
            y1="50"
            x2="80"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="180"
            y1="50"
            x2="180"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
          <line
            x1="280"
            y1="50"
            x2="280"
            y2="150"
            stroke="gray"
            strokeWidth="2"
          />
        </svg>
        {[
          { id: 0, x: 80, y: 50 },
          { id: 1, x: 180, y: 50 },
          { id: 2, x: 280, y: 50 },
          { id: 3, x: 80, y: 150 },
          { id: 4, x: 180, y: 150 },
          { id: 5, x: 280, y: 150 },
        ].map((n) => (
          <motion.div
            key={n.id}
            animate={{
              backgroundColor: path.includes(n.id)
                ? "#9333ea"
                : visited.has(n.id)
                  ? "#4b5563"
                  : "#1f2937",
              scale: path.includes(n.id) ? 1.2 : 1,
            }}
            className="absolute w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center font-bold text-lg z-10"
            style={{ left: n.x - 20, top: n.y - 20 }}
          >
            {n.id}
          </motion.div>
        ))}
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs">
        {message}
      </div>
    </div>
  );
};

const FindPath = () => {
  const description = `Given a graph, determine if there is a valid path from source to destination.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
`;

  const initialCode = {
    javascript: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function(n, edges, source, destination) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        pass
`,
    java: `class Solution {
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        return false;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="1971. Find if Path Exists in Graph"
      description={description}
      visualizer={FindPathVisualizer}
      initialCode={initialCode}
    />
  );
};

export default FindPath;
