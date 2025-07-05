import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import BlogDetails from './pages/BlogDetails';

import { ROLES } from './config/roles'; 

// Auth + General
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Admin Pages (not lazy to avoid route nesting issues)
import AdminDashboard from './pages/admin/Dashboard';
import AdminActions from './pages/admin/Actions';
import AdminAnalytics from './pages/admin/Analytics';
import AdminUsers from './pages/admin/Users';
import AdminRewards from './pages/admin/Rewards';

// Lazy-Loaded Pages
const Goals = lazy(() => import('./pages/Goals'));
const Community = lazy(() => import('./pages/Community'));
const Actions = lazy(() => import('./pages/Actions'));
const Profile = lazy(() => import('./pages/Profile'));
const RewardList = lazy(() => import('./components/rewards/RewardList'));
const LeaderboardTable = lazy(() => import('./components/leaderboard/LeaderboardTable'));
const About = lazy(() => import('./pages/About'));
const VisitorProfiles = lazy(() => import('./pages/VisitorProfiles'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Feedback = lazy(() => import('./pages/admin/Feedback'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10 text-xl">Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/members" element={<VisitorProfiles />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/community" element={<Community />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* Registered + Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Registered, ROLES.Admin]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/log-action" element={<Actions />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/leaderboard" element={<LeaderboardTable />} />
            </Route>

            {/* Registered-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Registered]} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/rewards" element={<RewardList />} />
            </Route>

            {/* Admin-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/actions" element={<AdminActions />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics/*" element={<AdminAnalytics />} />
              <Route path="/admin/feedback" element={<Feedback />} />
              <Route path="/admin/rewards" element={<AdminRewards />} />
            </Route>

            {/* Catch-All */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
