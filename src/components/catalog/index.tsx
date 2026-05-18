// src/components/catalog/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Database,
  GitMerge,
  ShieldCheck,
  ChartColumn,
  Users,
  ClipboardCheck,
  ArrowUpDown,
  MessageCircle,
  Briefcase,
  Star,
  Clock,
  BookOpen,
  Play,
  Lock,
} from "lucide-react";
import { COURSES, type Course } from "../../data/courses";

const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database className="h-6 w-6" />,
  GitMerge: <GitMerge className="h-6 w-6" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  ChartColumn: <ChartColumn className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  ClipboardCheck: <ClipboardCheck className="h-6 w-6" />,
  ArrowUpDown: <ArrowUpDown className="h-6 w-6" />,
  MessageCircle: <MessageCircle className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
};

const CATEGORIES = [
  "All",
  "Schema",
  "ETL",
  "Cybersecurity",
  "Data Science",
  "Leadership",
  "Mandatory",
  "New Arrivals",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-amber-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function CourseCard({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) {
  const totalLessons = course.curriculum.reduce(
    (a, s) => a + s.lessons.length,
    0,
  );

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Course thumbnail */}
      <div
        className={`relative h-36 ${course.iconBg} flex items-center justify-center overflow-hidden`}
      >
        <div className={`${course.iconColor} opacity-10 absolute`}>
          <div className="h-32 w-32">{ICON_MAP[course.icon]}</div>
        </div>
        <div
          className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ${course.iconColor}`}
        >
          {ICON_MAP[course.icon]}
        </div>
        {course.mandatory && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Mandatory
          </span>
        )}
        {course.enrolled && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        )}
        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="h-5 w-5 text-blue-600 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <span
            className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${course.tagClass}`}
          >
            {course.level}
          </span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {course.tagline}
        </p>

        <StarRating rating={course.rating} />
        <p className="text-[11px] text-gray-400 mt-0.5">
          ({course.reviewCount.toLocaleString()} ratings) ·{" "}
          {course.enrolledCount.toLocaleString()} students
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {totalLessons} lessons
          </span>
        </div>

        {/* Progress bar */}
        {course.progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-semibold text-blue-600">
                {course.progress}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-1.5 rounded-full bg-blue-600 transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {course.enrolled ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Play className="h-3.5 w-3.5" />
              {course.progress && course.progress > 0
                ? "Continue Learning"
                : "Start Course"}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Lock className="h-3.5 w-3.5" />
              Enroll to Start
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = COURSES.filter((c) => {
    const matchSearch =
      search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" ||
      c.category === activeCategory ||
      activeCategory === "New Arrivals";
    return matchSearch && matchCat;
  });

  const enrolled = filtered.filter((c) => c.enrolled);
  const notEnrolled = filtered.filter((c) => !c.enrolled);

  const handleCourseClick = (course: Course) => {
    navigate(`/dashboard/course/${course.id}`);
  };

  return (
    <div className="space-y-6 p-1 sm:p-2">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses, modules, topics…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition border ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* In Progress (enrolled with progress) */}
      {enrolled.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900 flex items-center gap-2">
            <Play className="h-4 w-4 text-blue-600" /> Continue Learning
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {enrolled.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onClick={() => handleCourseClick(c)}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Courses */}
      {notEnrolled.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            {activeCategory === "All" ? "All Courses" : activeCategory}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {notEnrolled.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onClick={() => handleCourseClick(c)}
              />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No courses found for "{search}"</p>
          <button
            onClick={() => setSearch("")}
            className="mt-3 text-xs text-blue-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
