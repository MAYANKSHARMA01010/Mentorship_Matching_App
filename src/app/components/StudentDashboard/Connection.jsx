"use client";

// --- Mock Data (Expanded)
const MOCK_CONNECTIONS = [
  { id: "m1", name: "Ananya Gupta", role: "Frontend Developer" },
  { id: "m2", name: "Rohan Mehta", role: "Backend Engineer" },
  { id: "m3", name: "Sara Khan", role: "UX Designer" },
  { id: "m4", name: "Aarav Sharma", role: "Fullstack Developer" },
  { id: "m5", name: "Neha Patel", role: "Data Scientist" },
  { id: "m6", name: "Vikram Singh", role: "AI Engineer" },
  { id: "m7", name: "Priya Reddy", role: "Product Manager" },
  { id: "m8", name: "Aditya Joshi", role: "Mobile Developer" },
  { id: "m9", name: "Isha Verma", role: "DevOps Engineer" },
  { id: "m10", name: "Karan Mehra", role: "UI/UX Designer" },
  { id: "m11", name: "Sanya Kapoor", role: "Software Tester" },
  { id: "m12", name: "Ritik Sharma", role: "Cloud Engineer" },
];

// --- Accepted Connections (minimum 2)
const ACCEPTED_CONNECTIONS = [MOCK_CONNECTIONS[0], MOCK_CONNECTIONS[1]];

// --- Connections Component
export default function ConnectionsPage({
  currentTheme,
  connections = ACCEPTED_CONNECTIONS, // Default: first two accepted
  handleDisconnect = (id) => console.log("Disconnect", id),
  handleMessage = (mentor) => console.log("Message", mentor.name),
}) {
  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: currentTheme.text }}>
        My Connections
      </h2>

      {connections.length === 0 ? (
        <p className="text-gray-400">You have no active connections yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((mentor) => (
            <div
              key={mentor.id}
              className="p-6 rounded-2xl shadow-xl flex flex-col justify-between border transition duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: currentTheme.card,
                borderColor: currentTheme.gray_border,
              }}
            >
              <div>
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-lg" style={{ color: currentTheme.text }}>
                      {mentor.name}
                    </p>
                    <p className="text-sm text-gray-400">{mentor.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  className="flex-1 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md"
                  style={{ backgroundColor: currentTheme.primary }}
                  onClick={() => handleMessage(mentor)}
                >
                  Message
                </button>
                <button
                  className="flex-1 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md"
                  style={{ backgroundColor: currentTheme.danger }}
                  onClick={() => handleDisconnect(mentor.id)}
                >
                  Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
