// src/router/AppRouter.tsx

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/user";

import SignIn from "../components/auth/signin";

import DashboardLayout from "../components/layout";

import Dashboard from "../components/dashboard";

import Catalog from "../components/catalog";
import CoursePlayer from "../components/catalog/CoursePlayer";

import MyLearning from "../components/mylearning";
import LearningPathPlayer from "../components/mylearning/LearningPathPlayer";

import Assessments from "../components/assessments";

import Profile from "../components/profile";
import Resource from "../components/resource";
import Leaderboard from "../components/leaderboard";

import AdminPanel from "../components/admin";

/* ───────────────────────────────────────────── */
/* Protected Route */
/* ───────────────────────────────────────────── */

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />

          <div className="text-sm text-gray-500 font-medium">
            Loading SkillSphere…
          </div>
        </div>
      </div>
    );
  }

  // if (!user) {
  //   return <Navigate to="/signin" replace />;
  // }

  return <Outlet />;
};

/* ───────────────────────────────────────────── */
/* Public Route */
/* ───────────────────────────────────────────── */

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading…</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/* ───────────────────────────────────────────── */
/* Router */
/* ───────────────────────────────────────────── */

function AppRouter() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public */}
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Catalog */}
          <Route path="catalog" element={<Catalog />} />

          {/* Course Player INSIDE layout */}
          <Route path="course/:courseId" element={<CoursePlayer />} />

          {/* Learning */}
          <Route path="mylearning" element={<MyLearning />} />

          {/* Learning Path Player INSIDE layout */}
          <Route path="learn/:pathId" element={<LearningPathPlayer />} />

          {/* Others */}
          <Route path="assessments" element={<Assessments />} />

          <Route path="profile" element={<Profile />} />

          <Route path="resource" element={<Resource />} />

          <Route path="leaderboard" element={<Leaderboard />} />

          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRouter;
