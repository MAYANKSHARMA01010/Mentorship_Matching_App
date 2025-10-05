"use client";
import { useState, useMemo, useCallback } from "react";
import { Icon } from "../components/Icon/Icon";

// Import your page components
import Page from "../components/MentorDashboard/Page";
import ExplorePage from "../components/MentorDashboard/Explore";
import RequestPage from "../components/MentorDashboard/Request";
import ConnectionsPage from "../components/MentorDashboard/Connections";
import ChatPage from "../components/MentorDashboard/Chat";
import ProfilePage from "../components/MentorDashboard/Profile";

// --- Theme Definitions
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

// --- Mock Data for demo
const STUDENT_MOCK_DATA = [
  { id: "s1", name: "Student One", role: "Student" },
  { id: "s2", name: "Student Two", role: "Student" },
];

const MENTOR_MOCK_DATA = [
  { id: "m1", name: "Mentor One", role: "Mentor" },
  { id: "m2", name: "Mentor Two", role: "Mentor" },
  { id: "m3", name: "Mentor Three", role: "Mentor" },
];

// --- Main App Component (Dashboard Layout)
const App = () => {
  const [activePage, setActivePage] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState("MOCK_USER_1234");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const currentTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  const [activeChatId, setActiveChatId] = useState(null);

  // Connection state
  const [connections, setConnections] = useState(
    STUDENT_MOCK_DATA.slice(0, 2).map((s) => ({ ...s, status: "Active" }))
  );
  const [pendingIncomingRequests, setPendingIncomingRequests] = useState([
    MENTOR_MOCK_DATA[0],
  ]);
  const [pendingOutgoingRequests, setPendingOutgoingRequests] = useState([
    MENTOR_MOCK_DATA[2],
  ]);

  const pendingRequestsCount =
    pendingIncomingRequests.length + pendingOutgoingRequests.length;

  // --- Handlers
  const handleAcceptConnection = useCallback((user) => {
    setPendingIncomingRequests((prev) => prev.filter((r) => r.id !== user.id));
    setConnections((prev) => [...prev, { ...user, status: "Active" }]);
    setActivePage("Connections");
  }, []);

  const handleRejectConnection = useCallback((user) => {
    setPendingIncomingRequests((prev) => prev.filter((r) => r.id !== user.id));
    console.log(`Rejected connection request from ${user.name}`);
  }, []);

  const handleSendRequest = useCallback((user) => {
    if (user.role === "Mentor") {
      setPendingOutgoingRequests((prev) => [...prev, user]);
    } else {
      setConnections((prev) => [...prev, { ...user, status: "Active" }]);
    }
    setActivePage("Requests");
  }, []);

  const handleDisconnect = useCallback(
    (userIdToDisconnect) => {
      setConnections((prev) => prev.filter((c) => c.id !== userIdToDisconnect));
      if (userIdToDisconnect === activeChatId) setActiveChatId(null);
    },
    [activeChatId]
  );

  const handleCancelRequest = useCallback((user) => {
    setPendingOutgoingRequests((prev) => prev.filter((r) => r.id !== user.id));
    console.log(`Cancelled request to ${user.name}`);
  }, []);

  const handleMessage = useCallback((user) => {
    setActiveChatId(user.id);
    setActivePage("Chat");
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // --- Render Page Content
  const renderPage = useMemo(() => {
    const pageProps = { currentTheme, userId };
    switch (activePage) {
      case "Home":
        return (
          <Page
            {...pageProps}
            connectionsCount={connections.length}
            pendingRequestsCount={pendingRequestsCount}
            onNavigate={setActivePage}
          />
        );
      case "Explore":
        return <ExplorePage {...pageProps} handleSendRequest={handleSendRequest} />;
      case "Requests":
        return (
          <RequestPage
            {...pageProps}
            incoming={pendingIncomingRequests}
            outgoing={pendingOutgoingRequests}
            handleAccept={handleAcceptConnection}
            handleReject={handleRejectConnection}
            handleCancel={handleCancelRequest}
          />
        );
      case "Connections":
        return (
          <ConnectionsPage
            {...pageProps}
            connections={connections}
            handleDisconnect={handleDisconnect}
            handleMessage={handleMessage}
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
        return (
          <DashboardPage
            {...pageProps}
            connectionsCount={connections.length}
            pendingRequestsCount={pendingRequestsCount}
            onNavigate={setActivePage}
          />
        );
    }
  }, [
    activePage,
    connections,
    pendingIncomingRequests,
    pendingOutgoingRequests,
    activeChatId,
    handleAcceptConnection,
    handleRejectConnection,
    handleSendRequest,
    handleDisconnect,
    handleCancelRequest,
    handleMessage,
    currentTheme,
    userId,
    pendingRequestsCount,
  ]);

  // --- Sidebar Navigation
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
      className="flex h-screen overflow-hidden antialiased transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 p-4 flex flex-col flex-shrink-0 z-50`}
        style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.gray_border }}
      >
        <div className="text-2xl font-bold mb-8" style={{ color: currentTheme.primary }}>
          MentorHub
        </div>
        <nav className="flex-grow">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item flex items-center w-full p-3 rounded-xl mb-2 transition duration-200 ${
                activePage === item.name ? "text-white font-semibold shadow-lg" : "hover:opacity-80"
              }`}
              style={{
                backgroundColor: activePage === item.name ? currentTheme.primary : "transparent",
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
          style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.gray_border }}
        >
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:opacity-80 transition"
            style={{ color: currentTheme.text }}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
          <h1 className="text-2xl font-semibold hidden md:block" style={{ color: currentTheme.text }}>
            {activePage}
          </h1>

          {/* Top Right Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:opacity-80 transition" style={{ color: currentTheme.text }} onClick={toggleTheme}>
              <Icon name={isDarkTheme ? "Sun" : "Moon"} className="w-6 h-6" />
            </button>

            <button
              className="p-2 rounded-full hover:opacity-80 transition relative"
              style={{ color: currentTheme.text }}
              onClick={() => setActivePage("Requests")}
            >
              <Icon name="Bell" className="w-6 h-6" />
              {pendingRequestsCount > 0 && (
                <span
                  className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2"
                  style={{ backgroundColor: currentTheme.danger, ringColor: currentTheme.card }}
                />
              )}
            </button>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium cursor-pointer"
              style={{ backgroundColor: currentTheme.primary }}
              onClick={() => setActivePage("Profile")}
            >
              M
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="p-6 md:p-10 flex-1">{renderPage}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default App;
