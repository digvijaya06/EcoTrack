import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, BarChart2, Calendar, Target, Users, BookOpen, User } from 'lucide-react';
import Button from '../ui/Button';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 size={20} /> },
    { name: 'Log Actions', path: '/actions', icon: <Calendar size={20} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
    { name: 'Contact', path: '/contact', icon: <Leaf size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">EcoTrack</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 
                    ${isActive(link.path) 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-300'}`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link to="/profile">
              <Button
                variant="ghost"
                className="flex items-center"
                leftIcon={<User size={18} />}
              >
                Profile
              </Button>
            </Link>
            <Link to="/login" className="ml-4">
              <Button variant="primary">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
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
                className={`flex items-center pl-3 pr-4 py-3 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-primary-300 hover:text-primary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              to="/profile"
              className="flex items-center pl-3 pr-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-primary-300 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} className="mr-3" />
              Profile
            </Link>
            <div className="pt-2 pb-3 px-5">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;