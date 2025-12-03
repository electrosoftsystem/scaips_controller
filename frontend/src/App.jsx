import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/layout";
import { ProtectedRoute, PublicRoute, AuthLayout } from "./components/auth";
import RootRoute from "./components/auth/RootRoute";
import Home from "./pages/Home";

// Profile Pages
import StartupProfilePage from "./pages/startup/StartupProfilePage";
import IndustryProfilePage from "./pages/industry/IndustryProfilePage";
import CollegeProfilePage from "./pages/college/CollegeProfilePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";

// Dashboard Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import StartupDashboard from "./pages/startup/StartupDashboard";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import CompleteGoogleSignup from "./pages/auth/CompleteGoogleSignup";
import GoogleAuthTest from "./components/GoogleAuthTest";

// GitHub Auth Pages
import GitHubAuthSuccess from "./pages/auth/github/GitHubAuthSuccess";
import CompleteGitHubSignup from "./pages/auth/github/CompleteGitHubSignup";
import ConnectionsPage from "./pages/student/StudentConnection";
import MessagesPage from "./pages/student/StudentMessage";
import NotificationsPage from "./pages/student/StudentNotification";
import ProjectsPage from "./pages/student/StudentsProjects";
import StudentPortfolioPage from "./pages/student/StudentPortfolioPage";
import StudentResumePage from "./pages/student/resume/StudentResumePage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import AdminLogin from "./pages/auth/AdminLogin";
import AdminPage from "./pages/auth/AdminPage";
import NotifyAll from "./components/student/NotifyAll";
import AdminRegister from "./pages/auth/AdminRegister";

// commit
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Only accessible when NOT logged in */}
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <PublicRoute>
                <AuthLayout>
                  <SignupPage />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/forgot-password"
            element={
              <PublicRoute>
                <AuthLayout>
                  <ForgotPasswordPage />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              <PublicRoute>
                <AuthLayout>
                  <ResetPasswordPage />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PublicRoute>
                <AuthLayout>
                  <AdminPage/>
                </AuthLayout>
              </PublicRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PublicRoute>
                <AuthLayout>
                  <AdminLogin/>
                </AuthLayout>
              </PublicRoute>
            }
          />

            <Route
            path="/admin/register"
            element={
              <PublicRoute>
                <AuthLayout>
                  <AdminRegister/>
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/complete-google-signup"
            element={
              <PublicRoute>
                <AuthLayout>
                  <CompleteGoogleSignup />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/google-test"
            element={
              <AuthLayout>
                <GoogleAuthTest />
              </AuthLayout>
            }
          />
          <Route
            path="/auth/verify-email"
            element={
              <PublicRoute>
                <AuthLayout>
                  <VerifyEmailPage />
                </AuthLayout>
              </PublicRoute>
            }
          />

          {/* GitHub Auth Routes */}
          <Route
            path="/auth/github/callback"
            element={
              <PublicRoute>
                <AuthLayout>
                  <GitHubAuthSuccess />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/github/success"
            element={
              <PublicRoute>
                <AuthLayout>
                  <GitHubAuthSuccess />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/auth/complete-github-signup"
            element={
              <PublicRoute>
                <AuthLayout>
                  <CompleteGitHubSignup />
                </AuthLayout>
              </PublicRoute>
            }
          />

          {/* Root Route - Handles authentication redirect */}
          {/* <Route path="/" element={<RootRoute />} /> */}

          {/* Role-specific Dashboard Routes */}
          {/* <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/message"
            element={
              <ProtectedRoute>
                <Layout>
                  <MessagesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/connection"
            element={
              <ProtectedRoute>
                <Layout>
                  <ConnectionsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/projects"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProjectsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/notification"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <AlumniDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/industry/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/startup/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupDashboard />
                </Layout>
              </ProtectedRoute>
            }
          /> */}

          {/* Role-specific Profile Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <>
                <Layout>
                  <NotifyAll />
                </Layout>
              </>
            }
          />
          <Route
            path="/student/portfolio/:username?"
            element={
              <Layout>
                <StudentPortfolioPage />
              </Layout>
            }
          />

          <Route
            path="/student/resume/:username?"
            element={
              <Layout>
                <StudentResumePage />
              </Layout>
            }
          />
          {/* <Route
            path="/alumni/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/startup/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/industry/profile/:routeId?"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/startup-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <StartupProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/industry/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <IndustryProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-profile/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          /> */}

          {/* Catch-all route - redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}
export default App;
