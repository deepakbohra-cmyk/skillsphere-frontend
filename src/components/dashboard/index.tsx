import React from "react";
import { AlertTriangle, AlertCircle, TrendingUp, Medal, Clock, Check, ClipboardCheck, Lock, Sparkles, Database, Shield, Users, BookOpenText, UserCircle, Trophy, GitMerge, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";

type StatCardProps = {
  label: string;
  value: string;
  delta: React.ReactNode;
  valueClassName?: string;
};

function StatCard({ label, value, delta, valueClassName = "text-blue-600" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`mt-2 text-3xl font-extrabold ${valueClassName}`}>{value}</div>
      <div className="mt-2 text-sm text-gray-500">{delta}</div>
    </div>
  );
}

type ProgressItemProps = {
  title: string;
  percent: number;
  badgeClassName: string;
  badgeText: string;
  subtext: string;
  barClassName: string;
};

function ProgressItem({ title, percent, badgeClassName, badgeText, subtext, barClassName }: ProgressItemProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-[13.5px] font-medium text-gray-800">{title}</div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClassName}`}>{badgeText}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div className={`h-2 rounded-full ${barClassName}`} style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-1 text-[11.5px] text-gray-500">{subtext}</div>
    </div>
  );
}

type PathStepProps = {
  title: string;
  desc: string;
  status: "done" | "active" | "locked";
  tag: React.ReactNode;
};

