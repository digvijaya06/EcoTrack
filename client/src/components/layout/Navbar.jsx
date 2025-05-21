import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', text: '📊 Dashboard' },
    { to: '/actions', text: '➕ Log Actions' },
    { to: '/leaderboard', text: '🏆 Leaderboard' },
    { to: '/resources', text: '📚 Resources' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Branding */}
          <Link to="/dashboard" className="flex items-center space-x-2 text-green-700 font-bold text-xl">
            <span className="text-2xl">🌱</span>
            <span>GreenPoints</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {link.text}
              </NavLink>
            ))}

            {user ? (
              <>
                <Link to="/profile" className="text-sm text-gray-700 hover:text-green-700">
                  👤 {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-sm text-gray-700 hover:text-red-600"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm text-gray-700 hover:text-green-700">
                🔑 Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block text-sm px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}

          <div className="border-t pt-2">
            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu} className="block text-sm text-gray-700 py-1">
                  👤 {user.name}
                </Link>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="w-full text-left text-sm text-red-600 py-1"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="block text-sm text-gray-700 py-1">
                🔑 Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
