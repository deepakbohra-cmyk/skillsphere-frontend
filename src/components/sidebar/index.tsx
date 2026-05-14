// src/components/sidebar/Sidebar.tsx
import { NavLink } from "react-router-dom";

interface MainItem {
  name: string;
  path: string;
  icon: string;
  badge?: string;
}

interface Item {
  name: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainItems: MainItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: "⊞" },
  { name: "Catalog", path: "/dashboard/catalog", icon: "📚", badge: "142" },
  { name: "My Learning", path: "/dashboard/mylearning", icon: "🎓" },
  { name: "Assessments", path: "/dashboard/assessments", icon: "📊" },
];

const personalItems: Item[] = [
  { name: "My Profile & Skills", path: "/dashboard/profile", icon: "👤" },
  { name: "Resource", path: "/dashboard/resource", icon: "📁" },
  { name: "Leaderboard", path: "/dashboard/leaderboard", icon: "🏆" },
];

const adminItems: Item[] = [
  { name: "Admin Panel", path: "/dashboard/admin", icon: "🔧" },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-64 flex flex-col
          bg-white border-r border-gray-200 shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>

            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Skill<span className="text-blue-600">Sphere</span>
            </h1>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Close sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main */}
          <div className="space-y-1">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Main
            </p>

            {mainItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={onClose}
                className={navLinkClass}
              >
                <span className="text-base w-5 text-center">
                  {item.icon}
                </span>

                <span className="flex-1">{item.name}</span>

                {item.badge && (
                  <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Personal */}
          <div className="space-y-1 mt-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Personal
            </p>

            {personalItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={navLinkClass}
              >
                <span className="text-base w-5 text-center">
                  {item.icon}
                </span>

                <span className="flex-1">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Admin */}
          <div className="space-y-1 mt-6">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Admin
            </p>

            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={navLinkClass}
              >
                <span className="text-base w-5 text-center">
                  {item.icon}
                </span>

                <span className="flex-1">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* User Card */}
        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AK
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                Arjun Kumar
              </p>

              <p className="text-xs text-gray-400 truncate">
                Developer · L3
              </p>
            </div>

            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;