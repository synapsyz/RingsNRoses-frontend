import Link from 'next/link'; // Keep if you plan to use Next.js Link for navigation
import React, { useEffect } from 'react'; // Import useEffect

const TransferConfirmation = () => {
  useEffect(() => {
    // Dynamically import confetti to ensure it's client-side and only when needed
    // This also handles cases where 'window' might not be defined during server-side rendering
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default; // Get the default export
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            y: 0.6
          }
        });
      });
    }

    // For clipboard.js, you'd typically install it via npm and then initialize
    // a new Clipboard instance here if you have elements with data-clipboard attributes.
    // Example:
    /*
    import ClipboardJS from 'clipboard';
    const clipboard = new ClipboardJS('.btn'); // Or whatever your selector is
    return () => {
      clipboard.destroy(); // Clean up on unmount
    };
    */
    // For simplicity, I'm omitting a full clipboard example, as it depends on your usage.
    // If hs-copy-clipboard-helper.js provides functionality, you'd either replicate it
    // or integrate it based on its specific API.
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  return (
    // Use a React Fragment to wrap the entire content
    <>
      {/* Success Message */}
      <div className="py-20 max-w-lg mx-auto">
        {/* Icon */}
        <div className="mb-5 sm:mb-7 text-center">
          <span className="shrink-0 size-14 md:size-16 mx-auto flex justify-center items-center border-2 border-purple-500 text-purple-500 rounded-full">
            <svg className="shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </span>
        </div>
        {/* End Icon */}

        {/* Heading */}
        <div className="mb-5 sm:mb-8 text-center">
          <h1 className="mb-1 md:mb-3 font-semibold text-xl md:text-2xl text-gray-800 dark:text-neutral-200">
            Your transfer is on the way
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            We've scheduled a transfer of 52.25 USD to your Preline balance. This transfer will be sent from your USD Debit Card.
          </p>
        </div>
        {/* End Heading */}

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {/* Use Next.js Link component for internal navigation */}
          <Link href="../../pro/payment/transactions.html" className="py-3 px-4 inline-flex justify-center items-center gap-x-1.5 font-medium text-sm rounded-xl border border-transparent bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-purple-600">
            Manage your transfers
          </Link>

          <Link href="../../pro/payment/add-money.html" className="py-3 px-4 inline-flex justify-center items-center gap-x-1.5 font-medium text-sm rounded-xl border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            Add another money
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        {/* End Button Group */}
      </div>
      {/* End Success Message */}
    </> // Closing React Fragment
  );
};

export default TransferConfirmation;