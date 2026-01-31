import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const ReverseStringVisualizer = () => {
  const [input, setInput] = useState("hello");
  const [stack, setStack] = useState([]);
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("Click Reverse to start.");
  const [processing, setProcessing] = useState(false);

  const reverse = async () => {
    setProcessing(true);
    setStack([]);
    setOutput("");
    setMessage("Pushing characters to stack...");

    // Push Phase
    let currentStack = [];
    for (let char of input) {
      currentStack.push(char);
      setStack([...currentStack]);
      await new Promise((r) => setTimeout(r, 400));
    }

    setMessage("Popping characters from stack...");
    await new Promise((r) => setTimeout(r, 600));

    // Pop Phase
    let reversed = "";
    while (currentStack.length > 0) {
      const char = currentStack.pop();
      setStack([...currentStack]);
      reversed += char;
      setOutput(reversed);
      await new Promise((r) => setTimeout(r, 400));
    }

    setMessage("✅ String Reversed!");
    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-green-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex gap-2 justify-center mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-700 p-2 rounded text-white w-32 text-center"
        />
        <button
          onClick={reverse}
          disabled={processing}
          className="bg-green-600 px-3 py-1 rounded font-bold text-sm"
        >
          Reverse
        </button>
      </div>

      <div className="flex gap-8 justify-center items-end h-64 mb-4">
        {/* Stack Visualization */}
        <div className="flex flex-col-reverse items-center bg-gray-700/50 w-16 h-full rounded-t-lg p-2 gap-1 border-x-4 border-b-4 border-gray-500">
          {stack.map((val, i) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className="w-full bg-blue-500 text-center py-1 rounded font-bold text-xs"
            >
              {val}
            </motion.div>
          ))}
          <span className="text-xs text-gray-400 mt-2 absolute -bottom-6">
            Stack
          </span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-400 mb-1">Output</div>
        <div className="text-2xl font-mono text-yellow-400 bg-gray-800 p-2 rounded inline-block min-w-[100px]">
          {output}
        </div>
      </div>

      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs mt-4">
        {message}
      </div>
    </div>
  );
};

const ReverseString = () => {
  const description = `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
`;

  const initialCode = {
    javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        pass
`,
    java: `class Solution {
    public void reverseString(char[] s) {
        
    }
}`,
  };

  return (
    <ChallengeLayout
      title="344. Reverse String"
      description={description}
      visualizer={ReverseStringVisualizer}
      initialCode={initialCode}
    />
  );
};

export default ReverseString;
