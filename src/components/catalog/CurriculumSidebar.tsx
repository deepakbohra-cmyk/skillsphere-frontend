import React, { useState } from 'react'
import { getTotalLessons, type Course } from '../../data/courses';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Circle, ClipboardCheck, FileText, Play, X } from 'lucide-react';

const LESSON_ICON: Record<string, React.ReactNode> = {
  video: <Play className="h-3.5 w-3.5" />,
  reading: <BookOpen className="h-3.5 w-3.5" />,
  quiz: <ClipboardCheck className="h-3.5 w-3.5" />,
  assignment: <FileText className="h-3.5 w-3.5" />,
};

function fmtDuration(d: string) {
  return d;
}

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

export default CurriculumSidebar