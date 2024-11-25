import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* SVG Illustration */}
        <div className="mb-8 w-full flex justify-center">
          <svg 
            className="w-48 h-48 text-secondary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Error Code */}
          <h1 className="text-8xl font-bold text-secondary">
            404
          </h1>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-gray-600">
              Oops! It seems you've wandered into unknown territory.
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/"
              className="btn btn-secondary text-white min-w-[160px]"
            >
              Return Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-secondary text-white min-w-[160px]"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;