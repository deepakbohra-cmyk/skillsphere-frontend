import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  BookOpen,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  Circle,
  SkipBack,
  ChevronRight,
  Menu,
} from "lucide-react";
import ReviewsTab from "./ReviewsTab";
import {
  getCourse,
  getTotalLessons,
} from "../../data/courses";
import VideoPlayer from "./VideoPlayer";
import CurriculumSidebar from "./CurriculumSidebar";
import OverviewTab from "./OverviewTab";
import InstructorTab from "./InstructorTab";

const LESSON_ICON: Record<string, React.ReactNode> = {
  video: <Play className="h-3.5 w-3.5" />,
  reading: <BookOpen className="h-3.5 w-3.5" />,
  quiz: <ClipboardCheck className="h-3.5 w-3.5" />,
  assignment: <FileText className="h-3.5 w-3.5" />,
};

/* ── Tab content ─────────────────────────────────────────────────── */
type TabId = "overview" | "curriculum" | "instructor" | "reviews";

/* ── Main CoursePlayer ───────────────────────────────────────────── */
export default function CoursePlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = getCourse(courseId ?? "");

  // Flatten all lessons
  const allLessons = course?.curriculum.flatMap((s) => s.lessons) ?? [];
  const firstLesson = allLessons[0];

  const [activeLessonId, setActiveLessonId] = useState(firstLesson?.id ?? "");
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(allLessons.filter((l) => l.completed).map((l) => l.id)),
  );
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Course not found.</p>
          <button
            onClick={() => navigate("/dashboard/catalog")}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const activeLesson =
    allLessons.find((l) => l.id === activeLessonId) ?? firstLesson;
  const activeLessonIndex = allLessons.findIndex(
    (l) => l.id === activeLessonId,
  );
  const hasNext = activeLessonIndex < allLessons.length - 1;
  const hasPrev = activeLessonIndex > 0;

  const goNext = () => {
    if (hasNext) {
      markComplete(activeLessonId);
      setActiveLessonId(allLessons[activeLessonIndex + 1].id);
    }
  };
  const goPrev = () => {
    if (hasPrev) setActiveLessonId(allLessons[activeLessonIndex - 1].id);
  };
  const markComplete = (id: string) => {
    setCompletedIds((prev) => new Set([...prev, id]));
  };
  const totalLessons = getTotalLessons(course);
  const completedCount = completedIds.size;
  const pct = Math.round((completedCount / totalLessons) * 100);

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* ── Top Nav ── */}
      <header className="flex-shrink-0 bg-gray-900 text-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard/catalog")}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Catalog</span>
        </button>

        <div className="h-4 w-px bg-gray-700 mx-1 hidden sm:block" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{course.title}</p>
          <p className="text-xs text-gray-400 truncate hidden sm:block">
            {activeLesson?.title}
          </p>
        </div>

        {/* Progress */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-32 h-1.5 rounded-full bg-gray-700">
            <div
              className="h-1.5 rounded-full bg-blue-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-gray-300 whitespace-nowrap">
            {pct}% complete
          </span>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">
        {/* Main column */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video */}
          <div className="bg-black w-full">
            <VideoPlayer
              lesson={activeLesson}
              onNext={goNext}
              onPrev={goPrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </div>

          {/* Lesson header */}
          <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {activeLesson?.title}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Lesson {activeLessonIndex + 1} of {allLessons.length} ·{" "}
                  <span className="capitalize">{activeLesson?.type}</span> ·{" "}
                  {activeLesson?.duration}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {hasPrev && (
                  <button
                    onClick={goPrev}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <SkipBack className="h-4 w-4" /> Prev
                  </button>
                )}
                {completedIds.has(activeLessonId) ? (
                  <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-green-600 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                  </div>
                ) : (
                  <button
                    onClick={() => markComplete(activeLessonId)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl transition"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark Complete
                  </button>
                )}
                {hasNext && (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
            <div className="flex gap-0 overflow-x-auto scrollbar-hide">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                    activeTab === t.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab body */}
          <div className="px-4 sm:px-6 pb-10 flex-1">
            {activeTab === "overview" && <OverviewTab course={course} />}
            {activeTab === "curriculum" && (
              <div className="py-4 space-y-3">
                {course.curriculum.map((section, sIdx) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        Section {sIdx + 1}: {section.title}
                      </h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${lesson.id === activeLessonId ? "bg-blue-50" : ""}`}
                        >
                          <span
                            className={`${completedIds.has(lesson.id) ? "text-green-500" : "text-gray-300"}`}
                          >
                            {completedIds.has(lesson.id) ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                          </span>
                          <span className="text-gray-400">
                            {LESSON_ICON[lesson.type]}
                          </span>
                          <span
                            className={`flex-1 text-sm ${lesson.id === activeLessonId ? "font-semibold text-blue-700" : "text-gray-700"}`}
                          >
                            {lesson.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {lesson.duration}
                          </span>
                          {lesson.free && (
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-full">
                              Free
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "instructor" && <InstructorTab course={course} />}
            {activeTab === "reviews" && <ReviewsTab course={course} />}
          </div>
        </div>

        {/* ── Desktop curriculum sidebar ── */}
        <div className="hidden lg:flex flex-col w-80 xl:w-96 flex-shrink-0 border-l border-gray-200 h-full">
          <CurriculumSidebar
            course={course}
            activeLessonId={activeLessonId}
            onSelect={setActiveLessonId}
            completedIds={completedIds}
          />
        </div>
      </div>

      {/* ── Mobile curriculum drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-xl flex flex-col">
            <CurriculumSidebar
              course={course}
              activeLessonId={activeLessonId}
              onSelect={(id) => {
                setActiveLessonId(id);
                setSidebarOpen(false);
              }}
              completedIds={completedIds}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
