import React, { useState } from "react";
import { motion } from "framer-motion";

const PalindromeNumber = () => {
  const [inputVal, setInputVal] = useState(121);
  const [isPalindrome, setIsPalindrome] = useState(null);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const checkPalindrome = async () => {
    setProcessing(true);
    setIsPalindrome(null);
    let str = inputVal.toString();
    let l = 0;
    let r = str.length - 1;
    let isPal = true;

    while (l <= r) {
      setMessage(`Comparing ${str[l]} (Index ${l}) and ${str[r]} (Index ${r})`);
      await new Promise((res) => setTimeout(res, 800));

      if (str[l] !== str[r]) {
        setMessage(`❌ Mismatch! ${str[l]} != ${str[r]}`);
        isPal = false;
        break;
      } else {
        setMessage(`✅ Match! Moving pointers.`);
      }
      l++;
      r--;
      await new Promise((res) => setTimeout(res, 500));
    }

    if (isPal) {
      setMessage(`✅ ${inputVal} is a Palindrome!`);
      setIsPalindrome(true);
    } else {
      setMessage(`❌ ${inputVal} is NOT a Palindrome.`);
      setIsPalindrome(false);
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-500">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          🔁 Palindrome Number
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-32 px-2 py-1 bg-gray-700 rounded border border-gray-600"
          />
          <button
            onClick={checkPalindrome}
            disabled={processing}
            className="bg-indigo-600 px-6 py-2 rounded font-bold disabled:opacity-50"
          >
            Check
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-8 text-3xl font-bold font-mono">
          {inputVal
            .toString()
            .split("")
            .map((char, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-16 flex items-center justify-center bg-gray-700 rounded border border-gray-600"
              >
                {char}
              </motion.div>
            ))}
        </div>

        <div
          className={`p-4 rounded text-center font-bold text-xl ${isPalindrome === true ? "bg-green-900/50 text-green-400" : isPalindrome === false ? "bg-red-900/50 text-red-400" : "bg-black/30 text-gray-400"}`}
        >
          {message || "Enter number and check"}
        </div>
      </div>
    </div>
  );
};

export default PalindromeNumber;
