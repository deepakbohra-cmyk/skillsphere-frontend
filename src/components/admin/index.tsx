import {
  Lock,
  AlertCircle,
} from "lucide-react";

function Admin() {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <Lock className="w-5 h-5 text-amber-500 mt-0.5" />
        <p className="text-sm text-amber-800">
          Admin / Lead access only. Showing read-only preview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Learners</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">142</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active Courses</p>
          <h3 className="text-3xl font-bold text-emerald-500 mt-2">18</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Attempt Breach Alerts
          </p>
          <h3 className="text-3xl font-bold text-red-500 mt-2">4</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Avg Completion Rate
          </p>
          <h3 className="text-3xl font-bold text-amber-500 mt-2">
            73%
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Attempt Alerts */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Attempt Limit Breach Alerts
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Arjun Kumar
                  </h4>
                  <p className="text-xs text-gray-500">
                    Cybersecurity Basics · 5/5 attempts ·
                    Notified
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                  Notified
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Sneha Patel
                  </h4>
                  <p className="text-xs text-gray-500">
                    ETL Advanced · 5/5 attempts ·
                    Notified
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                  Notified
                </span>
              </div>
            </div>
          </div>

          {/* Weightage Config */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Weightage Configuration
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    New Process Assessments
                  </h4>
                  <p className="text-xs text-gray-500">
                    Full credit
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                  1.0×
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Legacy Process Assessments
                  </h4>
                  <p className="text-xs text-gray-500">
                    Reduced credit
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600">
                  0.5×
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Team Progress
            </h2>

            <div className="space-y-5">
              {/* Schema Team */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Schema Team
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    78%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-blue-600 rounded-full" />
                </div>
              </div>

              {/* Data Engineering */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Data Engineering
                  </span>
                  <span className="text-sm font-semibold text-emerald-500">
                    65%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-emerald-500 rounded-full" />
                </div>
              </div>

              {/* Security Team */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Security Team
                  </span>
                  <span className="text-sm font-semibold text-amber-500">
                    54%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[54%] bg-amber-500 rounded-full" />
                </div>
              </div>

              {/* New Joiners */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    New Joiners
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    32%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[32%] bg-red-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;