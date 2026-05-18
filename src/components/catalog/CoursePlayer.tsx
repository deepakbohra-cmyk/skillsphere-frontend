// src/components/catalog/CoursePlayer.tsx
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
  Star,
  Users,
  Clock,
  Award,
  ChevronRight,
  Menu,
  X,
  Lock,
} from "lucide-react";
import {
  getCourse,
  getTotalLessons,
  getCompletedLessons,
  type Lesson,
  type Course,
} from "../../data/courses";

/* ── helpers ─────────────────────────────────────────────────────── */
function fmtDuration(d: string) {
  return d;
}

const LESSON_ICON: Record<string, React.ReactNode> = {
  video: <Play className="h-3.5 w-3.5" />,
  reading: <BookOpen className="h-3.5 w-3.5" />,
  quiz: <ClipboardCheck className="h-3.5 w-3.5" />,
  assignment: <FileText className="h-3.5 w-3.5" />,
};

/* ── sub-components ───────────────────────────────────────────────── */
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-4 w-4 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-amber-600">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-gray-500">
        ({count.toLocaleString()} ratings)
      </span>
    </div>
  );
}

/* ── VideoPlayer ─────────────────────────────────────────────────── */
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
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-white">
          {LESSON_ICON[lesson.type]}
        </div>
        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-gray-400 text-sm mb-6">
          {lesson.type === "quiz" &&
            "Complete this knowledge check to continue."}
          {lesson.type === "reading" &&
            "Read the material below and proceed to the next lesson."}
          {lesson.type === "assignment" &&
            "Submit your assignment to complete this module."}
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
      {/* YouTube iframe */}
      {lesson.videoUrl ? (
        <iframe
          src={`${lesson.videoUrl}?autoplay=0&rel=0&modestbranding=1&${muted ? "mute=1" : ""}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          title={lesson.title}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <Play className="h-16 w-16 opacity-20" />
        </div>
      )}

      {/* Custom overlay controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className="text-white/80 hover:text-white transition p-1"
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
            className="text-white/80 hover:text-white disabled:opacity-30 transition p-1"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="text-white/80 hover:text-white disabled:opacity-30 transition p-1"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-white/80 hover:text-white transition p-1"
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

/* ── CurriculumSidebar ───────────────────────────────────────────── */
function CurriculumSidebar({
  course,
  activeLessonId,
  onSelect,
  completedIds,
  onClose,
}: {
  course: Course;
  activeLessonId: string;
  onSelect: (lessonId: string) => void;
  completedIds: Set<string>;
  onClose?: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalLessons = getTotalLessons(course);
  const completedCount = completedIds.size;
  const pct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Course Content</h3>
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
          {completedCount}/{totalLessons} lessons · {pct}% complete
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
        {course.curriculum.map((section, sIdx) => {
          const isCollapsed = collapsed.has(section.id);
          const sectionCompleted = section.lessons.filter((l) =>
            completedIds.has(l.id),
          ).length;
          return (
            <div
              key={section.id}
              className="border-b border-gray-100 last:border-b-0"
            >
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-start justify-between gap-2 px-4 py-3 hover:bg-gray-50 transition text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 leading-snug">
                    Section {sIdx + 1}: {section.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {sectionCompleted}/{section.lessons.length} ·{" "}
                    {section.lessons.reduce((a, l) => a, 0)} lessons
                  </p>
                </div>
                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
              </button>

              {!isCollapsed && (
                <div>
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isDone = completedIds.has(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelect(lesson.id)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left transition hover:bg-gray-50 border-l-2 ${
                          isActive
                            ? "bg-blue-50 border-blue-600"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex-shrink-0 ${isDone ? "text-green-500" : isActive ? "text-blue-600" : "text-gray-300"}`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs leading-snug ${isActive ? "font-semibold text-blue-700" : "text-gray-700"}`}
                          >
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className={`${isActive ? "text-blue-500" : "text-gray-400"}`}
                            >
                              {LESSON_ICON[lesson.type]}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {fmtDuration(lesson.duration)}
                            </span>
                            {lesson.free && (
                              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                Free
                              </span>
                            )}
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
      </div>
    </div>
  );
}

/* ── Tab content ─────────────────────────────────────────────────── */
type TabId = "overview" | "curriculum" | "instructor" | "reviews";

function OverviewTab({ course }: { course: Course }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="font-bold text-gray-900 mb-3">What You'll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {course.whatYouLearn.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Requirements</h3>
        <ul className="space-y-1.5">
          {course.requirements.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="text-gray-400 mt-0.5">•</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">About This Course</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {course.description}
        </p>
      </div>
    </div>
  );
}

function InstructorTab({ course }: { course: Course }) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {course.instructor.initials}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{course.instructor.name}</h3>
          <p className="text-sm text-gray-500">{course.instructor.title}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              {course.rating} rating
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.enrolledCount.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        {course.instructor.name} is a seasoned{" "}
        {course.instructor.title.toLowerCase()} with years of hands-on
        experience. Their courses are known for clarity, depth, and practical
        examples drawn from real production systems.
      </p>
    </div>
  );
}

function ReviewsTab({ course }: { course: Course }) {
  const reviews = [
    {
      name: "Priya S.",
      initials: "PS",
      rating: 5,
      text: "Excellent course — very hands-on and practical. Filled gaps I didn't even know I had.",
      time: "2 weeks ago",
    },
    {
      name: "Ravi M.",
      initials: "RM",
      rating: 5,
      text: "The best structured course I've taken on this topic. Highly recommended for any developer.",
      time: "1 month ago",
    },
    {
      name: "Ananya I.",
      initials: "AI",
      rating: 4,
      text: "Great content overall. Some sections felt a bit rushed but the core material is excellent.",
      time: "1 month ago",
    },
  ];
  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-5xl font-extrabold text-gray-900">
            {course.rating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${s <= Math.round(course.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-1">Course Rating</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-amber-400"
                  style={{
                    width:
                      s === 5 ? "72%" : s === 4 ? "20%" : s === 3 ? "5%" : "2%",
                  }}
                />
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((x) => (
                  <Star
                    key={x}
                    className={`h-3 w-3 ${x <= s ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4 mt-4">
        {reviews.map((r, i) => (
          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {r.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${s <= r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">{r.time}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
