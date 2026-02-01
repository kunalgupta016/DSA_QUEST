import React, { useState } from "react";
import { motion } from "framer-motion";

const VAL_TEMPLATE = `// Pass by Value
void modify(int val) {
    // Changing val DOES NOT change x
    val = 20;
}

int main() {
    int x = 10;
    modify(x);
}`;

const REF_TEMPLATE = `// Pass by Reference
void modify(int* ptr) {
    // Changing *ptr updates x directly
    *ptr = 20;
}

int main() {
    int x = 10;
    modify(&x);
}`;

const PointerFunctions = () => {
  const [activeTab, setActiveTab] = useState("value"); // "value" | "reference"
  const [code, setCode] = useState(VAL_TEMPLATE);

  const [x, setX] = useState(10);
  const [param, setParam] = useState(10); // holds the value displayed in the function box
  const [isRunning, setIsRunning] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const toggleMode = (mode) => {
    setActiveTab(mode);
    setCode(mode === "value" ? VAL_TEMPLATE : REF_TEMPLATE);
    // Reset visual state
    setX(10);
    setParam(mode === "value" ? 10 : "0x100");
    setHighlight(false);
    setStatusMsg("");
  };

  const runSimulation = () => {
    setIsRunning(true);
    setStatusMsg("Running...");
    setHighlight(false);

    // Reset first to show animation
    if (activeTab === "value") {
      setParam(10);
      setX(10);
    } else {
      setX(10);
      setParam("0x100");
    }

    setTimeout(() => {
      if (activeTab === "value") {
        // Look for val = <number>
        const match = code.match(/val\s*=\s*(\d+)/);
        if (match) {
          const newVal = parseInt(match[1], 10);
          setParam(newVal);
          setHighlight(true);
          setStatusMsg(`Updated local variable 'val' to ${newVal}`);
        } else {
          setStatusMsg("No assignment to 'val' found.");
        }
      } else {
        // Look for *ptr = <number>
        const match = code.match(/\*ptr\s*=\s*(\d+)/);
        if (match) {
          const newVal = parseInt(match[1], 10);
          setX(newVal);
          setHighlight(true);
          setStatusMsg(`Updated 'x' via pointer to ${newVal}`);
        } else {
          setStatusMsg("No assignment to '*ptr' found.");
        }
      }
      setIsRunning(false);
      setTimeout(() => setHighlight(false), 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-4 pb-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">
        Pointers in Functions
      </h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6 bg-gray-800 p-2 rounded-lg">
        <button
          onClick={() => toggleMode("value")}
          className={`px-6 py-2 rounded font-bold transition ${activeTab === "value" ? "bg-cyan-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Pass by Value
        </button>
        <button
          onClick={() => toggleMode("reference")}
          className={`px-6 py-2 rounded font-bold transition ${activeTab === "reference" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
        >
          Pass by Reference
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Code Editor */}
        <div className="flex-1 bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-yellow-400">
            📝 C++ Code
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {activeTab === "value"
              ? "In Pass by Value, the function gets a COPY. Modifying it doesn't affect the original."
              : "In Pass by Reference, the function gets an ADDRESS. Modifying it changes the original."}
          </p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-black font-mono text-green-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg resize-none min-h-[300px]"
            spellCheck="false"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-400 italic">{statusMsg}</span>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`px-8 py-2 rounded-lg font-bold text-lg transition ${isRunning ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isRunning ? "Running..." : "Run Code ▷"}
            </button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 relative flex flex-col pt-8 min-h-[400px]">
          <h3 className="text-xl font-semibold text-cyan-400 mb-8 text-center">
            🧠 Memory Visualization
          </h3>

          <div className="flex flex-col gap-12 items-center">
            {/* Main Frame */}
            <div className="border-2 border-gray-600 border-dashed rounded-lg p-6 relative w-full max-w-sm">
              <span className="absolute -top-3 left-4 bg-gray-800 px-2 text-gray-400 text-sm">
                main() Scope
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-yellow-400 font-bold text-xl">
                    int x
                  </span>
                  <span className="font-mono text-gray-500 text-sm">
                    @0x100
                  </span>
                </div>
                <motion.div
                  animate={{
                    backgroundColor:
                      activeTab === "reference" && highlight
                        ? "#10B981"
                        : "#1F2937",
                    scale: activeTab === "reference" && highlight ? 1.1 : 1,
                  }}
                  className="w-24 h-24 border-4 border-yellow-500 flex items-center justify-center text-3xl font-bold rounded bg-gray-800"
                >
                  {x}
                </motion.div>
              </div>
            </div>

            {/* Function Frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isRunning || highlight ? 1 : 0.8, y: 0 }}
              className="border-2 border-gray-600 border-dashed rounded-lg p-6 relative w-full max-w-sm"
            >
              <span className="absolute -top-3 left-4 bg-gray-800 px-2 text-gray-400 text-sm">
                modify() Scope
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className={`${activeTab === "value" ? "text-red-400" : "text-purple-400"} font-bold text-xl`}
                  >
                    {activeTab === "value" ? "int val" : "int* ptr"}
                  </span>
                  <span className="font-mono text-gray-500 text-sm">
                    @0xF00
                  </span>
                </div>

                <motion.div
                  animate={{
                    backgroundColor:
                      activeTab === "value" && highlight
                        ? "#EF4444"
                        : "#1F2937",
                    scale: activeTab === "value" && highlight ? 1.1 : 1,
                  }}
                  className={`w-24 h-24 border-4 ${activeTab === "value" ? "border-red-500" : "border-purple-500"} flex items-center justify-center text-3xl font-bold rounded bg-gray-800`}
                >
                  {param}
                </motion.div>
              </div>

              {activeTab === "reference" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-8 right-10"
                >
                  <span className="text-purple-400 text-2xl">
                    ⬆ points to 0x100
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointerFunctions;
