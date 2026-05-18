import React from 'react'
import {
  Star,
} from "lucide-react";

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

export default StarRating