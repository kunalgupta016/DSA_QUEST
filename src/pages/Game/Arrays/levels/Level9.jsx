import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Level9 = () => {
  // Leader: An element is a leader if it is greater than all elements to its right.
  // [16, 17, 4, 3, 5, 2]
  // Leaders: 17, 5, 2. (Rightmost is always leader).

  // Interaction: Select all leaders.

  const [array] = useState([16, 17, 4, 3, 5, 2]);
  const leaders = [17, 5, 2]; // Hardcoded logic for this static array
  const [selected, setSelected] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState(
    "Select ALL Leaders (Values > all elements to their right).",
  );

  const handleClick = (val) => {
    if (completed) return;

    if (selected.includes(val)) {
      setSelected((prev) => prev.filter((v) => v !== val));
    } else {
      const newSelection = [...selected, val];
      setSelected(newSelection);
    }
  };

  const submit = () => {
    // Check if selection matches unique leaders
    if (selected.length !== leaders.length) {
      setMessage(
        `❌ Found ${selected.length} out of ${leaders.length}. Keep looking!`,
      );
      return;
    }

    const allCorrect = selected.every((val) => leaders.includes(val));
    if (allCorrect) {
      setCompleted(true);
      setMessage("🎉 Correct! You found all leaders.");
    } else {
      setMessage(
        "❌ Incorrect selection. Remember: Rightmost element is always a leader.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white pt-24 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur mb-10">
        <Link to="/game/arrays" className="text-gray-400 hover:text-white">
          ← Exit Level
        </Link>
        <h2 className="text-2xl font-bold text-cyan-400">
          Level 9: The Leader
        </h2>
      </div>

      <h3 className="text-xl mb-4 text-center max-w-2xl text-gray-300">
        Rule: An element is a{" "}
        <span className="text-yellow-400 font-bold">Leader</span> if it is
        strictly greater than all elements to its right.
      </h3>
      <p className="text-cyan-300 mb-8 font-mono">{message}</p>

      <div className="flex gap-4">
        {array.map((val, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(val)}
            whileHover={{ y: -5 }}
            className={`w-20 h-24 rounded-lg flex items-center justify-center text-3xl font-bold border-b-4 transition-all
                            ${
                              selected.includes(val)
                                ? "bg-purple-600 border-purple-800 shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            }
                             ${completed && leaders.includes(val) ? "bg-green-600 border-green-800" : ""}
                        `}
          >
            {val}
          </motion.button>
        ))}
      </div>

      {!completed ? (
        <button
          onClick={submit}
          className="mt-12 px-8 py-3 bg-blue-600 rounded hover:bg-blue-700 font-bold"
        >
          Verify Selection
        </button>
      ) : (
        <div className="mt-12 text-center">
          <Link
            to="/game/arrays/10"
            className="px-8 py-3 bg-green-600 rounded-full font-bold text-xl hover:bg-green-700 shadow-lg glow"
          >
            Victory! Face the Boss
          </Link>
        </div>
      )}
    </div>
  );
};

export default Level9;
