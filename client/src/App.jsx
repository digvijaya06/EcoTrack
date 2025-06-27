import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ForgotPassword from './pages/ForgotPassword';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Goals from './pages/Goals';
import Community from './pages/Community';
import ActionsList from './pages/ActionsList';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import RewardList from './components/rewards/RewardList';
import LeaderboardTable from './components/leaderboard/LeaderboardTable';
import About from './pages/About';
import VisitorProfiles from './pages/VisitorProfiles';
import Actions from './pages/Actions';  // Updated import to Actions page
import Analytics from './pages/Analytics';
import BlogDetails from './pages/BlogDetails';
import AdminActions from './pages/admin/Actions';  // Import Admin Actions page

// Lazy-loaded components
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));

// Roles
const ROLES = {
  Visitor: 'visitor',
  Registered: 'registered',
  Admin: 'admin',
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10 text-xl">Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
          
            {/* Public Routes */}
            <Route path='/members' element= {<VisitorProfiles/>} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Registered, ROLES.Admin]} />}>
              <Route path="/log-action" element={<Actions />} />
            </Route>
            <Route path='/analytics' element={<Analytics/>}/>
           
            {/* Protected for Registered & Admin */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Registered, ROLES.Admin]} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/rewards" element={<RewardList />} />
            </Route>


            {/* Admin and Registered Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Registered, ROLES.Admin]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/actions" element={<ActionsList />} />
              <Route path="/leaderboard" element={<LeaderboardTable />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/actions" element={<AdminActions />} />
            </Route>
            {/* Public Community Route */}
            <Route path="/community" element={<Community />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
