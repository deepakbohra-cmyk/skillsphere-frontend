// src/components/resources/index.tsx

import {
  HelpCircle,
  ChevronRight,
  Headphones,
  Mail,
  Hash,
  MessagesSquare,
} from "lucide-react";

type FAQItemProps = {
  question: string;
};

function FAQItem({ question }: FAQItemProps) {
  return (
    <button className="flex w-full items-center gap-3 border-b border-gray-100 py-4 text-left transition hover:bg-gray-50 last:border-b-0">
      {/* Icon */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <HelpCircle className="h-4 w-4 text-blue-600" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">
          {question}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </button>
  );
}

type ForumCardProps = {
  category: string;
  title: string;
  replies: string;
  time: string;
};

function ForumCard({
  category,
  title,
  replies,
  time,
}: ForumCardProps) {
  return (
    <button className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="mb-2 text-xs font-medium text-gray-400">
        {category}
      </p>

      <h3 className="mb-3 text-sm font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-xs text-gray-500">
        {replies} replies · {time}
      </p>
    </button>
  );
}

function Resources() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Top Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Help Center */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-bold text-gray-900">
              Help Center & FAQ
            </h2>
          </div>

          <div>
            <FAQItem question="How do attempt limits work?" />

            <FAQItem question="How are points calculated?" />

            <FAQItem question="How do I earn badges?" />
          </div>
        </section>

        {/* Technical Support */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Headphones className="h-5 w-5 text-emerald-600" />

            <h2 className="text-lg font-bold text-gray-900">
              Technical Support
            </h2>
          </div>

          <p className="mb-5 text-sm text-gray-500">
            For platform issues, contact our support team
          </p>

          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              <Mail className="h-4 w-4 text-blue-600" />

              support@skillsphere.internal
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              <Hash className="h-4 w-4 text-emerald-600" />

              #lms-support on Slack
            </button>
          </div>
        </section>
      </div>

      {/* Community Forum */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <MessagesSquare className="h-5 w-5 text-purple-600" />

          <h2 className="text-lg font-bold text-gray-900">
            Community Forum
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ForumCard
            category="Schema & ETL"
            title="Best practices for schema versioning?"
            replies="12"
            time="2h ago"
          />

          <ForumCard
            category="Cybersecurity"
            title="Study group for Cybersecurity Basics"
            replies="8"
            time="5h ago"
          />

          <ForumCard
            category="General"
            title="Tips for the final Leadership assignment?"
            replies="21"
            time="1d ago"
          />
        </div>
      </section>
    </div>
  );
}

export default Resources;