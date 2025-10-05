"use client";
import { useState, useMemo } from "react";
import { Icon } from "../../data/Icon";

// --- Mock Mentors Data
const MENTOR_MOCK_DATA = [
  {
    id: 1,
    name: "Ananya Gupta",
    role: "Frontend Developer",
    location: "Delhi",
    bio: "Passionate about mentoring students in React & Tailwind.",
    skills: ["React", "Next.js", "UI/UX", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Backend Engineer",
    location: "Bangalore",
    bio: "Helping learners understand APIs, Databases, and Node.js.",
    skills: ["Node.js", "Express", "PostgreSQL", "APIs"],
  },
  {
    id: 3,
    name: "Sara Khan",
    role: "UX Designer",
    location: "Pune",
    bio: "Love teaching design thinking and rapid prototyping.",
    skills: ["Figma", "Design Thinking", "Prototyping", "Systems Thinking"],
  },
];

// --- Main Explore Component
export default function ExplorePage({ currentTheme, handleSendRequest }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = useMemo(() => {
    if (!searchTerm) return MENTOR_MOCK_DATA;
    const lowerSearch = searchTerm.toLowerCase();
    return MENTOR_MOCK_DATA.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(lowerSearch) ||
        mentor.bio.toLowerCase().includes(lowerSearch) ||
        mentor.skills.some((skill) => skill.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm]);

  const textBaseColor =
    currentTheme.text === "#f0f0f0" ? "text-gray-400" : "text-gray-600";

  // --- Mentor Card Component
  const MentorCard = ({ mentor }) => {
    const isRequested = false; // can extend later
    return (
      <div
        className="p-6 rounded-2xl shadow-xl flex flex-col justify-between border transition duration-300 hover:shadow-lg"
        style={{
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.gray_border,
        }}
      >
        <div>
          <div className="flex items-start mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
              style={{ backgroundColor: currentTheme.primary }}
            >
              {mentor.name.charAt(0)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg" style={{ color: currentTheme.text }}>
                  {mentor.name}
                </p>
                <span
                  className="text-sm font-semibold"
                  style={{ color: currentTheme.accent }}
                >
                  Match: 80%
                </span>
              </div>
              <p className={`text-sm ${textBaseColor}`}>
                {mentor.role} | {mentor.location}
              </p>
            </div>
          </div>
          <p className={`text-sm mb-3 line-clamp-2 ${textBaseColor}`}>{mentor.bio}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  color: currentTheme.primary,
                  backgroundColor: currentTheme.primary + "20",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          className={`flex-1 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md ${
            isRequested ? "bg-gray-500" : ""
          }`}
          style={{
            backgroundColor: isRequested ? "gray" : currentTheme.primary,
          }}
          onClick={() => handleSendRequest(mentor)}
          disabled={isRequested}
        >
          {isRequested ? "Request Sent" : "Request Connection"}
        </button>
      </div>
    );
  };

  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.text }}>
        Explore Mentors
      </h2>
      <p className="text-lg text-gray-400 mb-6">
        Find the perfect mentor to help you grow.
      </p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search mentors by name or skill..."
          className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-offset-2 transition duration-300 placeholder-gray-500"
          style={{
            backgroundColor: currentTheme.card,
            color: currentTheme.text,
            borderColor: currentTheme.gray_border,
            "--tw-ring-color": currentTheme.primary,
            "--tw-ring-offset-color": currentTheme.bg,
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
        {filteredMentors.length === 0 && (
          <p className="text-center text-gray-500 col-span-full py-10">
            No mentors found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
