// components/customer/ContactModal.js
import React from 'react';

const ContactModal = ({ show, onClose, contactName, contactNumber, alternateNumber }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-100">Contact Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-700 dark:text-neutral-300">
          <p className="mb-2">
            <strong>Contact Name:</strong> {contactName}
          </p>
          <p className="mb-2">
            <strong>Contact Number:</strong> <a href={`tel:${contactNumber}`} className="text-blue-600 hover:underline">{contactNumber}</a>
          </p>
          <p>
            <strong>Contact Number:</strong> <a href={`tel:${alternateNumber}`} className="text-blue-600 hover:underline">{alternateNumber}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;