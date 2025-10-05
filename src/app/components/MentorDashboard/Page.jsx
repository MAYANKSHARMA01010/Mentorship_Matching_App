"use client";
import React from "react";

export default function Page({
  currentTheme,
  connectionsCount,
  pendingRequestsCount,
  onNavigate,
}) {
  const theme = currentTheme;

  return (
    <div
      className="min-h-screen p-8 transition-all duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
      </div>

      {/* Welcome Section */}
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>
        Welcome back!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Connections */}
        <div
          className="p-6 rounded-2xl shadow-xl border"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.gray_border,
          }}
        >
          <p className="text-sm font-medium text-gray-400">Active Connections</p>
          <p
            className="text-4xl font-bold mt-1"
            style={{ color: theme.primary }}
          >
            {connectionsCount}
          </p>
        </div>

        {/* Pending Requests */}
        <div
          className="p-6 rounded-2xl shadow-xl border"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.gray_border,
          }}
        >
          <p className="text-sm font-medium text-gray-400">Pending Requests</p>
          <p
            className="text-4xl font-bold mt-1"
            style={{ color: theme.danger }}
          >
            {pendingRequestsCount}
          </p>
        </div>

        {/* Active Chats */}
        <div
          className="p-6 rounded-2xl shadow-xl border"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.gray_border,
          }}
        >
          <p className="text-sm font-medium text-gray-400">Active Chats</p>
          <p
            className="text-4xl font-bold mt-1"
            style={{ color: theme.accent }}
          >
            3
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connections */}
          <div
            className="p-6 rounded-2xl shadow-lg cursor-pointer transition duration-300 border hover:ring-2"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.gray_border,
              color: theme.primary,
              ringColor: theme.primary,
            }}
            onClick={() => onNavigate("Connections")}
          >
            <p className="text-xl font-semibold">View My Connections</p>
            <p className="text-gray-400 mt-1">
              See all active mentors and students.
            </p>
          </div>

          {/* Chat */}
          <div
            className="p-6 rounded-2xl shadow-lg cursor-pointer transition duration-300 border hover:ring-2"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.gray_border,
              color: theme.accent,
              ringColor: theme.accent,
            }}
            onClick={() => onNavigate("Chat")}
          >
            <p className="text-xl font-semibold">Start a Conversation</p>
            <p className="text-gray-400 mt-1">
              Chat instantly with mentors or learners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
