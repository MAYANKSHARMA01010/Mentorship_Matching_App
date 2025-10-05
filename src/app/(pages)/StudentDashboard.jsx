"use client";

import { useState, useMemo, useCallback } from "react";
import { Icon } from "../data/Icon";

// Import pages
import Page from "../components/StudentDashboard/pages";
import ExplorePage from "../components/StudentDashboard/Explores";
import RequestPage from "../components/StudentDashboard/Requests";
import ConnectionsPage from "../components/StudentDashboard/Connection";
import ChatPage from "../components/StudentDashboard/Chats";
import ProfilePage from "../components/StudentDashboard/Profiles";

// --- THEME DEFINITIONS ---
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

// --- MOCK DATA ---
const STUDENT_MOCK_DATA = [
  { id: "s1", name: "Student One", role: "Student" },
  { id: "s2", name: "Student Two", role: "Student" },
];

const MENTOR_MOCK_DATA = [
  { id: "m1", name: "Mentor One", role: "Mentor" },
  { id: "m2", name: "Mentor Two", role: "Mentor" },
  { id: "m3", name: "Mentor Three", role: "Mentor" },
  { id: "m4", name: "Mentor Four", role: "Mentor" },
  { id: "m5", name: "Mentor Five", role: "Mentor" },
  { id: "m6", name: "Mentor Six", role: "Mentor" },
];

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId] = useState("STUDENT_123");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const currentTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  // --- Connections & Requests ---
  const [connections, setConnections] = useState([
    { id: "m1", name: "Mentor One", role: "Mentor", status: "Active" },
    { id: "m2", name: "Mentor Two", role: "Mentor", status: "Active" },
    { id: "m3", name: "Mentor Three", role: "Mentor", status: "Active" },
    { id: "m4", name: "Mentor Four", role: "Mentor", status: "Active" },
  ]);

  const [pendingOutgoingRequests, setPendingOutgoingRequests] = useState([
    MENTOR_MOCK_DATA[4],
    MENTOR_MOCK_DATA[5],
  ]);

  const [activeChatId, setActiveChatId] = useState(
    connections.length > 0 ? connections[0].id : null
  );

  // --- Handlers ---
  const handleSendRequest = useCallback((mentor) => {
    setPendingOutgoingRequests((prev) => [...prev, mentor]);
    setActivePage("Requests");
  }, []);

  const handleCancelRequest = useCallback((mentor) => {
    setPendingOutgoingRequests((prev) =>
      prev.filter((m) => m.id !== mentor.id)
    );
  }, []);

  // --- Disconnect Mentor ---
  const handleDisconnect = useCallback(
    (mentorId) => {
      const mentor = connections.find((m) => m.id === mentorId);
      if (!mentor) return;

      // Optional: Send system message
      console.log(`System message: You disconnected from ${mentor.name}`);

      // Remove connection
      setConnections((prev) => prev.filter((m) => m.id !== mentorId));

      // If chatting with this mentor, reset chat
      if (activeChatId === mentorId) {
        setActiveChatId(null);
        setActivePage("Home"); // redirect to Home
      }
    },
    [connections, activeChatId]
  );

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // --- Render current page ---
  const renderPage = useMemo(() => {
    const pageProps = { currentTheme, userId };
    switch (activePage) {
      case "Home":
        return (
          <Page
            {...pageProps}
            connectionsCount={connections.length}
            pendingRequestsCount={pendingOutgoingRequests.length}
            onNavigate={setActivePage}
          />
        );
      case "Explore":
        return (
          <ExplorePage {...pageProps} handleSendRequest={handleSendRequest} />
        );
      case "Requests":
        return (
          <RequestPage
            {...pageProps}
            outgoing={pendingOutgoingRequests}
            handleCancel={handleCancelRequest}
          />
        );
      case "Connections":
        return (
          <ConnectionsPage
            {...pageProps}
            connections={connections}
            handleMessage={(mentor) => {
              setActiveChatId(mentor.id);
              setActivePage("Chat");
            }}
            handleDisconnect={handleDisconnect} // <-- Pass disconnect handler
          />
        );
      case "Chat":
        return (
          <ChatPage
            {...pageProps}
            connections={connections}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
          />
        );
      case "Profile":
        return <ProfilePage {...pageProps} />;
      default:
        return null;
    }
  }, [
    activePage,
    connections,
    pendingOutgoingRequests,
    currentTheme,
    userId,
    handleSendRequest,
    handleCancelRequest,
    activeChatId,
    handleDisconnect,
  ]);

  // --- Sidebar items ---
  const navItems = [
    { name: "Home", icon: "Dashboard" },
    { name: "Explore", icon: "Explore" },
    { name: "Requests", icon: "Requests" },
    { name: "Connections", icon: "Connections" },
    { name: "Chat", icon: "Chat" },
    { name: "Profile", icon: "Profile" },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 p-4 flex flex-col flex-shrink-0 z-50`}
        style={{
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.gray_border,
        }}
      >
        <div
          className="text-2xl font-bold mb-8"
          style={{ color: currentTheme.primary }}
        >
          StudentHub
        </div>
        <nav className="flex-grow">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full p-3 rounded-xl mb-2 transition duration-200 ${
                activePage === item.name
                  ? "text-white font-semibold shadow-lg"
                  : "hover:opacity-80"
              }`}
              style={{
                backgroundColor:
                  activePage === item.name ? currentTheme.primary : "transparent",
                color: activePage === item.name ? "white" : currentTheme.text,
              }}
              onClick={() => {
                setActivePage(item.name);
                setIsSidebarOpen(false);
              }}
            >
              <Icon name={item.icon} className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <header
          className="shadow-lg p-4 flex justify-between items-center sticky top-0 z-40 border-b flex-shrink-0 transition-colors duration-300"
          style={{
            backgroundColor: currentTheme.card,
            borderColor: currentTheme.gray_border,
          }}
        >
          <button
            className="md:hidden p-2 rounded-full hover:opacity-80 transition"
            style={{ color: currentTheme.text }}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <h1
            className="text-2xl font-semibold hidden md:block"
            style={{ color: currentTheme.text }}
          >
            {activePage}
          </h1>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:opacity-80 transition"
              style={{ color: currentTheme.text }}
              onClick={toggleTheme}
            >
              <Icon name={isDarkTheme ? "Sun" : "Moon"} className="w-6 h-6" />
            </button>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium cursor-pointer"
              style={{ backgroundColor: currentTheme.primary }}
              onClick={() => setActivePage("Profile")}
            >
              S
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="p-6 md:p-10 flex-1">{renderPage}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
