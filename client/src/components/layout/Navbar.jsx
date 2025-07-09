import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Leaf, BarChart2, Calendar, Target,
  Users, BookOpen, User, TrendingUp
} from 'lucide-react';
import Button from '../ui/Button';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const visitorHomeLinks = [
    { name: 'About', path: '/about', icon: <BarChart2 size={20} /> },
    { name: 'Contact', path: '/contact', icon: <User size={20} /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={20} /> },
    { name: 'Careers', path: '/careers', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <TrendingUp size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
  ];

  const getLoggedInLinks = (user) => {
    if (user?.isAdmin) {
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <BarChart2 size={20} /> },
        { name: 'Actions', path: '/admin/actions', icon: <Calendar size={20} /> },
        { name: 'Community', path: '/community', icon: <Users size={20} /> },
      ];
    } else {
      return [
        { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 size={20} /> },
        { name: 'Log Actions', path: '/log-action', icon: <Calendar size={20} /> },
        { name: 'Goals', path: '/goals', icon: <Target size={20} /> },
        { name: 'Community', path: '/community', icon: <Users size={20} /> },
        { name: 'Profile', path: '/profile', icon: <User size={20} /> },
      ];
    }
  };

  const adminDropdownLinks = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Feedback / Contact Submissions', path: '/admin/feedback' },
    { name: 'Rewards', path: '/admin/rewards' },
  ];

  const protectedPaths = ['/dashboard', '/admin/dashboard', '/admin/actions', '/log-action', '/goals', '/resources'];

  const handleProtectedClick = (e, path) => {
    if (!isAuthenticated && protectedPaths.includes(path)) {
      e.preventDefault();
      console.warn('Please login to access this feature.');
    }
  };

  const handleAdminDropdownChange = (e) => {
    const selectedPath = e.target.value;
    if (selectedPath) {
      navigate(selectedPath);
    }
  };

  const navLinks = !isAuthenticated ? visitorHomeLinks : getLoggedInLinks(user);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">EcoLog</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleProtectedClick(e, link.path)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 
                    ${isActive(link.path)
                      ? 'text-gray-900 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-300'}`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              {isAuthenticated && user?.isAdmin && (
                <div className="relative group inline-block ml-4">
                  <button className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-600 hover:text-primary-600 focus:outline-none`}>
                    Admin Panel
                    <svg
                      className="ml-1 h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L15.484 9l-5.484 5.484L4.516 9z" />
                    </svg>
                  </button>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 w-48 z-10">
                    {adminDropdownLinks.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <Button
                variant="green"
                className="ml-4 bg-green-600 hover:bg-green-700 border-green-600"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/login" className="ml-4">
                <Button className="bg-green-600 hover:bg-green-700 border-green-600">Sign In</Button>
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 space-y-1 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  handleProtectedClick(e, link.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center pl-3 pr-4 py-3 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            {isAuthenticated ? (
              <Button
                variant="green"
                className="w-full"
                onClick={() => {
                  logout();
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-green-600 hover:bg-green-700 border-green-600">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
