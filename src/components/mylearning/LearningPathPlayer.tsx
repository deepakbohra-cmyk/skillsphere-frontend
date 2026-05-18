// src/components/mylearning/LearningPathPlayer.tsx

import { useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  Circle,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  ChevronRight,
  Menu,
  X,
  Lock,
  Award,
  Clock,
  BookMarked,
} from "lucide-react";

import { getCourse, type Lesson } from "../../data/courses";

/* ───────────────────────────────────────────────────────────── */

const PATH_COURSE_MAP: Record<string, string> = {
  lp1: "schema-design-mastery",
  lp2: "etl-pipeline",
  lp3: "leadership-for-developers",
};

const LESSON_ICON: Record<string, React.ReactNode> = {
  video: <Play className="h-3.5 w-3.5" />,
  reading: <BookOpen className="h-3.5 w-3.5" />,
  quiz: <ClipboardCheck className="h-3.5 w-3.5" />,
  assignment: <FileText className="h-3.5 w-3.5" />,
};

type TabId = "overview" | "curriculum" | "progress";

/* ───────────────────────────────────────────────────────────── */
/* VIDEO PLAYER */
/* ───────────────────────────────────────────────────────────── */

function VideoPlayer({
  lesson,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  lesson: Lesson;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  if (lesson.type !== "video") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[340px] bg-gray-900 text-white p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
          {LESSON_ICON[lesson.type]}
        </div>

        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>

        <p className="text-gray-400 text-sm mb-6 max-w-md">
          {lesson.description ??
            "Complete this lesson to continue your learning journey."}
        </p>

        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold transition">
          {lesson.type === "quiz"
            ? "Start Quiz"
            : lesson.type === "assignment"
              ? "Open Assignment"
              : "Read Material"}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-black group"
      style={{ aspectRatio: "16/9" }}
    >
      <iframe
        src={`${lesson.videoUrl}?autoplay=0&rel=0&modestbranding=1&${muted ? "mute=1" : ""}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title={lesson.title}
      />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className="text-white/80 hover:text-white transition"
          >
            {muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>

          <span className="text-white text-xs font-medium">
            {lesson.duration}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="text-white/80 hover:text-white disabled:opacity-30"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="text-white/80 hover:text-white disabled:opacity-30"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="text-white/80 hover:text-white"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */
/* CURRICULUM SIDEBAR */
/* ───────────────────────────────────────────────────────────── */

function CurriculumSidebar({
  course,
  activeLessonId,
  onSelect,
  completedIds,
  onClose,
}: any) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const allLessons = course.curriculum.flatMap((s: any) => s.lessons);

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);

      next.has(id) ? next.delete(id) : next.add(id);

      return next;
    });
  };

  const getIsLocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return false;

    const prev = allLessons[lessonIndex - 1];

    return !completedIds.has(prev.id) && !prev.completed;
  };

  const pct = Math.round((completedIds.size / allLessons.length) * 100);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Learning Path</h3>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="text-xs text-gray-500 mb-2">
          {completedIds.size}/{allLessons.length} lessons · {pct}% complete
        </div>

        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-blue-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {course.curriculum.map((section: any, sIdx: number) => {
          const isCollapsed = collapsed.has(section.id);

          return (
            <div key={section.id} className="border-b border-gray-100">
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-start justify-between gap-2 px-4 py-3 hover:bg-gray-50 transition text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 leading-snug">
                    Section {sIdx + 1}: {section.title}
                  </p>
                </div>

                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {!isCollapsed && (
                <div>
                  {section.lessons.map((lesson: Lesson) => {
                    const lessonIndex = allLessons.findIndex(
                      (l: Lesson) => l.id === lesson.id,
                    );

                    const isLocked = getIsLocked(lessonIndex);

                    const isActive = lesson.id === activeLessonId;

                    const isDone = completedIds.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        onClick={() => onSelect(lesson.id)}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition border-l-2 ${
                          isActive
                            ? "bg-blue-50 border-blue-600"
                            : "border-transparent hover:bg-gray-50"
                        } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div
                          className={`mt-0.5 ${
                            isDone
                              ? "text-green-500"
                              : isActive
                                ? "text-blue-600"
                                : "text-gray-300"
                          }`}
                        >
                          {isLocked ? (
                            <Lock className="h-4 w-4" />
                          ) : isDone ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs leading-snug ${
                              isActive
                                ? "font-semibold text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {lesson.title}
                          </p>

                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-gray-400">
                              {LESSON_ICON[lesson.type]}
                            </span>

                            <span className="text-[11px] text-gray-400">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Certificate */}
        {pct === 100 && (
          <div className="m-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />

            <p className="text-sm font-bold text-amber-800">Course Complete!</p>

            <button className="mt-3 w-full px-3 py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition">
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */
/* MAIN */
/* ───────────────────────────────────────────────────────────── */

export default function LearningPathPlayer() {
  const { pathId } = useParams<{ pathId: string }>();

  const navigate = useNavigate();

  const courseId = PATH_COURSE_MAP[pathId ?? ""] ?? pathId;

  const course = getCourse(courseId);

  const allLessons = course?.curriculum.flatMap((s) => s.lessons) ?? [];

  const [activeLessonId, setActiveLessonId] = useState(
    allLessons.find((l) => !l.completed)?.id ?? allLessons[0]?.id ?? "",
  );

  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(allLessons.filter((l) => l.completed).map((l) => l.id)),
  );

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Course not found
      </div>
    );
  }

  const activeLesson =
    allLessons.find((l) => l.id === activeLessonId) ?? allLessons[0];

  const activeLessonIndex = allLessons.findIndex(
    (l) => l.id === activeLessonId,
  );

  const hasNext = activeLessonIndex < allLessons.length - 1;

  const hasPrev = activeLessonIndex > 0;

  const markComplete = (id: string) => {
    setCompletedIds((prev) => new Set([...prev, id]));
  };

  const goNext = () => {
    markComplete(activeLessonId);

    if (hasNext) {
      setActiveLessonId(allLessons[activeLessonIndex + 1].id);
    }
  };

  const goPrev = () => {
    if (hasPrev) {
      setActiveLessonId(allLessons[activeLessonIndex - 1].id);
    }
  };

  const pct = Math.round((completedIds.size / allLessons.length) * 100);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Top Nav */}
      <header className="flex-shrink-0 bg-gray-900 text-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard/mylearning")}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm"
        >
          <ArrowLeft className="h-4 w-4" />

          <span className="hidden sm:inline">Back to My Learning</span>
        </button>

        <div className="h-4 w-px bg-gray-700 hidden sm:block" />

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
              className="h-1.5 rounded-full bg-blue-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <span className="text-xs text-gray-300">{pct}% complete</span>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Main */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Player */}
          <div className="bg-black w-full">
            <VideoPlayer
              lesson={activeLesson}
              onNext={goNext}
              onPrev={goPrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </div>

          {/* Lesson Header */}
          <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {activeLesson?.title}
                </h1>

                <p className="text-sm text-gray-500 mt-0.5">
                  Lesson {activeLessonIndex + 1} of {allLessons.length} ·{" "}
                  {activeLesson?.duration}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {hasPrev && (
                  <button
                    onClick={goPrev}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                  >
                    <SkipBack className="h-4 w-4" />
                    Prev
                  </button>
                )}

                {completedIds.has(activeLessonId) ? (
                  <div className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-green-600 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </div>
                ) : (
                  <button
                    onClick={() => markComplete(activeLessonId)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Complete
                  </button>
                )}

                {hasNext && (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
            <div className="flex gap-6 overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "curriculum", label: "Curriculum" },
                { id: "progress", label: "Progress" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`px-1 py-3 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Body */}
          <div className="px-4 sm:px-6 pb-10 flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6 py-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 mb-3">
                    About this lesson
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {activeLesson?.description ??
                      `This lesson covers ${activeLesson?.title}.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <Clock className="h-5 w-5 text-blue-600 mb-3" />
                    <p className="text-sm text-gray-500">Course Duration</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {course.duration}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <BookMarked className="h-5 w-5 text-green-600 mb-3" />
                    <p className="text-sm text-gray-500">Lessons</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {allLessons.length}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 p-5">
                    <Award className="h-5 w-5 text-amber-500 mb-3" />
                    <p className="text-sm text-gray-500">Completion</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {pct}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="py-6 space-y-4">
                {course.curriculum.map((section, sIdx) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
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
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${
                            lesson.id === activeLessonId ? "bg-blue-50" : ""
                          }`}
                        >
                          <span
                            className={`${
                              completedIds.has(lesson.id)
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
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

                          <span className="flex-1 text-sm text-gray-700">
                            {lesson.title}
                          </span>

                          <span className="text-xs text-gray-400">
                            {lesson.duration}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "progress" && (
              <div className="py-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-5">
                    Your Progress
                  </h3>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-extrabold text-blue-600">
                        {pct}%
                      </p>

                      <p className="text-xs text-gray-500 mt-1">Complete</p>
                    </div>

                    <div>
                      <p className="text-3xl font-extrabold text-green-500">
                        {completedIds.size}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">Done</p>
                    </div>

                    <div>
                      <p className="text-3xl font-extrabold text-gray-400">
                        {allLessons.length - completedIds.size}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">Remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex flex-col w-80 xl:w-96 flex-shrink-0 border-l border-gray-200 h-full">
          <CurriculumSidebar
            course={course}
            activeLessonId={activeLessonId}
            onSelect={setActiveLessonId}
            completedIds={completedIds}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
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
              onSelect={(id: string) => {
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
