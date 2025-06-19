import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900 transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                EcoTrack
              </span>
            </div>
            <p className="mt-4 text-gray-600 max-w-xs">
              Track your environmental impact and join a community committed to sustainable living.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              Features
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/actions" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Log Actions
                </Link>
              </li>
              <li>
                <Link to="/goals" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Set Goals
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-primary-600 transition-colors transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1">
            &copy; {new Date().getFullYear()} EcoTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
