import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
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

// Lazy-loaded components
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));

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
              <Route path="/community" element={<Community />} />
              <Route path="/actions" element={<ActionsList />} />
              <Route path="/leaderboard" element={<LeaderboardTable />} />
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
