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
} from "lucide-react";

type TabType = "progress" | "completed" | "wishlist";

type LearningCardProps = {
  title: string;
  subtitle: string;
  progress: number;
  progressColor: string;
  icon: React.ReactNode;
  iconBg: string;
  footerLeft: string;
  footerRight: string;
  footerRightClass?: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  buttonClass?: string;
};

function LearningCard({
  title,
  subtitle,
  progress,
  progressColor,
  icon,
  iconBg,
  footerLeft,
  footerRight,
  footerRightClass = "text-gray-500",
  buttonText,
  buttonIcon,
  buttonClass = "bg-blue-600 hover:bg-blue-700",
}: LearningCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div
          className={`h-2 rounded-full ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Footer */}
      <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
        <span>{footerLeft}</span>

        <span className={footerRightClass}>
          {footerRight}
        </span>
      </div>

      {/* Button */}
      <button
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${buttonClass}`}
      >
        {buttonIcon}
        {buttonText}
      </button>
    </div>
  );
}

type BadgeCardProps = {
  title: string;
  level: string;
  icon: React.ReactNode;
  iconBg: string;
  tagClass: string;
  locked?: boolean;
};

function BadgeCard({
  title,
  level,
  icon,
  iconBg,
  tagClass,
  locked = false,
}: BadgeCardProps) {
  return (
    <div
      className={`rounded-2xl p-4 text-center shadow-sm ${
        locked
          ? "border border-dashed border-gray-300 bg-transparent"
          : "border border-gray-200 bg-white"
      }`}
    >
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
      >
        {icon}
      </div>

      <h3
        className={`text-sm font-semibold ${
          locked ? "text-gray-400" : "text-gray-800"
        }`}
      >
        {title}
      </h3>

      <span
        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tagClass}`}
      >
        {level}
      </span>
    </div>
  );
}

function MyLearningPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("progress");

  const tabs = [
    { id: "progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "wishlist", label: "Saved / Wishlist" },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Learning Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <LearningCard
          title="Schema Design Mastery"
          subtitle="Module 4 of 6 · Advanced"
          progress={68}
          progressColor="bg-blue-600"
          icon={<Database className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-50"
          footerLeft="68%"
          footerRight="Due Jun 2"
          buttonText="Resume Learning"
          buttonIcon={<Play className="h-4 w-4" />}
        />

        <LearningCard
          title="Ingestion & ETL Pipeline"
          subtitle="Module 2 of 7 · Overdue"
          progress={32}
          progressColor="bg-amber-500"
          icon={<GitMerge className="h-5 w-5 text-amber-500" />}
          iconBg="bg-amber-50"
          footerLeft="32%"
          footerRight="Overdue!"
          footerRightClass="text-red-500"
          buttonText="Resume Learning"
          buttonIcon={<Play className="h-4 w-4" />}
        />

        <LearningCard
          title="Leadership Fundamentals"
          subtitle="Module 6 of 6 · Final step"
          progress={91}
          progressColor="bg-emerald-500"
          icon={<Users className="h-5 w-5 text-emerald-500" />}
          iconBg="bg-emerald-50"
          footerLeft="91%"
          footerRight="Final assignment pending"
          buttonText="Submit Assignment"
          buttonIcon={<Pencil className="h-4 w-4" />}
          buttonClass="bg-emerald-500 hover:bg-emerald-600"
        />

        {/* Add Course */}
        <button
          onClick={() => navigate("/dashboard/catalog")}
          className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-transparent text-gray-400 transition hover:border-blue-400 hover:text-blue-500"
        >
          <Plus className="h-8 w-8" />

          <span className="text-sm font-medium">
            Add new course
          </span>
        </button>
      </div>

      {/* Certificates */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Certificates & Badges
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <BadgeCard
            title="ETL Beginner"
            level="Bronze"
            icon={<Medal className="h-7 w-7 text-[#CD7F32]" />}
            iconBg="bg-amber-50"
            tagClass="bg-amber-50 text-amber-700"
          />

          <BadgeCard
            title="Schema Intermediate"
            level="Silver"
            icon={<Medal className="h-7 w-7 text-gray-400" />}
            iconBg="bg-gray-100"
            tagClass="bg-gray-100 text-gray-500"
          />

          <BadgeCard
            title="Leadership Pro"
            level="Gold"
            icon={<Award className="h-7 w-7 text-amber-500" />}
            iconBg="bg-amber-50"
            tagClass="bg-amber-50 text-amber-700"
          />

          <BadgeCard
            title="Locked"
            level="Pending"
            icon={<Lock className="h-7 w-7 text-gray-400" />}
            iconBg="bg-gray-100"
            tagClass="bg-gray-100 text-gray-500"
            locked
          />
        </div>
      </section>
    </div>
  );
}

export default MyLearningPage;