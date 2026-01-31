import React, { useState } from "react";
import ChallengeLayout from "../../Challenges/ChallengeLayout";
import { motion } from "framer-motion";

const MergeSortedVisualizer = () => {
  // List A: 1, 2, 4
  // List B: 1, 3, 4
  const [result, setResult] = useState([]);
  const [idxA, setIdxA] = useState(0);
  const [idxB, setIdxB] = useState(0);
  const [processing, setProcessing] = useState(false);

  const listA = [1, 2, 4];
  const listB = [1, 3, 4];

  const merge = async () => {
    setProcessing(true);
    setResult([]);
    setIdxA(0);
    setIdxB(0);

    let i = 0,
      j = 0;
    let res = [];

    while (i < listA.length && j < listB.length) {
      setIdxA(i);
      setIdxB(j);
      await new Promise((r) => setTimeout(r, 600));

      if (listA[i] <= listB[j]) {
        res.push(listA[i]);
        i++;
      } else {
        res.push(listB[j]);
        j++;
      }
      setResult([...res]);
    }

    while (i < listA.length) {
      setIdxA(i);
      res.push(listA[i]);
      i++;
      setResult([...res]);
      await new Promise((r) => setTimeout(r, 400));
    }

    while (j < listB.length) {
      setIdxB(j);
      res.push(listB[j]);
      j++;
      setResult([...res]);
      await new Promise((r) => setTimeout(r, 400));
    }

    setProcessing(false);
  };

  return (
    <div className="p-4 bg-gray-900 h-full overflow-y-auto">
      <h3 className="text-xl font-bold text-pink-400 text-center mb-4">
        Visualizer Mode
      </h3>
      <div className="flex justify-center mb-6">
        <button
          onClick={merge}
          disabled={processing}
          className="bg-pink-600 px-4 py-1 rounded font-bold text-sm"
        >
          Merge
        </button>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold w-8">L1:</span>
          {listA.map((val, i) => (
            <div
              key={i}
              className={`w-10 h-10 border rounded flex items-center justify-center ${i === idxA && processing ? "bg-yellow-600" : "bg-gray-800"}`}
            >
              {val}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold w-8">L2:</span>
          {listB.map((val, i) => (
            <div
              key={i}
              className={`w-10 h-10 border rounded flex items-center justify-center ${i === idxB && processing ? "bg-yellow-600" : "bg-gray-800"}`}
            >
              {val}
            </div>
          ))}
        </div>

        <div className="w-full border-t border-gray-700 my-2"></div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold w-8">Res:</span>
          {result.map((val, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={i}
              className="w-10 h-10 border border-green-500 rounded flex items-center justify-center bg-gray-800"
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MergeSorted = () => {
  const description = `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
`;

  const initialCode = {
    javascript: `/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Write your code here
    
};
`,
    python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        pass
`,
    java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`,
  };

  return (
    <ChallengeLayout
      title="21. Merge Two Sorted Lists"
      description={description}
      visualizer={MergeSortedVisualizer}
      initialCode={initialCode}
    />
  );
};

export default MergeSorted;
