"use client";
import { useState, useEffect, useRef } from "react";

export default function ChatPage({
  currentTheme,
  connections = [],
  activeChatId,
  setActiveChatId,
}) {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId]);

  if (!activeChatId) {
    return (
      <div
        className="p-8 min-h-screen flex items-center justify-center"
        style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      >
        <p className="text-gray-400">Select a connection to start chatting.</p>
      </div>
    );
  }

  const activeConnection = connections.find((c) => c.id === activeChatId);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        { sender: "student", text: input },
      ],
    }));
    setInput("");
  };

  const chatMessages = messages[activeChatId] || [];

  return (
    <div
      className="p-8 min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Chat Header */}
      <div
        className="flex items-center justify-between p-4 rounded-xl shadow-md mb-6"
        style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.gray_border }}
      >
        <div className="flex items-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {activeConnection.name.charAt(0)}
          </div>
          <div className="ml-4">
            <p className="font-bold text-lg" style={{ color: currentTheme.text }}>
              {activeConnection.name}
            </p>
            <p className="text-sm text-gray-400">{activeConnection.role}</p>
          </div>
        </div>
        <button
          className="text-sm px-3 py-1 rounded-xl font-semibold"
          style={{ backgroundColor: currentTheme.danger, color: "white" }}
          onClick={() => setActiveChatId(null)}
        >
          Close
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {chatMessages.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No messages yet.</p>
        )}
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-xs ${
              msg.sender === "student"
                ? "ml-auto text-white"
                : "mr-auto text-black"
            }`}
            style={{
              backgroundColor:
                msg.sender === "student"
                  ? currentTheme.primary
                  : currentTheme.gray_border,
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 transition duration-300"
          placeholder="Type a message..."
          style={{
            backgroundColor: currentTheme.card,
            color: currentTheme.text,
            borderColor: currentTheme.gray_border,
            "--tw-ring-color": currentTheme.primary,
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="px-4 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: currentTheme.primary, color: "white" }}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
