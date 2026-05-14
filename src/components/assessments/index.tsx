// src/components/assessments/index.tsx

import { useState } from "react";

import {
  Info,
  GitMerge,
  Database,
  ChartColumn,
  Check,
  X,
} from "lucide-react";

type TabType = "pending" | "completed";

type AssessmentCardProps = {
  title: string;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  status: string;
  statusClass: string;
  buttonText: string;
  buttonClass?: string;
};

function AssessmentCard({
  title,
  subtitle,
  icon,
  iconBg,
  status,
  statusClass,
  buttonText,
  buttonClass = "bg-blue-600 hover:bg-blue-700",
}: AssessmentCardProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-4 last:border-b-0 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {title}
          </h3>

          <div className="mt-1 text-xs text-gray-500">
            {subtitle}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-start gap-2 md:items-end">
        <span className={`text-xs font-medium ${statusClass}`}>
          {status}
        </span>

        <button
          className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition ${buttonClass}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function Assessments() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Alert */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
        <div className="flex gap-3 text-sm text-gray-700">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />

          <div>
            Assessments allow <strong>3 attempts</strong>. After 5
            attempts, your lead is automatically notified. Points are
            weighted — legacy process assessments carry{" "}
            <strong>0.5× multiplier</strong>.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("pending")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === "pending"
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          Pending (3)
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === "completed"
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          Completed (5)
        </button>
      </div>

      {/* Pending Assessments */}
      {activeTab === "pending" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <AssessmentCard
            title="ETL Fundamentals Assessment"
            subtitle={
              <>
                <span className="text-red-500">Overdue · </span>
                3 attempts left · 100 pts · Standard weight
              </>
            }
            icon={<GitMerge className="h-5 w-5 text-red-500" />}
            iconBg="bg-red-50"
            status="⚠ Past due"
            statusClass="text-red-500"
            buttonText="Start Now"
            buttonClass="bg-red-500 hover:bg-red-600"
          />

          <AssessmentCard
            title="Schema Design Assessment II"
            subtitle="Due Jun 2 · 2 attempts left · 150 pts · Standard weight"
            icon={<Database className="h-5 w-5 text-blue-600" />}
            iconBg="bg-blue-50"
            status="Due in 8 days"
            statusClass="text-gray-500"
            buttonText="Start"
          />

          <AssessmentCard
            title="Data Science Basics"
            subtitle={
              <>
                Due Jun 14 · 3 attempts left · 80 pts ·{" "}
                <span className="text-gray-400">
                  Legacy (0.5× weight → 40 pts)
                </span>
              </>
            }
            icon={<ChartColumn className="h-5 w-5 text-emerald-500" />}
            iconBg="bg-emerald-50"
            status="Due in 20 days"
            statusClass="text-gray-500"
            buttonText="Start"
          />
        </section>
      )}

      {/* Completed Assessments */}
      {activeTab === "completed" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Completed Assessments
          </h2>

          <AssessmentCard
            title="Schema Design Assessment I"
            subtitle="Score: 88% · 132/150 pts · 2 attempts used"
            icon={<Check className="h-5 w-5 text-emerald-500" />}
            iconBg="bg-emerald-50"
            status="Passed"
            statusClass="text-emerald-500"
            buttonText="View Result"
            buttonClass="bg-gray-800 hover:bg-gray-900"
          />

          <AssessmentCard
            title="Leadership Quiz"
            subtitle="Score: 94% · 94/100 pts · 1 attempt used"
            icon={<Check className="h-5 w-5 text-emerald-500" />}
            iconBg="bg-emerald-50"
            status="Passed"
            statusClass="text-emerald-500"
            buttonText="View Result"
            buttonClass="bg-gray-800 hover:bg-gray-900"
          />

          <AssessmentCard
            title="Cybersecurity Basics"
            subtitle={
              <span className="text-red-500">
                Failed · 5/5 attempts used · Lead notified
              </span>
            }
            icon={<X className="h-5 w-5 text-red-500" />}
            iconBg="bg-red-50"
            status="Failed"
            statusClass="text-red-500"
            buttonText="View Feedback"
            buttonClass="bg-amber-500 hover:bg-amber-600"
          />
        </section>
      )}
    </div>
  );
}

export default Assessments;