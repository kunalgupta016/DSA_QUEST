import React from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
// Import original visualizer logic as a separate component if we want to keep it.
// Or we can rebuild it inline or as a passed component.
// For this MVP, I will inline a simplified visualizer or just pass the logic.
// However, the previous ValidParentheses was a full page component.
// I will create a standard Visualizer Wrapper for it or rewrite it slightly to fit the prop.

import { useState } from "react";
import { motion } from "framer-motion";

const ValidParenthesesVisualizer = () => {
  const [input, setInput] = useState("({[]})");
  const [stack, setStack] = useState([]);
  const [message, setMessage] = useState("Enter string with () {} []");
  const [processing, setProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const check = async () => {
    setProcessing(true);
    setStack([]);
    setMessage("Starting...");
    const s = [];
    const map = { ")": "(", "}": "{", "]": "[" };

    for (let i = 0; i < input.length; i++) {
      setCurrentIndex(i);
      const char = input[i];

      if (["(", "{", "["].includes(char)) {
        s.push(char);
        setStack([...s]);
        setMessage(`Push opening bracket '${char}'`);
      } else if ([")", "}", "]"].includes(char)) {
        if (s.length === 0) {
          setMessage(`❌ Error: Stack empty, cannot pop for '${char}'`);
          setProcessing(false);
          return;
        }
        const top = s.pop();
        setStack([...s]);
        if (top !== map[char]) {
          setMessage(`❌ Error: '${char}' does not match '${top}'`);
          setProcessing(false);
          return;
        }
        setMessage(`✅ Match: '${top}' with '${char}'. Pop success.`);
      }
      await new Promise((r) => setTimeout(r, 800));
    }

    if (s.length === 0) {
      setMessage("✅ Valid Parentheses!");
    } else {
      setMessage("❌ Invalid: Stack not empty.");
    }
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
          className="bg-gray-700 p-2 rounded text-white bg-opacity-50 border border-gray-600 w-32"
        />
        <button
          onClick={check}
          disabled={processing}
          className="bg-green-600 px-3 py-1 rounded font-bold text-sm"
        >
          Visualize
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-8 text-2xl font-mono">
        {input.split("").map((char, i) => (
          <div
            key={i}
            className={`p-2 transition ${i === currentIndex ? "text-yellow-400 font-bold scale-125" : "text-gray-400"}`}
          >
            {char}
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse items-center bg-gray-700/50 w-24 h-64 mx-auto rounded-b-lg mb-4 p-2 gap-1 border-x-4 border-b-4 border-gray-500 overflow-hidden">
        {stack.map((val, i) => (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={i}
            className="w-full bg-blue-500 text-center py-1 rounded font-bold"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-sm">
        {message}
      </div>
    </div>
  );
};

const ValidParentheses = () => {
  const description = `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false`;

  const initialCode = {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Write your code here
    
};

// Test
console.log(isValid("()[]{}"));
`,
    python: `def isValid(s: str) -> bool:
    # Write your code here
    pass

# Test
print(isValid("()[]{}"))
`,
    java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()[]{}"));
    }
}`,
  };

  return (
    <ChallengeLayout
      title="20. Valid Parentheses"
      description={description}
      visualizer={ValidParenthesesVisualizer}
      initialCode={initialCode}
      expectedOutput="true"
    />
  );
};

export default ValidParentheses;
