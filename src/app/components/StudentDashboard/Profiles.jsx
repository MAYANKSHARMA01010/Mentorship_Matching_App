"use client";

export default function ProfilePage({ currentTheme, userId }) {
  // Mock user data (replace with API/Firebase)
  const user = {
    id: userId,
    name: "Student One",
    email: "student.one@example.com",
    role: "Student",
    location: "Mumbai",
    bio: "Passionate about learning web development and connecting with mentors.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  };

  return (
    <div
      className="p-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Header */}
      <h2 className="text-3xl font-bold mb-4" style={{ color: currentTheme.text }}>
        My Profile
      </h2>

      {/* Profile Card */}
      <div
        className="p-6 rounded-2xl shadow-xl border max-w-3xl"
        style={{
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.gray_border,
        }}
      >
        <div className="flex items-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {user.name.charAt(0)}
          </div>
          <div className="ml-6">
            <p className="text-2xl font-bold" style={{ color: currentTheme.text }}>
              {user.name}
            </p>
            <p className="text-gray-400">{user.role}</p>
            <p className="text-gray-400">{user.location}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2" style={{ color: currentTheme.text }}>
            Bio
          </h3>
          <p className="text-gray-400">{user.bio}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2" style={{ color: currentTheme.text }}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded-full font-medium"
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

        {/* Optional: Edit Button */}
        <button
          className="mt-6 px-4 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: currentTheme.primary, color: "white" }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
