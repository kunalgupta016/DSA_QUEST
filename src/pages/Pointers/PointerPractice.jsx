import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const problems = [
  // --- ORIGINAL BASIC PROBLEMS ---
  {
    id: 1,
    title: "Pointer Declaration",
    difficulty: "Easy",
    description:
      "Declare an integer variable `x` with value 10, then declare a pointer `p` that points to `x`.",
    starterCode: `void solve() {
    int x = 10;
    // Declare pointer 'p' here
    
}`,
    solution: `void solve() {
    int x = 10;
    int* p = &x;
}`,
    check: (code) => {
      if (!code.match(/int\s*\*\s*p/))
        return { valid: false, msg: "❌ Declare pointer 'p' (int* p)" };
      if (!code.includes("&x"))
        return { valid: false, msg: "❌ Assign address of 'x' using '&x'" };
      return { valid: true, msg: "✅ Correct! Pointer declared." };
    },
  },
  {
    id: 2,
    title: "Dereferencing",
    difficulty: "Easy",
    description:
      "Update the value of `x` to 20 using the pointer `p`. Do NOT use `x = 20` directly.",
    starterCode: `void solve() {
    int x = 10;
    int* p = &x;
    // Change value of x using p
    
}`,
    solution: `void solve() {
    int x = 10;
    int* p = &x;
    *p = 20;
}`,
    check: (code) => {
      if (!code.includes("*p"))
        return { valid: false, msg: "❌ Use '*p' to dereference" };
      if (!code.match(/\*p\s*=\s*20/))
        return { valid: false, msg: "❌ Assign 20 to *p" };
      if (code.includes("x = 20") || code.includes("x=20"))
        return { valid: false, msg: "❌ Don't use 'x = 20' directly!" };
      return { valid: true, msg: "✅ Correct! Value updated via pointer." };
    },
  },
  {
    id: 3,
    title: "Null Pointer",
    difficulty: "Easy",
    description:
      "Initialize a pointer `ptr` to `NULL` (or `nullptr`) to ensure it doesn't point to garbage memory.",
    starterCode: `void solve() {
    // Declare ptr and strict it to NULL
    
}`,
    solution: `void solve() {
    int* ptr = NULL; // or nullptr
}`,
    check: (code) => {
      if (!code.match(/int\s*\*\s*ptr/))
        return { valid: false, msg: "❌ Declare 'int* ptr'" };
      if (
        !code.includes("NULL") &&
        !code.includes("nullptr") &&
        !code.includes("0")
      )
        return { valid: false, msg: "❌ Initialize to NULL or nullptr" };
      return { valid: true, msg: "✅ Correct! Safe initialization." };
    },
  },

  // --- USER SPECIFIC PROBLEMS (Strict Validation Added) ---
  {
    id: 4,
    title: "Swap Two Numbers",
    difficulty: "Easy",
    description:
      "Write a function `swap(int* a, int* b)` that swaps the values of two integers using pointers.",
    starterCode: `void swap(int* a, int* b) {
    // Write code to swap values using *a and *b
    
}`,
    solution: `void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    check: (code) => {
      if (!code.match(/int\s+temp\s*=/))
        return {
          valid: false,
          msg: "❌ Store '*a' in a temporary variable first",
        };
      if (!code.match(/\*a\s*=\s*\*b/))
        return { valid: false, msg: "❌ Assign '*b' to '*a'" };
      if (!code.match(/\*b\s*=\s*temp/))
        return { valid: false, msg: "❌ Assign 'temp' to '*b'" };
      return { valid: true, msg: "✅ Correct! Values swapped." };
    },
  },
  {
    id: 5,
    title: "Reverse Array",
    difficulty: "Medium",
    description:
      "Reverse an array using two pointers (start and end). Loop until start < end.",
    starterCode: `void reverse(int arr[], int n) {
    int* start = arr;
    int* end = arr + n - 1;
    
    // Loop while start < end
}`,
    solution: `void reverse(int arr[], int n) {
    int* start = arr;
    int* end = arr + n - 1;
    while(start < end) {
        int temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}`,
    check: (code) => {
      if (!code.includes("while"))
        return { valid: false, msg: "❌ Use a 'while' loop" };
      if (!code.match(/start\s*<\s*end/))
        return { valid: false, msg: "❌ Check 'start < end' condition" };
      if (!code.includes("temp"))
        return { valid: false, msg: "❌ Use swap logic (temp)" };
      if (!code.includes("start++"))
        return { valid: false, msg: "❌ Increment 'start'" };
      if (!code.includes("end--"))
        return { valid: false, msg: "❌ Decrement 'end'" };
      return { valid: true, msg: "✅ Correct! Array reversed in-place." };
    },
  },
  {
    id: 6,
    title: "String Length",
    difficulty: "Easy",
    description:
      "Find string length using a pointer. Increment pointer until it hits '\\0'. DO NOT use `strlen`.",
    starterCode: `int getLength(char* str) {
    int count = 0;
    // Iterate using pointer
    
    return count;
}`,
    solution: `int getLength(char* str) {
    int count = 0;
    while (*str != '\\0') {
        count++;
        str++;
    }
    return count;
}`,
    check: (code) => {
      if (!code.includes("while"))
        return { valid: false, msg: "❌ Use a loop" };
      if (!code.includes("*str"))
        return { valid: false, msg: "❌ Check character value (*str)" };
      if (!code.includes("str++"))
        return { valid: false, msg: "❌ Move pointer (str++)" };
      if (!code.includes("count++"))
        return { valid: false, msg: "❌ Increment count" };
      return { valid: true, msg: "✅ Correct! Length calculated." };
    },
  },
  {
    id: 7,
    title: "String Copy",
    difficulty: "Medium",
    description:
      "Copy source string to destination using pointers. DO NOT use `strcpy`.",
    starterCode: `void copyString(char* src, char* dest) {
    // Copy character by character
    
}`,
    solution: `void copyString(char* src, char* dest) {
    while (*src != '\\0') {
        *dest = *src;
        src++;
        dest++;
    }
    *dest = '\\0';
}`,
    check: (code) => {
      if (!code.includes("while"))
        return { valid: false, msg: "❌ Use a loop" };
      if (!code.match(/\*dest\s*=\s*\*src/))
        return { valid: false, msg: "❌ Copy char: *dest = *src" };
      if (!code.includes("src++") || !code.includes("dest++"))
        return { valid: false, msg: "❌ Increment both pointers" };
      if (!code.match(/\*dest\s*=\s*'\\0'/))
        return { valid: false, msg: "❌ Null terminate destination string" };
      return { valid: true, msg: "✅ Correct! String copied." };
    },
  },
  {
    id: 8,
    title: "Compare Strings",
    difficulty: "Medium",
    description:
      "Compare two strings using pointers. Return 0 if equal, non-zero otherwise. DO NOT use `strcmp`.",
    starterCode: `int compare(char* s1, char* s2) {
    
}`,
    solution: `int compare(char* s1, char* s2) {
    while (*s1 && (*s1 == *s2)) {
        s1++;
        s2++;
    }
    return *(const unsigned char*)s1 - *(const unsigned char*)s2;
}`,
    check: (code) => {
      if (!code.includes("while"))
        return { valid: false, msg: "❌ Use a loop" };
      if (!code.match(/\*s1\s*==\s*\*s2/))
        return { valid: false, msg: "❌ Compare characters (*s1 == *s2)" };
      if (!code.includes("s1++") || !code.includes("s2++"))
        return { valid: false, msg: "❌ Increment pointers" };
      return { valid: true, msg: "✅ Correct! Comparison logic valid." };
    },
  },
  {
    id: 9,
    title: "Max Element",
    difficulty: "Easy",
    description: "Find maximum element in an array using pointers.",
    starterCode: `int findMax(int* arr, int n) {
    int maxVal = *arr;
    
    return maxVal;
}`,
    solution: `int findMax(int* arr, int n) {
    int maxVal = *arr;
    for (int i = 1; i < n; i++) {
        if (*(arr + i) > maxVal) {
            maxVal = *(arr + i);
        }
    }
    return maxVal;
}`,
    check: (code) => {
      if (!code.includes("for") && !code.includes("while"))
        return { valid: false, msg: "❌ Use a loop" };
      if (!code.match(/if\s*\(.*>\s*maxVal\)/))
        return { valid: false, msg: "❌ Check if value > maxVal" };
      if (!code.includes("*(arr") && !code.includes("arr["))
        return { valid: false, msg: "❌ Access array elements" };
      return { valid: true, msg: "✅ Correct! Max found." };
    },
  },
  {
    id: 10,
    title: "Count Vowels/Consonants",
    difficulty: "Medium",
    description: "Count vowels and consonants in a string using a pointer.",
    starterCode: `void count(char* str) {
    int v = 0, c = 0;
    // logic here
}`,
    solution: `void count(char* str) {
    int v = 0, c = 0;
    while (*str) {
        char ch = tolower(*str);
        if (ch >= 'a' && ch <= 'z') {
            if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') v++;
            else c++;
        }
        str++;
    }
}`,
    check: (code) => {
      if (!code.includes("while"))
        return { valid: false, msg: "❌ Loop through string" };
      if (!code.includes("if"))
        return { valid: false, msg: "❌ Use conditional logic" };
      if (!code.includes("str++"))
        return { valid: false, msg: "❌ Increment pointer" };
      return { valid: true, msg: "✅ Correct! Logic accepted." };
    },
  },
  {
    id: 11,
    title: "Pointer vs Array Size",
    difficulty: "Easy",
    description:
      "Print `sizeof(arr)` vs `sizeof(ptr)`. Assume 64-bit system (ptr is 8 bytes).",
    starterCode: `void checkSize() {
    int arr[10];
    int* ptr = arr;
    // cout << ...
}`,
    solution: `void checkSize() {
    int arr[10];
    int* ptr = arr;
    cout << sizeof(arr) << endl; // 40
    cout << sizeof(ptr) << endl; // 8
}`,
    check: (code) => {
      if (!code.includes("sizeof(arr)"))
        return { valid: false, msg: "❌ Check sizeof(arr)" };
      if (!code.includes("sizeof(ptr)"))
        return { valid: false, msg: "❌ Check sizeof(ptr)" };
      return { valid: true, msg: "✅ Correct!" };
    },
  },
  {
    id: 12,
    title: "Double Pointer Modify",
    difficulty: "Hard",
    description:
      "Function `change(int** pp)` should change the value of the integer it points to, to 500.",
    starterCode: `void change(int** pp) {
    
}`,
    solution: `void change(int** pp) {
    **pp = 500;
}`,
    check: (code) => {
      if (!code.includes("**pp"))
        return { valid: false, msg: "❌ Dereference twice (**pp)" };
      if (!code.match(/\*\*pp\s*=\s*500/))
        return { valid: false, msg: "❌ Assign 500" };
      return { valid: true, msg: "✅ Correct!" };
    },
  },
  {
    id: 13,
    title: "Dangling Pointer Fix",
    difficulty: "Hard",
    description:
      "The code below returns a pointer to a local variable (Dangling). Fix it by dynamically allocating memory.",
    starterCode: `int* createInt() {
    int x = 10;
    return &x; // ERROR
}`,
    solution: `int* createInt() {
    int* p = new int;
    *p = 10;
    return p;
}`,
    check: (code) => {
      if (code.includes("&x"))
        return {
          valid: false,
          msg: "❌ Don't return address of local var '&x'",
        };
      if (!code.includes("new int"))
        return { valid: false, msg: "❌ Use 'new int' for dynamic allocation" };
      return { valid: true, msg: "✅ Correct! Memory allocated." };
    },
  },
];

const PointerPractice = () => {
  const [currentId, setCurrentId] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userCode, setUserCode] = useState(problems[0].starterCode);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }

  const problem = problems.find((p) => p.id === currentId);

  const nextProblem = () => {
    if (currentId < problems.length) {
      transitionProblem(currentId + 1);
    }
  };

  const prevProblem = () => {
    if (currentId > 1) {
      transitionProblem(currentId - 1);
    }
  };

  const transitionProblem = (id) => {
    const next = problems.find((p) => p.id === id);
    setCurrentId(id);
    setUserCode(next.starterCode);
    setShowAnswer(false);
    setFeedback(null);
  };

  const checkCode = () => {
    const result = problem.check(userCode);
    if (result.valid) {
      setFeedback({ type: "success", message: result.msg });
    } else {
      setFeedback({ type: "error", message: result.msg });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 pb-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        ⚔️ Pointer Practice Arena
      </h1>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
        {/* Left Column: Problem & Answer */}
        <div className="flex flex-col gap-6">
          {/* Problem Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 flex-1 overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">
                Problem {problem.id}: {problem.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold 
                        ${
                          problem.difficulty === "Easy"
                            ? "bg-green-900 text-green-300"
                            : problem.difficulty === "Medium"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-red-900 text-red-300"
                        }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-mono bg-black p-4 rounded border border-gray-600">
              {problem.description}
            </p>

            <div className="flex justify-between mt-auto">
              <button
                onClick={prevProblem}
                disabled={currentId === 1}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 transition"
              >
                ← Previous
              </button>
              <button
                onClick={nextProblem}
                disabled={currentId === problems.length}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Answer Section */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full flex justify-between items-center text-left font-bold text-gray-300 hover:text-white transition"
            >
              <span>{showAnswer ? "Hide Answer" : "💡 Show Answer"}</span>
              <span>{showAnswer ? "▼" : "▶"}</span>
            </button>

            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <pre className="mt-4 bg-black p-4 rounded text-green-400 font-mono text-sm overflow-x-auto">
                    {problem.solution}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Editor */}
        <div className="bg-gray-800 rounded-xl p-0 shadow-xl border border-gray-700 flex flex-col overflow-hidden relative">
          <div className="bg-gray-700 px-4 py-2 text-sm text-gray-300 font-mono border-b border-gray-600 flex justify-between items-center">
            <span>main.cpp</span>
            <span className="text-xs text-gray-400">Auto-save disabled</span>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => {
              setUserCode(e.target.value);
              setFeedback(null);
            }}
            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono p-4 resize-none focus:outline-none text-lg"
            spellCheck="false"
          />

          {/* Run Button & Feedback */}
          <div className="bg-gray-900 p-4 border-t border-gray-700 flex justify-between items-center">
            <div className="flex-1">
              {feedback && (
                <span
                  className={`font-bold ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {feedback.message}
                </span>
              )}
            </div>
            <button
              onClick={checkCode}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold transition flex items-center gap-2"
            >
              <span>▶</span> Run Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointerPractice;
