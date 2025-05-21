import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🌿</span>
              <span className="font-bold text-lg text-primary-800">GreenPoints</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Track your eco-friendly actions, earn points, and make a positive impact on our planet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="Twitter">
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="Instagram">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="GitHub">
                <span className="text-lg">💻</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="Email">
                <span className="text-lg">✉️</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/actions" className="text-gray-600 hover:text-primary-600">
                  Log Actions
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-600 hover:text-primary-600">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary-600">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GreenPoints. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
