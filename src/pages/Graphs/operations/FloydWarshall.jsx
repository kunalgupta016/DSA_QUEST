import React, { useState } from "react";

const FloydWarshall = () => {
  const initialDist = [
    [0, 5, Infinity, 10],
    [Infinity, 0, 3, Infinity],
    [Infinity, Infinity, 0, 1],
    [Infinity, Infinity, Infinity, 0],
  ];

  const [matrix, setMatrix] = useState(initialDist);
  const [log, setLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [highlight, setHighlight] = useState({ k: -1, i: -1, j: -1 });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runFloydWarshall = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLog([]);

    // Deep copy
    const dist = initialDist.map((row) => [...row]);
    setMatrix(dist);
    const V = 4;

    for (let k = 0; k < V; k++) {
      setLog((prev) => [...prev, `Processing intermediate node ${k}`]);
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          setHighlight({ k, i, j });
          await sleep(100);

          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            const oldDist = dist[i][j];
            dist[i][j] = dist[i][k] + dist[k][j];
            setMatrix(dist.map((r) => [...r])); // update state
            setLog((prev) => [
              ...prev,
              `Updated dist[${i}][${j}]: ${oldDist} -> ${dist[i][j]}`,
            ]);
            await sleep(300);
          }
        }
      }
    }
    setHighlight({ k: -1, i: -1, j: -1 });
    setIsRunning(false);
    setLog((prev) => [...prev, "Algorithm Complete"]);
  };

  const reset = () => {
    setMatrix([
      [0, 5, Infinity, 10],
      [Infinity, 0, 3, Infinity],
      [Infinity, Infinity, 0, 1],
      [Infinity, Infinity, Infinity, 0],
    ]);
    setLog([]);
    setIsRunning(false);
    setHighlight({ k: -1, i: -1, j: -1 });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-8 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">
        Floyd-Warshall Algorithm
      </h1>
      <div className="mb-8 text-center max-w-3xl space-y-4">
        <p className="text-gray-300">
          <strong>English:</strong> Computes all-pairs shortest paths.
        </p>
        <p className="text-gray-400 italic">
          <strong>Hinglish:</strong> Sabhi nodes ke beech ka shortest path
          nikalta hai (All-pairs).
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={runFloydWarshall}
          disabled={isRunning}
          className="px-6 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition disabled:opacity-50"
        >
          Run Floyd-Warshall
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
        {/* Matrix Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-800 border-2 border-gray-600 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Distance Matrix</h3>
          <div className="grid grid-cols-4 gap-2">
            {matrix.map((row, i) =>
              row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-16 h-16 flex items-center justify-center border-2 text-lg font-bold
                                ${
                                  highlight.i === i && highlight.j === j
                                    ? "bg-green-600 border-green-300"
                                    : (highlight.i === i &&
                                          highlight.k === j) ||
                                        (highlight.k === i && highlight.j === j)
                                      ? "bg-blue-600 border-blue-300"
                                      : "bg-gray-700 border-gray-500"
                                }
                            `}
                >
                  {val === Infinity ? "∞" : val}
                </div>
              )),
            )}
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            i: Row, j: Column. Green = Target, Blue = Intermediate Sources
          </div>
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

export default FloydWarshall;
