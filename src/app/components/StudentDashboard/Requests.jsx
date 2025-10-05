"use client";
import { Icon } from "../Icon/Icon";

// --- Requests Component
export default function RequestPage({
  currentTheme,
  incoming = [],
  outgoing = [],
  handleCancel,
}) {
  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      <h2 className="text-3xl font-bold mb-6" style={{ color: currentTheme.text }}>
        Pending Requests
      </h2>

      {/* Outgoing Requests */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4" style={{ color: currentTheme.text }}>
          Requests You Sent
        </h3>
        {outgoing.length === 0 ? (
          <p className="text-gray-500">No pending requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outgoing.map((mentor) => (
              <div
                key={mentor.id}
                className="p-6 rounded-2xl shadow-xl flex flex-col justify-between border transition duration-300 hover:shadow-lg"
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
                <button
                  className="mt-2 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md"
                  style={{ backgroundColor: currentTheme.danger }}
                  onClick={() => handleCancel(mentor)}
                >
                  Cancel Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div> 
  );
}
