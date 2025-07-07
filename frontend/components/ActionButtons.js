import React from 'react';
import { useRouter } from 'next/router';

const ActionButtons = ({
  isMinimized,
  onDeleteClick,
  onCancelClick,
  onSaveClick,
  onMinimizeClick,
  onRestoreClick
}) => {
  const router = useRouter();

  // Use the passed onCancelClick function, or default to router.back()
  const handleCancel = onCancelClick || (() => router.back());

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onRestoreClick}
          className="flex items-center justify-center size-14 bg-stone-800 text-white rounded-full shadow-lg hover:bg-stone-700 transition-all duration-300 hover:scale-105 dark:bg-neutral-950"
          aria-label="Restore actions"
        >
          <span className="text-green-400 decoration-2 font-medium text-sm hover:underline px-3 py-1">
            Save
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 start-0 end-0 z-40 p-2 transition-transform duration-300">
      <div className="mx-auto w-fit bg-stone-800 dark:bg-neutral-950 shadow-lg rounded-xl sm:rounded-full p-2">
        <div className="flex items-center justify-center flex-wrap gap-x-3">
          <button
            type="button"
            onClick={onDeleteClick}
            className="text-red-400 decoration-2 font-medium text-sm hover:underline px-3 py-1"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-stone-300 decoration-2 font-medium text-sm hover:underline px-3 py-1"
          >
            Cancel
          </button>
          
          <div className="w-px h-4 bg-stone-700 dark:bg-neutral-700"></div>
          
          <button
            type="submit"
            onClick={onSaveClick}
            className="text-green-400 decoration-2 font-medium text-sm hover:underline px-3 py-1"
          >
            Save changes
          </button>
          
          <button
            type="button"
            onClick={onMinimizeClick}
            className="size-8 inline-flex justify-center items-center rounded-full text-stone-400 hover:bg-stone-700"
            aria-label="Minimize"
          >
            <span className="sr-only">Minimize</span>
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;