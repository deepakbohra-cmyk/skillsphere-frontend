import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/user";

import SignIn from "../components/auth/signin";

import DashboardLayout from "../components/layout";

import Dashboard from "../components/dashboard";

import Catalog from "../components/catalog";

import MyLearning from "../components/mylearning";

import Assessments from "../components/assessments";

import Profile from "../components/profile";

import Resource from "../components/resource";

import Leaderboard from "../components/leaderboard";

import AdminPanel from "../components/admin";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

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

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="catalog" element={<Catalog />} />

          <Route path="mylearning" element={<MyLearning />} />

          <Route path="assessments" element={<Assessments />} />

          <Route path="profile" element={<Profile />} />

          <Route path="resource" element={<Resource />} />

          <Route path="leaderboard" element={<Leaderboard />} />

          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
