import React, { useEffect } from 'react';
import Link from 'next/link';

// --- Animation Styles Component ---
// This keeps our animation CSS clean and separate from the component logic.
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: scale(0.5);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes background-pan {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .animate-fadeIn-up {
      animation: fadeIn-up 0.8s ease-out forwards;
    }
    .animate-pop-in {
      animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .animate-background-pan {
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      background-size: 200% 200%;
      animation: background-pan 15s ease infinite;
    }
    .dark .animate-background-pan {
      background-image: linear-gradient(120deg, #2c3e50 0%, #4ca1af 100%);
    }

    /* Staggered animation delays */
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-600 { animation-delay: 0.6s; }
  `}</style>
);

const TransferConfirmation = () => {
  useEffect(() => {
    // This effect runs once after the component mounts to trigger the confetti.
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default;
        
        // A more celebratory confetti effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      });
    }
  }, []);

  return (
    <>
      <AnimationStyles />
      <div className="min-h-screen flex items-center justify-center animate-background-pan p-4">
        {/* Glassmorphism Card */}
        <div className="w-full max-w-lg mx-auto bg-white/60 dark:bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-white/30 dark:border-black/30">
          
          {/* Animated Icon */}
          <div className="mb-6 text-center">
            <div className="inline-block animate-pop-in">
              <div className="flex justify-center items-center size-20 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg shadow-purple-500/40">
                <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
            </div>
          </div>
          {/* End Icon */}

          {/* Animated Heading */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 font-bold text-2xl md:text-3xl text-gray-800 dark:text-neutral-100 opacity-0 animate-fadeIn-up delay-200">
              Your transfer is on the way
            </h1>
            <p className="text-sm text-gray-600 dark:text-neutral-400 opacity-0 animate-fadeIn-up delay-400">
              We've scheduled a transfer of <strong>52.25 USD</strong> to your Preline balance. This will be sent from your USD Debit Card.
            </p>
          </div>
          {/* End Heading */}

          {/* Animated Button Group */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fadeIn-up delay-600">
            <Link href="#" className="py-3 px-5 inline-flex justify-center items-center gap-x-2 font-semibold text-sm rounded-xl border border-transparent bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-600/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none">
              Manage your transfers
            </Link>
            <Link href="#" className="py-3 px-5 inline-flex justify-center items-center gap-x-2 font-semibold text-sm rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700">
              Add another money
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>
          {/* End Button Group */}
        </div>
      </div>
    </>
  );
};

export default TransferConfirmation;
