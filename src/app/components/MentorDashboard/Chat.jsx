"use client";
import { useMemo, useEffect, useCallback } from "react";

// --- THEME DEFINITIONS
const DARK_THEME = {
  primary: "#5f50f5",
  accent: "#06b6d4",
  bg: "#121212",
  card: "#1e1e1e",
  text: "#f0f0f0",
  danger: "#f87171",
  gray_border: "#374151",
};

const LIGHT_THEME = {
  primary: "#5f50f5",
  accent: "#06b6d4",
  bg: "#f3f4f6",
  card: "#ffffff",
  text: "#1f2937",
  danger: "#dc2626",
  gray_border: "#e5e7eb",
};

// --- MOCK DATA
const MOCK_CONNECTIONS = [
  { id: "m1", name: "Rohan Mehta", role: "Mentor" },
  { id: "s1", name: "Neha Patel", role: "Student" },
  { id: "m2", name: "Sara Khan", role: "Mentor" },
  { id: "s2", name: "Aarav Sharma", role: "Student" },
];

// --- MAIN COMPONENT
export default function ChatPage({
  connections = MOCK_CONNECTIONS,
  activeChatId,
  setActiveChatId = () => {},
  currentTheme,
}) {
  const theme = currentTheme || LIGHT_THEME;

  const contacts = useMemo(
    () =>
      connections.map((c) => ({
        id: c.id,
        name: `${c.name} (${c.role})`,
        status: c.id === "m1" ? "Online" : "Offline",
        lastMsg: `Last message from ${c.name}.`,
        avatarBg: c.role === "Mentor" ? theme.primary : theme.accent,
      })),
    [connections, theme]
  );

  useEffect(() => {
    if (!activeChatId && contacts.length > 0) {
      setActiveChatId(contacts[0].id);
    } else if (activeChatId && !contacts.some((c) => c.id === activeChatId)) {
      setActiveChatId(contacts.length > 0 ? contacts[0].id : null);
    }
  }, [contacts, activeChatId, setActiveChatId]);

  const activeContact = useMemo(
    () =>
      contacts.find((c) => c.id === activeChatId) ||
      (contacts.length > 0 ? contacts[0] : null),
    [activeChatId, contacts]
  );

  const getMockMessages = useCallback((name) => {
    if (!name) return [];
    return [
      { id: 1, text: `Hello ${name}, ready for our check-in?`, time: "10:00 AM", sender: "self" },
      { id: 2, text: `Absolutely! I've prepared the architectural diagrams.`, time: "10:01 AM", sender: "other" },
      { id: 3, text: `Great! Have you started on the next assignment?`, time: "10:05 AM", sender: "self" },
      { id: 4, text: `Yes, I implemented the new feature using the message queue pattern.`, time: "10:06 AM", sender: "other" },
    ];
  }, []);

  const messages = useMemo(
    () => (activeContact ? getMockMessages(activeContact.name) : []),
    [activeContact, getMockMessages]
  );

  if (connections.length === 0) {
    return (
      <div
        className="text-center p-10 rounded-2xl h-[80vh] flex items-center justify-center border"
        style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
      >
        <p className="text-xl text-gray-400">
          You need active connections to start a chat. Find a mentor or student on the Explore page!
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>
        Real-Time Messaging
      </h2>
      <div
        className="flex h-[80vh] rounded-2xl shadow-2xl overflow-hidden border"
        style={{ borderColor: theme.gray_border }}
      >
        {/* Left Panel: Contacts */}
        <div className="w-full md:w-1/3 flex-shrink-0 overflow-y-auto" style={{ backgroundColor: theme.card }}>
          <div className="p-4 border-b" style={{ borderColor: theme.gray_border }}>
            <h3 className="text-xl font-bold" style={{ color: theme.primary }}>
              Connections
            </h3>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveChatId(contact.id)}
              className={`flex items-center p-4 cursor-pointer transition border-b`}
              style={{
                borderColor: theme.gray_border,
                backgroundColor: contact.id === activeChatId ? theme.primary + "20" : "transparent",
                borderLeft: contact.id === activeChatId ? `4px solid ${theme.primary}` : "4px solid transparent",
              }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${
                  contact.status === "Online" ? "ring-2 ring-green-500" : "ring-1 ring-gray-600"
                }`}
                style={{ backgroundColor: contact.avatarBg }}
              >
                {contact.name.charAt(0)}
              </div>
              <div className="ml-3 overflow-hidden flex-grow">
                <p className="font-semibold truncate" style={{ color: theme.text }}>
                  {contact.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
              </div>
              {contact.status === "Online" && <div className="w-2 h-2 rounded-full bg-green-500 ml-2"></div>}
            </div>
          ))}
        </div>

        {/* Right Panel: Chat Window */}
        <div className="flex-1 hidden md:flex flex-col" style={{ backgroundColor: theme.bg }}>
          {activeContact && (
            <>
              {/* Chat Header */}
              <div
                className="p-4 border-b flex items-center shadow-md flex-shrink-0"
                style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ring-2 ${
                    activeContact.status === "Online" ? "ring-green-500" : "ring-gray-600"
                  }`}
                  style={{ backgroundColor: activeContact.avatarBg }}
                >
                  {activeContact.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold" style={{ color: theme.text }}>
                    {activeContact.name}
                  </p>
                  <p className={`text-xs ${activeContact.status === "Online" ? "text-green-400" : "text-gray-500"}`}>
                    {activeContact.status}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "self" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-lg ${
                        msg.sender === "self" ? "text-white rounded-br-none" : "rounded-tl-none"
                      }`}
                      style={{
                        backgroundColor: msg.sender === "self" ? theme.primary : theme.card,
                        color: msg.sender === "self" ? "white" : theme.text,
                      }}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`block text-right mt-1 text-xs ${
                          msg.sender === "self" ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div
                className="p-4 border-t flex flex-shrink-0"
                style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
              >
                <input
                  type="text"
                  placeholder={`Message ${activeContact.name.split("(")[0].trim()}...`}
                  className="flex-grow border p-3 rounded-xl focus:ring-2 focus:ring-offset-2 transition duration-300 placeholder-gray-500"
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.text,
                    borderColor: theme.gray_border,
                    "--tw-ring-color": theme.primary,
                    "--tw-ring-offset-color": theme.card,
                  }}
                />
                <button
                  className="ml-3 px-5 py-3 rounded-xl text-white font-semibold flex items-center justify-center transition shadow-md hover:opacity-90"
                  style={{ backgroundColor: theme.accent }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
