import { Star } from 'lucide-react';
import type { Course } from '../../data/courses';

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

export default ReviewsTab