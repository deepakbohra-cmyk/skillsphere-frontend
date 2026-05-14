// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "../components/auth/signin";
import DashboardLayout from "../components/layout";

// Pages
import Dashboard from "../components/dashboard";

// Create these pages/components
import Catalog from "../components/catalog";
import MyLearning from "../components/mylearning";
import Assessments from "../components/assessments";

import Profile from "../components/profile";
import Resource from "../components/resource";
import Leaderboard from "../components/leaderboard";

import AdminPanel from "../components/admin";

function AppRouter() {
  // Replace with real auth state
  const isAuthenticated = true;

  return (
    <Routes>
      {/* Root Redirect */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />

      {/* Auth */}
      <Route
        path="/signin"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <SignIn />
          )
        }
      />

      {/* Protected Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      >
        {/* Main */}
        <Route index element={<Dashboard />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="mylearning" element={<MyLearning />} />
        <Route path="assessments" element={<Assessments />} />

        {/* Personal */}
        <Route path="profile" element={<Profile />} />
        <Route path="resource" element={<Resource />} />
        <Route path="leaderboard" element={<Leaderboard />} />

        {/* Admin */}
        <Route path="admin" element={<AdminPanel />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;