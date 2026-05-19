import React, { useCallback, useRef, useState } from 'react'
import {
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText,
  ClipboardCheck,
  BookOpen,
  Play,
} from "lucide-react";
import { type Lesson } from "../../data/courses";

const LESSON_ICON: Record<string, React.ReactNode> = {
  video: <Play className="h-3.5 w-3.5" />,
  reading: <BookOpen className="h-3.5 w-3.5" />,
  quiz: <ClipboardCheck className="h-3.5 w-3.5" />,
  assignment: <FileText className="h-3.5 w-3.5" />,
};
    
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

export default VideoPlayer