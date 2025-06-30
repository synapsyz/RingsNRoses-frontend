import React, { useEffect, useState, useRef } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
    const [inputValue, setInputValue] = useState('');

    
    useEffect(() => {
        if (!isOpen) {
          
            setTimeout(() => setInputValue(''), 200);
        }
    }, [isOpen]);

    const isButtonDisabled = inputValue !== 'CONFIRM';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center transition-opacity duration-150 ease-linear">
            <div className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-lg mx-4 p-6 transform transition-all duration-300 ease-out scale-95 animate-scale-in">
                <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <div className="ml-4 text-left flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100" id="modal-title">{title}</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-neutral-400">{children}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <label htmlFor="confirm-input" className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                        Type "<strong>CONFIRM</strong>" to delete
                    </label>
                    <input
                        id="confirm-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="CONFIRM"
                        className="mt-1 py-2 px-3 block w-full border border-stone-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white"
                        autoComplete="off"
                    />
                </div>

                <div className="mt-6 sm:flex sm:flex-row-reverse sm:gap-x-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isButtonDisabled}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm disabled:bg-red-400 disabled:cursor-not-allowed dark:focus:ring-offset-neutral-800 dark:disabled:bg-red-500/50"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-800"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmationModal;