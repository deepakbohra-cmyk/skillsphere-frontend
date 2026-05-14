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
} from "lucide-react";

type CategoryTagProps = {
  label: string;
  active?: boolean;
};

function CategoryTag({ label, active = false }: CategoryTagProps) {
  return (
    <button
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

type CourseCardProps = {
  title: string;
  level: string;
  duration: string;
  icon: React.ReactNode;
  iconBg: string;
  tagClass: string;
  progress?: number;
};

function CourseCard({
  title,
  level,
  duration,
  icon,
  iconBg,
  tagClass,
  progress,
}: CourseCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Icon */}
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-800">{title}</h3>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tagClass}`}>
          {level}
        </span>

        <span className="text-gray-500">{duration}</span>
      </div>

      {/* Progress */}
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {progress}% complete
          </p>
        </div>
      )}

      {/* Not started */}
      {progress === undefined && (
        <p className="mt-4 text-xs text-gray-500">
          Not started
        </p>
      )}
    </div>
  );
}

function CatalogPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search courses, modules, topics…"
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <CategoryTag label="All" active />
        <CategoryTag label="Schema" />
        <CategoryTag label="ETL / KETL" />
        <CategoryTag label="Cybersecurity" />
        <CategoryTag label="Data Science" />
        <CategoryTag label="Leadership" />
        <CategoryTag label="Mandatory" />
        <CategoryTag label="New Arrivals" />
      </div>

      {/* Featured */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Featured Paths
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CourseCard
            title="Schema Design Mastery"
            level="Advanced"
            duration="6 modules · 12h"
            progress={68}
            icon={<Database className="h-6 w-6 text-blue-600" />}
            iconBg="bg-blue-50"
            tagClass="bg-blue-50 text-blue-600"
          />

          <CourseCard
            title="Ingestion & ETL Pipeline"
            level="Intermediate"
            duration="7 modules · 15h"
            progress={32}
            icon={<GitMerge className="h-6 w-6 text-emerald-500" />}
            iconBg="bg-emerald-50"
            tagClass="bg-emerald-50 text-emerald-600"
          />

          <CourseCard
            title="Cybersecurity Fundamentals"
            level="Beginner"
            duration="5 modules · 8h"
            icon={<ShieldCheck className="h-6 w-6 text-red-500" />}
            iconBg="bg-red-50"
            tagClass="bg-red-50 text-red-500"
          />
        </div>
      </section>

      {/* All Courses */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          All Courses
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CourseCard
            title="Data Science Foundations"
            level="Intermediate"
            duration="8 modules · 18h"
            icon={<ChartColumn className="h-6 w-6 text-amber-500" />}
            iconBg="bg-amber-50"
            tagClass="bg-amber-50 text-amber-600"
          />

          <CourseCard
            title="Leadership for Developers"
            level="Intermediate"
            duration="4 modules · 6h"
            icon={<Users className="h-6 w-6 text-blue-600" />}
            iconBg="bg-blue-50"
            tagClass="bg-blue-50 text-blue-600"
          />

          <CourseCard
            title="Work Ethics & Compliance"
            level="Mandatory"
            duration="2 modules · 2h"
            icon={<ClipboardCheck className="h-6 w-6 text-emerald-500" />}
            iconBg="bg-emerald-50"
            tagClass="bg-emerald-50 text-emerald-600"
          />

          <CourseCard
            title="KETL Advanced Patterns"
            level="Advanced"
            duration="5 modules · 10h"
            icon={<ArrowUpDown className="h-6 w-6 text-amber-500" />}
            iconBg="bg-amber-50"
            tagClass="bg-amber-50 text-amber-600"
          />

          <CourseCard
            title="Communication Skills"
            level="Beginner"
            duration="3 modules · 4h"
            icon={<MessageCircle className="h-6 w-6 text-red-500" />}
            iconBg="bg-red-50"
            tagClass="bg-red-50 text-red-500"
          />

          <CourseCard
            title="Project Management 101"
            level="Beginner"
            duration="4 modules · 7h"
            icon={<Briefcase className="h-6 w-6 text-blue-600" />}
            iconBg="bg-blue-50"
            tagClass="bg-blue-50 text-blue-600"
          />
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;