import React, { useEffect, useState } from "react";

const AIHelp = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("ai_chats")) || [];
    setChats(savedChats);
  }, []);

  useEffect(() => {
    localStorage.setItem("ai_chats", JSON.stringify(chats));
  }, [chats]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newChat = { question: input, answer: "⏳ Loading..." };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    setInput("");

    try {
      const res = await fetch("/api/gemini.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      updatedChats[updatedChats.length - 1].answer = data.reply;
      setChats([...updatedChats]);
    } catch (err) {
      updatedChats[updatedChats.length - 1].answer = "❌ Gemini Error";
      setChats([...updatedChats]);
    }
  };

  const visibleChats = showAll ? chats : chats.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4 py-8">
      <div className="max-w-3xl mx-auto mt-20 mb-10">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">🤖 AI Help </h1>

        {/* Input Box */}
        <div className="flex gap-4 mb-8">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about DSA..."
            className="flex-grow bg-gray-800 px-4 py-2 rounded-md text-white"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>

        {/* Chat History */}
        <div className="space-y-4">
          {visibleChats.map((chat, index) => {
            const actualIndex = showAll ? index : chats.length - 1 - index;
            const isExpanded = expandedIndex === actualIndex;

            return (
              <div key={actualIndex} className="bg-gray-800 rounded-lg shadow-md p-4">
                <button
                  className="text-left w-full font-semibold text-yellow-300"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : actualIndex)
                  }
                >
                  Q: {chat.question}
                </button>
                {isExpanded && (
                  <p className="text-sm text-gray-200 mt-2 whitespace-pre-line">
                    A: {chat.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* See More / Less */}
        {chats.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showAll ? "🔼 Show Less" : "🔽 See More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIHelp;
