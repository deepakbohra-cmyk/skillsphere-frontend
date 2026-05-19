import type { Course } from '../../data/courses';
import { CheckCircle2 } from 'lucide-react';

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

export default OverviewTab