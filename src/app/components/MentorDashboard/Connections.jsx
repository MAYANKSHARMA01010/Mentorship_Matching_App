"use client";
import { useState } from "react";

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

// --- MOCK CONNECTIONS DATA
const MOCK_CONNECTIONS = [
  { id: 1, name: "Rohan Mehta", role: "Backend Engineer", skills: ["Node.js", "APIs"] },
  { id: 2, name: "Sara Khan", role: "UX Designer", skills: ["Figma", "Design"] },
  { id: 3, name: "Neha Patel", role: "CS Student", skills: ["React", "HTML", "CSS"] },
];

// --- MAIN COMPONENT
export default function ConnectionsPage({ currentTheme }) {
  const theme = currentTheme || LIGHT_THEME;
  const [connections, setConnections] = useState(MOCK_CONNECTIONS);

  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>
        Your Connections
      </h2>
      <p className="text-lg text-gray-400 mb-6">
        Here are all the mentors and students you are connected with.
      </p>

      {connections.length === 0 ? (
        <div
          className="p-10 rounded-2xl text-center border"
          style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
        >
          <p className="text-gray-500 text-xl">
            You don’t have any connections yet. Accept some requests from the Requests page!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl shadow-lg flex flex-col justify-between border transition duration-300 hover:shadow-xl"
              style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
            >
              <div>
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {c.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-lg" style={{ color: theme.text }}>
                      {c.name}
                    </p>
                    <p className="text-sm text-gray-500">{c.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ color: theme.primary, backgroundColor: theme.primary + "20" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="mt-4 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md"
                style={{ backgroundColor: theme.accent }}
                onClick={() => alert(`Starting chat with ${c.name}`)}
              >
                Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
