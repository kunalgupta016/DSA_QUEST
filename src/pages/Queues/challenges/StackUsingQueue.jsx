import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

// Simple visualization: showing one main queue (or two if implementing that variant)
const StackUsingQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(
    "Simulating Stack behavior using Queue ops",
  );

  const push = () => {
    // To mimic stack push using queue (often push is expensive or pop is expensive)
    // Let's visualize Push O(n) variant:
    // Enqueue x, then rotate all previous elements to back
    if (!inputValue) return;
    const val = parseInt(inputValue);

    let q = [...queue];
    q.push(val); // Enqueue
    // Rotation visual is hard instantly, so we just show final state implies stack order
    // But for visualizer, let's just show the queue state used as stack

    // Actually, to make it educational, let's just maintain the list
    // and show it behaves LIFO but strictly typically stored.
    // If we use 1 queue, elements are rotated.

    // Let's simpler: Just array.
    // [1, 2, 3] -> Push 4 -> [4, 1, 2, 3] (conceptually if Push is O(n))
    // or [1, 2, 3, 4] and Pop rotates n-1 items then deqeue?

    // Visualizing Push O(n):
    q = [val, ...queue]; // This simulates the result of the rotation
    setQueue(q);
    setInputValue("");
    setMessage(`Pushed ${val}. (Rotated to front)`);
  };

  const pop = () => {
    if (queue.length === 0) return;
    const q = [...queue];
    q.shift(); // Dequeue front (which is stack top)
    setQueue(q);
    setMessage("Popped top element.");
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-blue-400 text-center mb-4">
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
          className="bg-blue-600 px-3 py-1 rounded font-bold text-sm"
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

      <div className="bg-gray-800 p-4 rounded min-h-[100px] flex items-center justify-center">
        <div className="flex gap-2">
          <span className="text-gray-500 mr-2 flex items-center font-bold">
            FRONT
          </span>
          {queue.map((val, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={`${val}-${i}`}
              className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded font-bold"
            >
              {val}
            </motion.div>
          ))}
          <span className="text-gray-500 ml-2 flex items-center font-bold">
            REAR
          </span>
        </div>
      </div>
      <div className="text-center text-yellow-300 font-mono bg-black/30 p-2 rounded text-xs mt-4">
        {message}
      </div>
    </div>
  );
};

const StackUsingQueue = () => {
  const description = `Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support normal stack operations (push, top, pop, and empty).

Implement the MyStack class:
- void push(int x) Pushes element x to the top of the stack.
- int pop() Removes the element on the top of the stack and returns it.
- int top() Returns the element on the top of the stack.
- boolean empty() Returns true if the stack is empty, false otherwise.
`;

  const initialCode = {
    javascript: `
var MyStack = function() {
    
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    
};
`,
    python: `class MyStack:

    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def top(self) -> int:
        pass

    def empty(self) -> bool:
        pass
`,
    java: `class MyStack {

    public MyStack() {
        
    }
    
    public void push(int x) {
        
    }
    
    public int pop() {
        return 0;
    }
    
    public int top() {
        return 0;
    }
    
    public boolean empty() {
        return false;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="225. Implement Stack using Queues"
      description={description}
      visualizer={StackUsingQueueVisualizer}
      initialCode={initialCode}
    />
  );
};

export default StackUsingQueue;
