import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const NumIslandsVisualizer = () => {
  // Grid: 1 = Land, 0 = Water
  // [
  //  ["1","1","0","0","0"],
  //  ["1","1","0","0","0"],
  //  ["0","0","1","0","0"],
  //  ["0","0","0","1","1"]
  // ]
  const initialGrid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  const [visited, setVisited] = useState(new Set());
  const [count, setCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [currentCell, setCurrentCell] = useState(null);

  const solve = async () => {
    setProcessing(true);
    setVisited(new Set());
    setCount(0);
    let c = 0;
    let visitedSet = new Set();

    const rows = 4,
      cols = 5;

    const bfs = async (r, col) => {
      let q = [[r, col]];
      visitedSet.add(`${r},${col}`);
      setVisited(new Set(visitedSet));

      while (q.length > 0) {
        const [cr, cc] = q.shift();
        setCurrentCell([cr, cc]);
        await new Promise((r) => setTimeout(r, 200));

        const dirs = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ];
        for (let [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            initialGrid[nr][nc] === "1" &&
            !visitedSet.has(`${nr},${nc}`)
          ) {
            visitedSet.add(`${nr},${nc}`);
            setVisited(new Set(visitedSet));
            q.push([nr, nc]);
          }
        }
      }
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (initialGrid[i][j] === "1" && !visitedSet.has(`${i},${j}`)) {
          c++;
          setCount(c);
          await bfs(i, j);
        }
      }
    }

    setCurrentCell(null);
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto text-center">
      <h3 className="text-xl font-bold text-purple-400 mb-4">
        Visualizer Mode
      </h3>
      <button
        onClick={solve}
        disabled={processing}
        className="bg-purple-600 px-4 py-2 rounded font-bold mb-4"
      >
        Count Islands
      </button>
      <div className="text-2xl font-bold mb-4 text-green-400">
        Islands: {count}
      </div>

      <div className="grid grid-cols-5 gap-1 w-fit mx-auto bg-gray-800 p-2 border border-gray-600">
        {initialGrid.map((row, i) =>
          row.map((val, j) => {
            const isLand = val === "1";
            const isVisited = visited.has(`${i},${j}`);
            const isCurrent =
              currentCell && currentCell[0] === i && currentCell[1] === j;

            return (
              <motion.div
                key={`${i}-${j}`}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isCurrent
                    ? "#fbbf24"
                    : isVisited
                      ? "#10b981"
                      : isLand
                        ? "#d1d5db"
                        : "#1f2937",
                }}
                className={`w-10 h-10 flex items-center justify-center font-bold text-black border border-gray-700
                                    ${!isLand && "text-gray-600"}
                                `}
              >
                {val}
              </motion.div>
            );
          }),
        )}
      </div>
    </div>
  );
};

const NumIslands = () => {
  const description = `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
`;

  const initialCode = {
    javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        pass
`,
    java: `class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="200. Number of Islands"
      description={description}
      visualizer={NumIslandsVisualizer}
      initialCode={initialCode}
    />
  );
};

export default NumIslands;
