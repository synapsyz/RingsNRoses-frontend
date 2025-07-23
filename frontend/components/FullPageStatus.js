// components/FullPageStatus.js

import React from 'react';

export default function FullPageStatus({ loading = false, success = false }) {
    if (!loading && !success) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
        {loading && (
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
  
        {success && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center animate-ping-slow">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 mt-4 font-semibold text-lg animate-fade-in">
              Saved Successfully!
            </p>
          </div>
        )}
      </div>
    );
  }
  