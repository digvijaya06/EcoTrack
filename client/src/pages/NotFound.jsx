import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center">
          <Leaf className="h-16 w-16 text-primary-600" />
        </div>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-4 text-gray-500 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 space-y-3">
          <Link to="/">
            <Button className="w-full" leftIcon={<Home size={18} />}>
              Go to Homepage
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="text-primary-600 hover:text-primary-700 flex items-center justify-center w-full"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
