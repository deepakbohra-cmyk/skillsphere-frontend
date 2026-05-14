// src/components/profile/index.tsx

import {
  AlertTriangle,
  Award,
  Medal,
} from "lucide-react";

type SkillRowProps = {
  skill: string;
  percentage: number;
  level: string;
  progressColor: string;
  levelClass?: string;
};

function SkillRow({
  skill,
  percentage,
  level,
  progressColor,
  levelClass = "text-gray-600",
}: SkillRowProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[120px_1fr_auto] items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {skill}
        </span>

        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <span className={`text-xs font-medium ${levelClass}`}>
          {level} ({percentage}%)
        </span>
      </div>
    </div>
  );
}

type PointCardProps = {
  title: string;
  points: string;
  pointsClass?: string;
  highlight?: boolean;
};

function PointCard({
  title,
  points,
  pointsClass = "text-blue-600",
  highlight = false,
}: PointCardProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
        highlight
          ? "border border-blue-200 bg-blue-50"
          : "bg-gray-50"
      }`}
    >
      <span
        className={`text-sm ${
          highlight
            ? "font-semibold text-gray-800"
            : "text-gray-700"
        }`}
      >
        {title}
      </span>

      <span
        className={`font-bold ${
          highlight ? "text-xl" : "text-base"
        } ${pointsClass}`}
      >
        {points}
      </span>
    </div>
  );
}

type BadgeCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
};

function BadgeCard({
  title,
  subtitle,
  icon,
  iconBg,
}: BadgeCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
      >
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Profile Header */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
            AK
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Arjun Kumar
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Developer · Level 3 · Schema Team
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                2,840 pts
              </span>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                7 courses done
              </span>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                4 badges
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skill Matrix */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Skill Matrix
          </h2>

          <div className="space-y-5">
            <SkillRow
              skill="Schema Design"
              percentage={82}
              level="Advanced"
              progressColor="bg-blue-600"
            />

            <SkillRow
              skill="ETL / Ingestion"
              percentage={48}
              level="Mid"
              progressColor="bg-amber-500"
            />

            <SkillRow
              skill="KETL"
              percentage={35}
              level="Beginner"
              progressColor="bg-emerald-500"
            />

            <SkillRow
              skill="Cybersecurity"
              percentage={20}
              level="Gap"
              progressColor="bg-red-500"
              levelClass="text-red-500"
            />

            <SkillRow
              skill="Leadership"
              percentage={75}
              level="Strong"
              progressColor="bg-emerald-500"
            />
          </div>

          {/* Warning */}
          <div className="mt-6 flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />

            <p>
              Skill gap: Cybersecurity needs attention for role
              L3
            </p>
          </div>
        </section>

        {/* Points Breakdown */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Points Breakdown
          </h2>

          <div className="space-y-3">
            <PointCard
              title="Schema Design Mastery"
              points="+1,320"
            />

            <PointCard
              title="Leadership Fundamentals"
              points="+940"
            />

            <PointCard
              title="Data Science (Legacy ×0.5)"
              points="+380"
              pointsClass="text-gray-500"
            />

            <PointCard
              title="Total Points"
              points="2,840"
              highlight
            />
          </div>
        </section>
      </div>

      {/* Certifications */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Certifications & Badges
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <BadgeCard
            title="ETL Beginner"
            subtitle="Bronze · Beginner"
            icon={<Medal className="h-8 w-8 text-[#CD7F32]" />}
            iconBg="bg-amber-50"
          />

          <BadgeCard
            title="Schema Intermediate"
            subtitle="Silver · Intermediate"
            icon={<Medal className="h-8 w-8 text-gray-400" />}
            iconBg="bg-gray-100"
          />

          <BadgeCard
            title="Leadership Pro"
            subtitle="Gold · Advanced"
            icon={<Award className="h-8 w-8 text-amber-500" />}
            iconBg="bg-amber-50"
          />
        </div>
      </section>
    </div>
  );
}

export default Profile;