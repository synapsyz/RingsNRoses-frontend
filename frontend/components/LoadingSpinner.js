import React from 'react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
    <div className="p-8 flex justify-center items-center gap-2">
      <div className="size-2 rounded-full bg-pink-500 animate-pulse"></div>
      <div className="size-2 rounded-full bg-pink-500 animate-pulse [animation-delay:0.2s]"></div>
      <div className="size-2 rounded-full bg-pink-500 animate-pulse [animation-delay:0.4s]"></div>
    </div>
  </div>
);

export default LoadingSpinner;