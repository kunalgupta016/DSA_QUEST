import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const MinStackVisualizer = () => {
  const [mainStack, setMainStack] = useState([]);
  const [minStack, setMinStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("Interact with the Min Stack");

  const push = () => {
    if (!inputValue) return;
    const val = parseInt(inputValue);

    // Update Main Stack
    const newMain = [...mainStack, val];
    setMainStack(newMain);

    // Update Min Stack
    let newMin = [...minStack];
    if (newMin.length === 0 || val <= newMin[newMin.length - 1]) {
      newMin.push(val);
    } else {
      newMin.push(newMin[newMin.length - 1]);
    }
    setMinStack(newMin);

    setInputValue("");
    setMessage(`Pushed ${val}`);
  };

  const pop = () => {
    if (mainStack.length === 0) {
      setMessage("Stack Underflow");
      return;
    }
    const newMain = [...mainStack];
    newMain.pop();
    setMainStack(newMain);

    const newMin = [...minStack];
    newMin.pop();
    setMinStack(newMin);
    setMessage("Popped top element");
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-green-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex gap-2 justify-center mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-gray-700 p-2 rounded text-white w-20 text-center"
          placeholder="#"
        />
        <button
          onClick={push}
          className="bg-green-600 px-3 py-1 rounded font-bold text-sm"
        >
          Push
        </button>
        <button
          onClick={pop}
          className="bg-red-600 px-3 py-1 rounded font-bold text-sm"
        >
          Pop
        </button>
      </div>

      <div className="flex gap-8 justify-center items-end h-64 mb-8">
        {/* Main Stack */}
        <div className="flex flex-col-reverse items-center bg-gray-700/50 w-20 h-full rounded-t-lg p-2 gap-1 border-x-4 border-b-4 border-gray-500 relative">
          {mainStack.map((val, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={i}
              className="w-full bg-blue-500 text-center py-1 rounded font-bold text-xs"
            >
              {val}
            </motion.div>
          ))}
          <span className="text-xs text-gray-400 absolute -bottom-6 w-max">
            Main Stack
          </span>
        </div>

        {/* Min Stack */}
        <div className="flex flex-col-reverse items-center bg-gray-700/50 w-20 h-full rounded-t-lg p-2 gap-1 border-x-4 border-b-4 border-yellow-600 relative">
          {minStack.map((val, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={i}
              className="w-full bg-yellow-600 text-center py-1 rounded font-bold text-xs"
            >
              {val}
            </motion.div>
          ))}
          <span className="text-xs text-yellow-500 absolute -bottom-6 w-max">
            Min Stack
          </span>
        </div>
      </div>

      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs">
        {message}
      </div>
    </div>
  );
};

const MinStack = () => {
  const description = `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.
`;

  const initialCode = {
    javascript: `
var MinStack = function() {
    
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    
};
`,
    python: `class MinStack:

    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass
`,
    java: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        return 0;
    }
    
    public int getMin() {
        return 0;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="155. Min Stack"
      description={description}
      visualizer={MinStackVisualizer}
      initialCode={initialCode}
    />
  );
};

export default MinStack;
