import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';
import Head from 'next/head';

// --- Animation Styles Component ---
const AnimationStyles = () => (
  <style jsx global>{`
    /* Fade/Pop In Animations */
    @keyframes fadeIn-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
    @keyframes pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes fadeIn-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
    
    /* Background Animation */
    @keyframes aurora-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

    /* Animated Tick Keyframes */
    @keyframes scale-in { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes draw-circle { to { stroke-dashoffset: 0; } }
    @keyframes draw-check { to { stroke-dashoffset: 0; } }
    @keyframes fill-circle { from { fill: transparent; } to { fill: #22c55e; /* green-500 */ } }

    /* Animation Utility Classes */
    .animate-fadeIn-down { animation: fadeIn-down 0.6s ease-out forwards; }
    .animate-pop-in { animation: pop-in 0.4s ease-out forwards; }
    .animate-fadeIn-up { animation: fadeIn-up 0.8s ease-out forwards; }
    .animate-aurora-pan {
        background-image: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.1) 0px, transparent 50%), 
                          radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.1) 0px, transparent 50%),
                          radial-gradient(at 74% 94%, hsla(333, 98%, 62%, 0.1) 0px, transparent 50%);
        background-size: 300% 300%;
        animation: aurora-pan 20s ease infinite;
    }
    .dark .animate-aurora-pan { background-image: linear-gradient(120deg, #2c3e50 0%, #4ca1af 100%); }

    /* Staggered animation delays */
    .pricing-card:nth-child(1) { animation-delay: 0.2s; }
    .pricing-card:nth-child(2) { animation-delay: 0.3s; }
    .pricing-card:nth-child(3) { animation-delay: 0.4s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-600 { animation-delay: 0.6s; }
    
    /* 3D Tilt Effect */
    .card-3d { transform-style: preserve-3d; transition: transform 0.4s ease-out; }
    
    /* Animated Tick Classes */
    .animated-tick { display: inline-block; width: 80px; height: 80px; animation: scale-in 0.5s ease-out forwards; }
    .animated-tick__circle { stroke: #22c55e; stroke-width: 3; stroke-dasharray: 240; stroke-dashoffset: 240; fill: transparent; transform: rotate(-90deg); transform-origin: center; animation: draw-circle 0.7s ease-in-out 0.5s forwards, fill-circle 0.4s ease-in-out 1.2s forwards; }
    .animated-tick__check { stroke: #ffffff; stroke-width: 4; stroke-dasharray: 50; stroke-dashoffset: 50; stroke-linecap: round; stroke-linejoin: round; animation: draw-check 0.4s ease-in-out 1.2s forwards; }
  `}</style>
);

const PaymentSuccess = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Trigger Confetti
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default;
        
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
        function randomInRange(min, max) { return Math.random() * (max - min) + min; }
        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) { return clearInterval(interval); }
          const particleCount = 50 * (timeLeft / duration);
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      });

      // 2. Play Sound Effect
      // We check if Tone.js is available (it's loaded via script in a real app)
      if (typeof Tone !== 'undefined') {
        // Create a simple synth and play a pleasant C-major chord
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        // The sound is timed to play shortly after the animation starts
        synth.triggerAttackRelease(["C5", "E5", "G5"], "8n", Tone.now() + 0.5);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-white/60 dark:bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-white/30 dark:border-black/30">
      <div className="mb-6 text-center">
        <svg className="animated-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <circle className="animated-tick__circle" cx="40" cy="40" r="38"/>
          <path className="animated-tick__check" d="M24 40l10 10 22-22" fill="none"/>
        </svg>
      </div>
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-bold text-2xl md:text-3xl text-gray-800 dark:text-neutral-100 opacity-0 animate-fadeIn-up delay-200">Payment Successful!</h1>
        <p className="text-sm text-gray-600 dark:text-neutral-400 opacity-0 animate-fadeIn-up delay-400">
          Thank you! Your <strong>{planName}</strong> for <strong>{amount} {currency}</strong> has been activated.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fadeIn-up delay-600">
        <button onClick={onGoBack} className="py-3 px-5 inline-flex justify-center items-center gap-x-2 font-semibold text-sm rounded-xl border border-transparent bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-600/40 transition-all duration-300 hover:scale-105">
          Back to Pricing
        </button>
      </div>
    </div>
  );
};


// --- Main Pricing Section Component ---
const PricingSection = () => {
  const { data: session, status } = useSession();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [view, setView] = useState('pricing'); // 'pricing' or 'success'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  const plans = [
    { name: "Monthly Plan", description: "Pay month-to-month", price: { monthly: 99, annual: 89 }, pricePeriod: "/month", isPopular: false, features: [ { text: "Vendor Profile Listing", included: true }, { text: "100 MB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: false }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: false }, { text: "Call Support", included: false }, ], buttonStyle: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700", },
    { name: "6 Months Plan", description: "Commit for half a year", price: { monthly: 499, annual: 449 }, pricePeriod: "/6 months", isPopular: true, features: [ { text: "Vendor Profile Listing", included: true }, { text: "500 MB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: true }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: true }, { text: "Call Support", included: false }, ], buttonStyle: "bg-blue-600 text-white hover:bg-blue-700 transform group-hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-blue-500/40", },
    { name: "Annual Plan", description: "Save with an annual commitment", price: { monthly: 999, annual: 899 }, pricePeriod: "/year", isPopular: false, features: [ { text: "Vendor Profile Listing", included: true }, { text: "2 GB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: true }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: true }, { text: "Call Support", included: true }, ], buttonStyle: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700", },
  ];

  const handleGetStartedClick = async (plan) => {
    // Start the audio context on user interaction, as required by modern browsers
    if (typeof Tone !== 'undefined' && Tone.context.state !== 'running') {
        await Tone.start();
    }
    setSelectedPlan(plan);
    setView('success');
  };

  const isAnnual = billingCycle === 'annual';

  return (
    <>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <AnimationStyles />
      <div className="min-h-screen flex items-center justify-center animate-background-pan p-4">
        <div className="w-full max-w-lg mx-auto bg-white/60 dark:bg-black/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-white/30 dark:border-black/30">
          
          <div className="mb-6 text-center">
            <div className="inline-block animate-pop-in">
              <div className="flex justify-center items-center size-20 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-lg shadow-purple-500/40">
                <svg className="shrink-0 size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-3 font-bold text-2xl md:text-3xl text-gray-800 dark:text-neutral-100 opacity-0 animate-fadeIn-up delay-200">
              Your transfer is on the way
            </h1>
            <p className="text-sm text-gray-600 dark:text-neutral-400 opacity-0 animate-fadeIn-up delay-400">
              We've scheduled your transfer. You can now manage your services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fadeIn-up delay-600">
            <Link href="/vendor/dashboard" className="py-3 px-5 inline-flex justify-center items-center gap-x-2 font-semibold text-sm rounded-xl border border-transparent bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-600/40 transition-all duration-300 hover:scale-105">
              Go to Dashboard
            </Link>
            <Link href="/payment" className="py-3 px-5 inline-flex justify-center items-center gap-x-2 font-semibold text-sm rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700">
              View Plans
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
