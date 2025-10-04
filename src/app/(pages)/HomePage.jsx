"use client";
import { useEffect, useState } from "react";

export default function Home() {
  // Default dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-white to-indigo-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 backdrop-blur-lg transition-all duration-700
          ${darkMode
            ? "bg-gray-800/60 border-white/20 backdrop-brightness-75"
            : "bg-white/90 shadow-lg border-gray-200"}
        `}
      >
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-indigo-600 dark:text-indigo-400">👥</span> MentorHub
        </div>

        <div className="flex items-center gap-5">
          {/* Toggle Button on Left */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-14 h-7 flex items-center rounded-full transition-all duration-700 focus:outline-none"
            style={{
              background: darkMode
                ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                : "linear-gradient(135deg, #E5E7EB, #D1D5DB)",
            }}
          >
            <div
              className={`absolute w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform duration-700 ${
                darkMode ? "translate-x-7 rotate-180" : "translate-x-1"
              }`}
            >
              <span
                className={`absolute inset-0 flex items-center justify-center text-xs ${
                  darkMode ? "text-yellow-300" : "text-gray-600"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </span>
            </div>
          </button>

          {/* Sign In Button */}
          <a
            href="/auth/signin"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-sm hover:shadow-indigo-300/40"
            }`}
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center justify-center pt-40 pb-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 blur-3xl opacity-40 pointer-events-none">
          <div
            className={`w-[600px] h-[600px] rounded-full ${
              darkMode ? "bg-indigo-700/40" : "bg-indigo-200/40"
            }`}
          ></div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          <span className="text-indigo-600 dark:text-indigo-400">Connect.</span>{" "}
          Learn. Grow. Together.
        </h1>
        <p
          className={`max-w-2xl text-lg sm:text-xl mb-10 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Find mentors that align with your goals and grow faster with 1:1
          personalized guidance and real-world collaboration.
        </p>

        <div className="flex gap-5">
          <a
            href="/auth/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-500/40 transition-transform transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="/auth/signin"
            className={`px-8 py-3 rounded-full font-semibold border transition-transform transform hover:scale-105
              ${darkMode
                ? "border-gray-600 hover:bg-gray-800 text-white"
                : "border-gray-200 hover:bg-indigo-100 text-gray-700 shadow-sm hover:shadow-indigo-300/40"
            }`}
          >
            Sign In
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-24 transition-colors duration-700 ${
          darkMode ? "bg-gray-900/80" : "bg-white"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {[
            {
              icon: "👤",
              title: "Create Profile",
              text: "Show your skills, interests, and goals to find ideal mentors.",
            },
            {
              icon: "🔍",
              title: "Discover Mentors",
              text: "AI-powered matches to connect with relevant mentors instantly.",
            },
            {
              icon: "📅",
              title: "Schedule Sessions",
              text: "Plan sessions seamlessly with built-in scheduling tools.",
            },
            {
              icon: "💬",
              title: "Chat & Collaborate",
              text: "Engage in real-time discussions and share resources easily.",
            },
          ].map((step, index) => (
            <StepCard key={index} {...step} darkMode={darkMode} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`text-center py-6 border-t transition-colors duration-700 ${
          darkMode
            ? "bg-gray-950 border-gray-800 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-700"
        }`}
      >
        © {new Date().getFullYear()} MentorHub. Empowering Growth.
      </footer>
    </div>
  );
}

function StepCard({ icon, title, text, darkMode }) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 border ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:shadow-[0_0_20px_#6366F1]"
          : "bg-white border-gray-200 hover:shadow-[0_0_30px_#a5b4fc]"
      } hover:-translate-y-2`}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className={`${darkMode ? "text-gray-300" : "text-black"} text-sm`}>
        {text}
      </p>
    </div>
  );
}