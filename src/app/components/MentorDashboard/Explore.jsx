"use client";
import { useState, useMemo } from "react";
import { Icon } from "../../data/Icon";

// --- THEME DEFINITIONS ---
const DARK_THEME = {
  primary: "#5f50f5", // Vibrant Indigo/Purple
  accent: "#06b6d4", // Bright Cyan
  bg: "#121212", // Dark background
  card: "#1e1e1e", // Card background
  text: "#f0f0f0", // Light text
  danger: "#f87171", // Red
  gray_border: "#374151", // Gray-700
};

const LIGHT_THEME = {
  primary: "#5f50f5", // Indigo
  accent: "#06b6d4", // Cyan
  bg: "#f3f4f6", // Light gray
  card: "#ffffff", // White card
  text: "#1f2937", // Dark text
  danger: "#dc2626", // Strong red
  gray_border: "#e5e7eb", // Gray-200
};

// --- MOCK DATA (replace with Supabase later)
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

const STUDENT_MOCK_DATA = [
  {
    id: 1,
    name: "Neha Patel",
    role: "CS Student",
    location: "Chennai",
    bio: "Interested in learning React and UI design.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 2,
    name: "Aarav Sharma",
    role: "Engineering Student",
    location: "Mumbai",
    bio: "Looking for a mentor to help me with open-source.",
    skills: ["Git", "Python", "Next.js", "APIs"],
  },
];

// --- MAIN COMPONENT
export default function ExplorePage({ handleSendRequest, currentTheme }) {
  // fallback theme (avoids undefined crash)
  const theme = currentTheme || LIGHT_THEME;

  const [view, setView] = useState("mentors");
  const [searchTerm, setSearchTerm] = useState("");
  const allData = view === "students" ? STUDENT_MOCK_DATA : MENTOR_MOCK_DATA;

  const filteredData = useMemo(() => {
    if (!searchTerm) return allData;
    const lowerSearch = searchTerm.toLowerCase();
    return allData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.bio.toLowerCase().includes(lowerSearch) ||
        item.skills.some((skill) => skill.toLowerCase().includes(lowerSearch))
    );
  }, [allData, searchTerm]);

  const textBaseColor =
    theme.text === "#f0f0f0" ? "text-gray-400" : "text-gray-600";

  // --- CARD COMPONENT
  const Card = ({ item }) => {
    const isRequested = false;
    return (
      <div
        className="p-6 rounded-2xl shadow-xl flex flex-col justify-between border transition duration-300 hover:shadow-lg"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.gray_border,
        }}
      >
        <div>
          <div className="flex items-start mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              {item.name.charAt(0)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg" style={{ color: theme.text }}>
                  {item.name}
                </p>
                <span
                  className="text-sm font-semibold"
                  style={{ color: theme.accent }}
                >
                  Match: 80%
                </span>
              </div>
              <p className={`text-sm ${textBaseColor}`}>
                {item.role} | {item.location}
              </p>
            </div>
          </div>
          <p className={`text-sm mb-3 line-clamp-2 ${textBaseColor}`}>
            {item.bio}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {item.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  color: theme.primary,
                  backgroundColor: theme.primary + "20",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <button
            className="flex-1 text-sm px-3 py-2 rounded-xl transition font-semibold"
            style={{
              backgroundColor: theme.gray_border,
              color: theme.text,
            }}
          >
            View Profile
          </button>
          <button
            className={`flex-1 text-sm text-white px-3 py-2 rounded-xl transition font-semibold hover:opacity-90 shadow-md ${
              isRequested ? "bg-gray-500" : ""
            }`}
            style={{
              backgroundColor: isRequested ? "gray" : theme.primary,
            }}
            onClick={() => handleSendRequest(item)}
            disabled={isRequested}
          >
            {isRequested ? "Request Sent" : "Request Connection"}
          </button>
        </div>
      </div>
    );
  };

  // --- MAIN RETURN
  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <h2 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
        {view === "students" ? "Discover Students" : "Discover Mentors"}
      </h2>
      <p className="text-lg text-gray-400 mb-6">
        {view === "students"
          ? "Find students whose needs align with your expertise."
          : "Find the perfect mentor based on your skills and goals."}
      </p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder={`Search ${view} by name or skill...`}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-offset-2 transition duration-300 placeholder-gray-500"
            style={{
              backgroundColor: theme.card,
              color: theme.text,
              borderColor: theme.gray_border,
              boxShadow: `0 4px 10px -2px ${theme.primary}20`,
              "--tw-ring-color": theme.primary,
              "--tw-ring-offset-color": theme.bg,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Icon
            name="Explore"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          />
        </div>
        <button
          className="p-3 rounded-xl transition flex items-center justify-center font-semibold shadow-md w-full md:w-auto hover:opacity-90"
          style={{ backgroundColor: theme.primary, color: "white" }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v3a1 1 0 01-.293.707l-2.433 2.433A1 1 0 0015.586 12H10.414a1 1 0 00-.707.293L7.293 14.707A1 1 0 016.586 15H5a1 1 0 00-1 1v1a1 1 0 01-1 1H3z"
            ></path>
          </svg>
        </button>
      </div>

      {/* Toggle */}
      <div className="mb-8">
        <div
          className="flex space-x-3 p-1 rounded-xl border w-full max-w-lg mx-auto"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.gray_border,
          }}
        >
          <button
            onClick={() => setView("mentors")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition shadow-md ${
              view === "mentors" ? "text-white" : "text-gray-400"
            }`}
            style={{
              backgroundColor:
                view === "mentors" ? theme.primary : "transparent",
            }}
          >
            Discover Mentors
          </button>
          <button
            onClick={() => setView("students")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition shadow-md ${
              view === "students" ? "text-white" : "text-gray-400"
            }`}
            style={{
              backgroundColor:
                view === "students" ? theme.primary : "transparent",
            }}
          >
            Discover Students
          </button>
        </div>
      </div>

      {/* Cards */}
      <p className="text-gray-400 mb-4 font-medium">
        Showing {filteredData.length} results
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <Card key={item.id} item={item} />
        ))}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 col-span-full py-10">
            No {view} found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
