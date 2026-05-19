// src/components/mylearning/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  GitMerge,
  Users,
  Play,
  Pencil,
  Plus,
  Medal,
  Award,
  Lock,
  ChevronRight,
} from "lucide-react";
import { COURSES } from "../../data/courses";

type TabType = "progress" | "completed" | "wishlist";

// Map learning paths to course ids for navigation
const LP_PATH_MAP: Record<string, string> = {
  "schema-design-mastery": "lp1",
  "etl-pipeline": "lp2",
  "leadership-for-developers": "lp3",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database className="h-5 w-5" />,
  GitMerge: <GitMerge className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
};

function MyLearningPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("progress");

  const completed = COURSES.filter(
    (c) => c.enrolled && (c.progress ?? 0) >= 100,
  );
  const inProgress = COURSES.filter(
    (c) => c.enrolled && (c.progress ?? 0) < 100,
  );

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "progress", label: "In Progress", count: inProgress.length },
    { id: "completed", label: "Completed", count: completed.length },
    { id: "wishlist", label: "Saved / Wishlist" },
  ];

  const handleResume = (courseId: string) => {
    const pathId = LP_PATH_MAP[courseId] ?? courseId;
    navigate(`/dashboard/learn/${pathId}`);
  };

  return (
    <div className="space-y-6 p-1 sm:p-2">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* In Progress */}
      {activeTab === "progress" && (
        <div className="grid gap-4 md:grid-cols-2">
          {inProgress.map((course) => {
            const progress = course.progress ?? 0;
            const isOverdue = course.id === "etl-pipeline";
            return (
              <div
                key={course.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${course.iconBg} ${course.iconColor}`}
                  >
                    {ICON_MAP[course.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${isOverdue ? "text-red-500 font-semibold" : "text-gray-500"}`}
                    >
                      {course.modules} modules · {course.level}{" "}
                      {isOverdue ? "· ⚠ Overdue!" : ""}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      progress >= 80
                        ? "bg-green-50 text-green-600"
                        : progress >= 50
                          ? "bg-blue-50 text-blue-600"
                          : isOverdue
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {progress}%
                  </span>
                </div>

                {/* Progress */}
                <div className="h-2 w-full rounded-full bg-gray-100 mb-1">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isOverdue
                        ? "bg-amber-500"
                        : progress >= 80
                          ? "bg-green-500"
                          : "bg-blue-600"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>{progress}% complete</span>
                  <span>
                    {Math.round(
                      (1 - progress / 100) * parseInt(course.duration),
                    )}
                    h remaining
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleResume(course.id)}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                    progress >= 90
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {progress >= 90 ? (
                    <Pencil className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {progress >= 90
                    ? "Submit Final Assignment"
                    : "Resume Learning"}
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </button>
              </div>
            );
          })}

          {/* Add Course Card */}
          <button
            onClick={() => navigate("/dashboard/catalog")}
            className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent text-gray-400 transition hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold">Browse Catalog</span>
            <span className="text-xs text-gray-400">
              Add a new course to your path
            </span>
          </button>
        </div>
      )}

      {/* Completed */}
      {activeTab === "completed" && (
        <div>
          {completed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Award className="h-10 w-10 opacity-30 mb-3" />
              <p className="text-sm font-medium">No completed courses yet.</p>
              <p className="text-xs mt-1">
                Keep going — you're making great progress!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {completed.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${course.iconBg} ${course.iconColor}`}
                    >
                      {ICON_MAP[course.icon]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-xs text-green-600 font-semibold mt-0.5">
                        ✓ Completed
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist */}
      {activeTab === "wishlist" && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Lock className="h-10 w-10 opacity-30 mb-3" />
          <p className="text-sm font-medium">Your wishlist is empty.</p>
          <p className="text-xs mt-1">
            Browse the catalog and save courses for later.
          </p>
          <button
            onClick={() => navigate("/dashboard/catalog")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Browse Catalog
          </button>
        </div>
      )}

      {/* Certificates & Badges */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Certificates & Badges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "ETL Beginner",
              level: "Bronze",
              icon: <Medal className="h-7 w-7 text-[#CD7F32]" />,
              iconBg: "bg-amber-50",
              tagClass: "bg-amber-50 text-amber-700",
              locked: false,
            },
            {
              title: "Schema Intermediate",
              level: "Silver",
              icon: <Medal className="h-7 w-7 text-gray-400" />,
              iconBg: "bg-gray-100",
              tagClass: "bg-gray-100 text-gray-500",
              locked: false,
            },
            {
              title: "Leadership Pro",
              level: "Gold",
              icon: <Award className="h-7 w-7 text-amber-500" />,
              iconBg: "bg-amber-50",
              tagClass: "bg-amber-50 text-amber-700",
              locked: false,
            },
            {
              title: "Schema Master",
              level: "Pending",
              icon: <Lock className="h-7 w-7 text-gray-400" />,
              iconBg: "bg-gray-100",
              tagClass: "bg-gray-100 text-gray-500",
              locked: true,
            },
          ].map((badge) => (
            <div
              key={badge.title}
              className={`rounded-2xl p-4 text-center transition ${
                badge.locked
                  ? "border-2 border-dashed border-gray-200 bg-transparent opacity-60"
                  : "border border-gray-200 bg-white shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${badge.iconBg}`}
              >
                {badge.icon}
              </div>
              <h3
                className={`text-sm font-semibold ${badge.locked ? "text-gray-400" : "text-gray-800"}`}
              >
                {badge.title}
              </h3>
              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge.tagClass}`}
              >
                {badge.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyLearningPage;
