// src/components/header/Header.tsx

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/user";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",

  // Main
  "/dashboard/catalog": "Catalog",
  "/dashboard/mylearning": "My Learning",
  "/dashboard/assessments": "Assessments",

  // Personal
  "/dashboard/profile": "My Profile & Skills",
  "/dashboard/resource": "Resource",
  "/dashboard/leaderboard": "Leaderboard",

  // Admin
  "/dashboard/admin": "Admin Panel",
};

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useAuth();

  let title = PAGE_TITLES[location.pathname];

  if (location.pathname.includes("/dashboard/course/")) {
    title = "Course Player";
  }

  if (location.pathname.includes("/dashboard/learn/")) {
    title = "Learning Path";
  }

  title = title ?? "Dashboard";

  const handleLogout = () => {
    logout();

    navigate("/signin", { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          aria-label="Open sidebar"
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
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="hidden sm:block text-xs text-gray-400">
            Welcome back to SkillSphere
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {/* Notification Dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
