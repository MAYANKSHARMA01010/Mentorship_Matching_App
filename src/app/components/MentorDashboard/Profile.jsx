"use client";

export default function ProfilePage ({ userId, currentTheme }) {
  const theme = currentTheme || {
    primary: "#5f50f5",
    accent: "#06b6d4",
    bg: "#f3f4f6",
    card: "#ffffff",
    text: "#1f2937",
    danger: "#dc2626",
    gray_border: "#e5e7eb",
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8" style={{ color: theme.text }}>
        User Profile & Settings
      </h2>

      <div
        className="p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto border"
        style={{ backgroundColor: theme.card, borderColor: theme.gray_border }}
      >
        {/* Header / Basic Info */}
        <div
          className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 pb-6 border-b"
          style={{ borderColor: theme.gray_border }}
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-extrabold text-white flex-shrink-0 ring-4 ring-offset-4"
            style={{
              backgroundColor: theme.primary,
              ringColor: theme.primary,
              ringOffsetColor: theme.card,
            }}
          >
            M
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold" style={{ color: theme.text }}>
              Dr. Mentor Example
            </h3>
            <p className="text-xl mt-1 font-medium text-gray-400">
              Senior Software Architect
            </p>
            <p className="text-sm mt-1 flex items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                style={{ color: theme.accent }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Remote (Global)
            </p>
          </div>
          <button
            className="md:ml-auto text-sm text-white px-5 py-2 rounded-xl transition font-semibold shadow-lg hover:opacity-90"
            style={{ backgroundColor: theme.primary }}
          >
            Edit Profile
          </button>
        </div>

        {/* Bio and Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-bold mb-3" style={{ color: theme.text }}>
              About Me
            </h4>
            <p className="text-gray-400 leading-relaxed text-base">
              I specialize in Cloud Technologies, DevOps, and scalable distributed systems, primarily focusing on <strong>AWS and Kubernetes</strong>. I have 15+ years of industry experience guiding teams from concept to launch. I am happy to connect with students passionate about backend development, architecture, and career transition planning. My mentoring philosophy emphasizes hands-on learning and systems thinking.
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-3" style={{ color: theme.text }}>
              Expertise / Skills
            </h4>
            <div className="flex flex-wrap gap-3">
              {["AWS", "Kubernetes", "Python", "System Design", "DevOps", "Mentoring"].map((skill) => (
                <span
                  key={skill}
                  className="text-sm px-3 py-1 rounded-full font-medium shadow-md border"
                  style={{
                    backgroundColor: theme.accent + "20",
                    color: theme.accent,
                    borderColor: theme.accent + "50",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
