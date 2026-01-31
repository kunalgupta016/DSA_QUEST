import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const ReverseListVisualizer = () => {
  // 1 -> 2 -> 3 -> 4 -> 5
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [processing, setProcessing] = useState(false);

  const reverse = async () => {
    setProcessing(true);
    // Visual Reversal
    // Just animate the state flip for simplicity
    // ideally showing pointer reversal 1<-2<-3 etc.
    // For simple viz:
    let arr = [...list];
    arr.reverse();
    setList(arr);
    setProcessing(false);
  };

  const reset = () => {
    setList([1, 2, 3, 4, 5]);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-pink-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={reverse}
          disabled={processing}
          className="bg-pink-600 px-4 py-1 rounded font-bold text-sm"
        >
          Reverse
        </button>
        <button
          onClick={reset}
          className="bg-gray-600 px-4 py-1 rounded font-bold text-sm"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-2 justify-center items-center h-32">
        {list.map((val, i) => (
          <React.Fragment key={val}>
            <motion.div
              layout
              className="w-12 h-12 rounded-full border-2 border-pink-500 bg-gray-800 flex items-center justify-center font-bold text-xl"
            >
              {val}
            </motion.div>
            {i < list.length - 1 && (
              <span className="text-gray-500 text-2xl">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ReverseList = () => {
  const description = `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]
`;

  const initialCode = {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass
`,
    java: `class Solution {
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="206. Reverse Linked List"
      description={description}
      visualizer={ReverseListVisualizer}
      initialCode={initialCode}
    />
  );
};

export default ReverseList;
