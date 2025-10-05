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

// --- MOCK DATA
const MOCK_INCOMING = [
  { id: 1, name: "Rohan Mehta", role: "Backend Engineer", skills: ["Node.js", "APIs"] },
  { id: 2, name: "Sara Khan", role: "UX Designer", skills: ["Figma", "Design"] },
];

const MOCK_OUTGOING = [
  { id: 1, name: "Neha Patel", role: "CS Student" },
  { id: 2, name: "Aarav Sharma", role: "Engineering Student" },
];

// --- MAIN COMPONENT
export default function RequestPage({ currentTheme }) {
  const theme = currentTheme || LIGHT_THEME;

  const [incoming, setIncoming] = useState(MOCK_INCOMING);
  const [outgoing, setOutgoing] = useState(MOCK_OUTGOING);

  // --- HANDLERS
  const handleAccept = (req) => {
    alert(`Accepted ${req.name}'s request!`);
    setIncoming(incoming.filter((r) => r.id !== req.id));
  };

  const handleReject = (req) => {
    alert(`Rejected ${req.name}'s request.`);
    setIncoming(incoming.filter((r) => r.id !== req.id));
  };

  const handleCancel = (req) => {
    alert(`Cancelled request to ${req.name}.`);
    setOutgoing(outgoing.filter((r) => r.id !== req.id));
  };

  // --- CARD COMPONENTS
  const IncomingRequestCard = ({ req }) => (
    <div
      className="p-4 rounded-xl mb-3 flex justify-between items-center border"
      style={{ backgroundColor: theme.bg, borderColor: theme.gray_border }}
    >
      <div>
        <p className="font-medium" style={{ color: theme.text }}>
          {req.name} ({req.role})
        </p>
        <p className="text-sm text-gray-500">
          Requested help in: {req.skills.slice(0, 2).join(", ")}...
        </p>
      </div>
      <div className="space-x-2 flex-shrink-0">
        <button
          className="text-sm text-white px-3 py-1 rounded-lg transition font-semibold hover:opacity-90 shadow-md"
          style={{ backgroundColor: theme.accent }}
          onClick={() => handleAccept(req)}
        >
          Accept
        </button>
        <button
          className="text-sm border px-3 py-1 rounded-lg hover:opacity-80 transition font-semibold shadow-md"
          style={{ color: theme.danger, borderColor: theme.danger + "80" }}
          onClick={() => handleReject(req)}
        >
          Reject
        </button>
      </div>
    </div>
  );

  const OutgoingRequestCard = ({ req }) => (
    <div
      className="p-4 rounded-xl mb-3 flex justify-between items-center border"
      style={{ backgroundColor: theme.bg, borderColor: theme.gray_border }}
    >
      <div>
        <p className="font-medium" style={{ color: theme.text }}>
          {req.name} ({req.role})
        </p>
        <p className="text-sm text-gray-500">
          Status: Pending (Awaiting Response)
        </p>
      </div>
      <button
        className="text-sm text-gray-400 border px-3 py-1 rounded-lg hover:opacity-80 transition font-semibold shadow-md flex-shrink-0"
        style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
        onClick={() => handleCancel(req)}
      >
        Cancel Request
      </button>
    </div>
  );

  // --- MAIN RETURN
  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>
        Pending Connection Requests
      </h2>
      <p className="text-lg text-gray-400 mb-6">
        Review invitations you've received and track the status of requests you've sent.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Requests */}
        <div
          className="p-6 rounded-2xl shadow-lg border"
          style={{ backgroundColor: theme.card, borderColor: theme.danger + "30" }}
        >
          <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.danger }}>
            Incoming Invitations ({incoming.length})
          </h3>
          {incoming.length > 0 ? (
            incoming.map((req) => <IncomingRequestCard key={req.id} req={req} />)
          ) : (
            <p className="text-gray-500 italic">No incoming requests right now.</p>
          )}
        </div>

        {/* Outgoing Requests */}
        <div
          className="p-6 rounded-2xl shadow-lg border"
          style={{ backgroundColor: theme.card, borderColor: theme.primary + "30" }}
        >
          <h3 className="text-2xl font-semibold mb-4" style={{ color: theme.primary }}>
            Sent Requests ({outgoing.length})
          </h3>
          {outgoing.length > 0 ? (
            outgoing.map((req) => <OutgoingRequestCard key={req.id} req={req} />)
          ) : (
            <p className="text-gray-500 italic">No outgoing requests are currently pending.</p>
          )}
        </div>
      </div>
    </div>
  );
}
