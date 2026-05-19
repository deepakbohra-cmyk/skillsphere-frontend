// src/components/catalog/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Play,
} from "lucide-react";
import CourseCard from "./CourseCard";
import { COURSES, type Course } from "../../data/courses";

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
