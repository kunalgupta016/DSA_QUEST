import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const GenerateBinaryVisualizer = () => {
  const [n, setN] = useState(5);
  const [queue, setQueue] = useState(["1"]);
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("Queue initialized with '1'");
  const [processing, setProcessing] = useState(false);

  const generate = async () => {
    setProcessing(true);
    setQueue(["1"]);
    setResult([]);
    const q = ["1"];
    const res = [];

    for (let i = 0; i < n; i++) {
      const front = q.shift();
      setQueue([...q]);
      res.push(front);
      setResult([...res]);
      setMessage(`Dequeue '${front}' -> Add to Result.`);
      await new Promise((r) => setTimeout(r, 600));

      const s1 = front + "0";
      const s2 = front + "1";
      q.push(s1);
      q.push(s2);
      setQueue([...q]);
      setMessage(`Enqueue '${s1}' & '${s2}'`);
      await new Promise((r) => setTimeout(r, 600));
    }
    setMessage("✅ Generation Complete");
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-blue-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex gap-4 justify-center mb-8">
        <input
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          className="bg-gray-700 p-2 rounded text-white w-20"
        />
        <button
          onClick={generate}
          disabled={processing}
          className="bg-blue-600 px-4 py-2 rounded font-bold"
        >
          Generate
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-gray-700 p-2 rounded min-h-[80px]">
          <h3 className="text-center font-bold mb-2 text-xs">Queue</h3>
          <div className="flex gap-2 overflow-x-auto">
            {queue.map((val, i) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={`${val}-${i}`}
                className="bg-blue-600 px-2 py-1 rounded text-xs"
              >
                {val}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-gray-700 p-2 rounded min-h-[80px]">
          <h3 className="text-center font-bold mb-2 text-xs">Result</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {result.map((val, i) => (
              <span key={i} className="font-mono text-green-400">
                {val},{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded mt-2 text-xs">
        {message}
      </div>
    </div>
  );
};

const GenerateBinary = () => {
  const description = `Given a number N, generate all binary numbers from 1 to N.

Example 1:
Input: N = 2
Output: ["1", "10"]

Example 2:
Input: N = 5
Output: ["1", "10", "11", "100", "101"]

Constrains:
1 <= N <= 100
`;

  const initialCode = {
    javascript: `function generateBinary(n) {
    // Write your code here
    
}

// Test
console.log(generateBinary(5));
`,
    python: `def generate_binary(n):
    # Write your code here
    pass

# Test
print(generate_binary(5))
`,
    java: `import java.util.*;

class Main {
    public static void generateBinary(int n) {
        // Write your code here
        
    }
    
    public static void main(String[] args) {
        generateBinary(5);
    }
}`,
  };

  return (
    <ChallengeLayout
      title="Generate Binary Numbers"
      description={description}
      visualizer={GenerateBinaryVisualizer}
      initialCode={initialCode}
      expectedOutput=""
    />
  );
};

export default GenerateBinary;
