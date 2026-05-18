import { Star, Users } from 'lucide-react';
import React from 'react'
import type { Course } from '../../data/courses';

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

export default InstructorTab