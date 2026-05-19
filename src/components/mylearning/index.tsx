// src/components/mylearning/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Medal,
  Award,
  Lock,
} from "lucide-react";
import { COURSES } from "../../data/courses";
import CourseCard from "../catalog/CourseCard";

type TabType = "progress" | "completed" | "wishlist";

// Map learning paths to course ids for navigation
const LP_PATH_MAP: Record<string, string> = {
  "schema-design-mastery": "lp1",
  "etl-pipeline": "lp2",
  "leadership-for-developers": "lp3",
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {inProgress.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => handleResume(course.id)}
            />
          ))}

          {/* Add Course Card */}
          <button
            onClick={() => navigate("/dashboard/catalog")}
            className="flex min-h-[350px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent text-gray-400 transition hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 cursor-pointer overflow-hidden p-5"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition">
              <Plus className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Browse Catalog</span>
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {completed.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleResume(course.id)}
                />
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