function PathStep({ title, desc, status, tag }: PathStepProps) {
  const iconMap = {
    done: <Check className="h-4 w-4 text-emerald-500" />,
    active: <ClipboardCheck className="h-4 w-4 text-blue-600" />,
    locked: <Lock className="h-4 w-4 text-gray-400" />,
  };

  const dotClassMap = {
    done: "border-emerald-200 bg-emerald-50",
    active: "border-blue-200 bg-blue-50",
    locked: "border-gray-200 bg-gray-50",
  };

  return (
    <div className="mb-4 flex items-start gap-3 last:mb-0">
      <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${dotClassMap[status]}`}>
        {iconMap[status]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-800">
          {title} <span className="ml-1 align-middle">{tag}</span>
        </div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

type CourseItemProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
};

function CourseItem({ icon, iconBg, title, subtitle }: CourseItemProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>{icon}</div>
        <div>
          <div className="text-sm font-medium text-gray-800">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

type QuickLinkButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

function QuickLinkButton({ icon, text, onClick }: QuickLinkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

type AssessmentRowProps = {
  icon: React.ReactNode;
  iconBg: string;
  name: string;
  sub: string;
  subClassName?: string;
};

function AssessmentRow({ icon, iconBg, name, sub, subClassName = "text-gray-500" }: AssessmentRowProps) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
      <div>
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className={`text-xs ${subClassName}`}>{sub}</div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Alerts */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
        <div className="flex gap-3 text-sm text-gray-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
          <div>
            <strong>Overdue:</strong> "ETL Fundamentals" assessment was due 2 days ago.{' '}
            <button
              onClick={() => navigate("/dashboard/assessments")}
              className="font-medium text-blue-600 hover:underline"
            >
              Start now →
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
        <div className="flex gap-3 text-sm text-gray-800">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
          <div>
            <strong>Attempt limit reached</strong> on "Cybersecurity Basics". Your lead has been notified automatically.
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Points"
          value="2,840"
          valueClassName="text-blue-600"
          delta={
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +120 this week
            </span>
          }
        />
        <StatCard
          label="Courses Completed"
          value="7"
          valueClassName="text-emerald-500"
          delta={
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              2 this month
            </span>
          }
        />
        <StatCard
          label="Badges Earned"
          value="4"
          valueClassName="text-amber-500"
          delta={
            <span className="inline-flex items-center gap-1 text-gray-500">
              <Medal className="h-3.5 w-3.5" />
              1 Bronze · 2 Silver · 1 Gold
            </span>
          }
        />
        <StatCard
          label="Pending Assessments"
          value="3"
          valueClassName="text-red-500"
          delta={
            <span className="inline-flex items-center gap-1 text-red-500">
              <Clock className="h-3.5 w-3.5" />
              1 overdue
            </span>
          }
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        {/* Left column */}
        <div className="space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Current Learning Paths</h3>

            <ProgressItem
              title="Schema Design Mastery"
              percent={68}
              badgeClassName="bg-blue-50 text-blue-600"
              badgeText="68%"
              subtext="Module 4 of 6 · Assessment due Jun 2"
              barClassName="bg-blue-600"
            />
            <ProgressItem
              title="Ingestion & ETL Pipeline"
              percent={32}
              badgeClassName="bg-amber-50 text-amber-600"
              badgeText="32%"
              subtext="Module 2 of 7 · Overdue"
              barClassName="bg-amber-500"
            />
            <ProgressItem
              title="Leadership Fundamentals"
              percent={91}
              badgeClassName="bg-emerald-50 text-emerald-600"
              badgeText="91%"
              subtext="Module 6 of 6 · Final assignment pending"
              barClassName="bg-emerald-500"
            />
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Learning Path: Schema Design</h3>

            <PathStep
              status="done"
              title="Training Materials"
              tag={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Done</span>}
              desc="Videos, PDFs, Documents · 3 resources"
            />
            <PathStep
              status="done"
              title="Quiz"
              tag={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Done · 84%</span>}
              desc="10 questions · 2 attempts used"
            />
            <PathStep
              status="done"
              title="Doubt Session"
              tag={<span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Attended</span>}
              desc="Live Q&A with SME"
            />
            <PathStep
              status="active"
              title="Assessment"
              tag={<span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">In Progress</span>}
              desc="3 attempts allowed · 1 used · 150 pts"
            />
            <PathStep
              status="locked"
              title="Final Assignment"
              tag={<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">Locked</span>}
              desc="Single attempt · Unlocks after assessment"
            />
            <PathStep
              status="locked"
              title="Certification"
              tag={<span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">Locked</span>}
              desc="Gold badge · Schema Design Master"
            />
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <Sparkles className="h-4 w-4 text-blue-600" />
              AI Recommendations
            </h3>

            <div className="space-y-3">
              <CourseItem
                icon={<Database className="h-4 w-4 text-emerald-500" />}
                iconBg="bg-emerald-50"
                title="Advanced KETL Patterns"
                subtitle="Bridges your skill gap · 4h · Advanced"
              />
              <CourseItem
                icon={<Shield className="h-4 w-4 text-blue-600" />}
                iconBg="bg-blue-50"
                title="Cybersecurity Essentials"
                subtitle="Role-required · 2.5h · Intermediate"
              />
              <CourseItem
                icon={<Users className="h-4 w-4 text-amber-500" />}
                iconBg="bg-amber-50"
                title="Project Management 101"
                subtitle="Popular in your team · 3h · Beginner"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <QuickLinkButton
                icon={<ClipboardCheck className="h-4 w-4 text-blue-600" />}
                text="Go to My Assessments"
                onClick={() => navigate("/dashboard/assessments")}
              />
              <QuickLinkButton
                icon={<BookOpenText className="h-4 w-4 text-emerald-500" />}
                text="Explore Course Catalog"
                onClick={() => navigate("/dashboard/catalog")}
              />
              <QuickLinkButton
                icon={<UserCircle className="h-4 w-4 text-amber-500" />}
                text="View My Profile"
                onClick={() => navigate("/dashboard/profile")}
              />
              <QuickLinkButton
                icon={<Trophy className="h-4 w-4 text-red-500" />}
                text="View Leaderboard"
                onClick={() => navigate("/dashboard/leaderboard")}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Upcoming Assessments</h3>

            <AssessmentRow
              icon={<Database className="h-4 w-4 text-blue-600" />}
              iconBg="bg-blue-50"
              name="Schema Assessment II"
              sub="Due Jun 2 · 2 attempts left"
            />
            <AssessmentRow
              icon={<GitMerge className="h-4 w-4 text-amber-500" />}
              iconBg="bg-amber-50"
              name="ETL Fundamentals"
              sub="Overdue · 3 attempts left"
              subClassName="text-red-500"
            />
            <AssessmentRow
              icon={<ChartBar className="h-4 w-4 text-emerald-500" />}
              iconBg="bg-emerald-50"
              name="Data Science Basics"
              sub="Due Jun 14 · 3 attempts left"
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
