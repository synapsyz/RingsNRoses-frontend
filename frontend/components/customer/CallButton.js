'use client'; // This is a client component because it uses hooks and event listeners

import { useState, useRef } from 'react';

// The component accepts an 'onCallClick' function as a prop
const CallButton = ({ onCallClick }) => {
  const [isCalling, setIsCalling] = useState(false);
  const buttonRef = useRef(null); // Get a reference to the button element

  const handleButtonClick = (event) => {
    // 1. Prevent multiple clicks while animating
    if (isCalling) return;

    // 2. Execute the function passed from the parent component
    if (onCallClick) {
      onCallClick(event);
    }
    
    // 3. Start the animation state
    setIsCalling(true);
    const button = buttonRef.current;

    // 4. Create and manage the ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - 50; // 50 is half of ripple's width/height
    const y = event.clientY - rect.top - 50;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);

    // Clean up the ripple element after the animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // 5. Reset the button state after the animation finishes
    setTimeout(() => {
      setIsCalling(false);
    }, 4000); // Reset after 4 seconds
  };
  
  // Dynamically build className strings based on the 'isCalling' state
  const buttonClasses = isCalling
    ? "bg-emerald-600 text-white w-auto" // Classes when calling
    : "border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950"; // Default classes

  const iconClasses = isCalling ? `text-white is-ringing` : `text-gray-800 dark:text-neutral-200`;

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden transition-all duration-300 ${buttonClasses}`}
      onClick={handleButtonClick}
      disabled={isCalling}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`size-6 transition-colors duration-300 ${iconClasses}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
        />
      </svg>
      {isCalling && <span className="animate-pulse">Calling...</span>}
    </button>
  );
};

export default CallButton;