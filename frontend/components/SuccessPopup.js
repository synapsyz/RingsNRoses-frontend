// components/SuccessPopup.js
'use client';

import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessPopup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white dark:bg-neutral-800 text-center px-6 py-5 rounded-xl shadow-xl animate-pop">
        <FaCheckCircle className="text-green-500 mx-auto text-4xl animate-bounce" />
        <p className="mt-2 font-semibold text-stone-800 dark:text-neutral-100">{message}</p>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
