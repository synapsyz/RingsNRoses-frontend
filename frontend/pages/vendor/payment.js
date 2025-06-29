import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import CustomHead from '@/components/vendor/Head';
import Header from '@/components/vendor/Header';
import SecondaryNav from '@/components/vendor/SecondaryNav';

// --- Animation Styles Component ---
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
    @keyframes pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes aurora-pan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    
    .animate-fadeIn-down { animation: fadeIn-down 0.6s ease-out forwards; }
    .animate-pop-in { animation: pop-in 0.4s ease-out forwards; }
    .animate-aurora-pan {
        background-image: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.1) 0px, transparent 50%), 
                          radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.1) 0px, transparent 50%),
                          radial-gradient(at 74% 94%, hsla(333, 98%, 62%, 0.1) 0px, transparent 50%);
        background-size: 300% 300%;
        animation: aurora-pan 20s ease infinite;
    }

    /* Staggered animation delays for cards */
    .pricing-card:nth-child(1) { animation-delay: 0.2s; }
    .pricing-card:nth-child(2) { animation-delay: 0.3s; }
    .pricing-card:nth-child(3) { animation-delay: 0.4s; }
    
    /* 3D Tilt Effect */
    .card-3d {
      transform-style: preserve-3d;
      transition: transform 0.4s ease-out;
    }
  `}</style>
);

// --- Reusable Feature List Item Component ---
const FeatureListItem = ({ text, included }) => (
  <li className="flex items-start gap-x-3">
    <div className="flex-shrink-0 flex justify-center items-center size-6 mt-0.5">
      {included ? (
        <svg className="size-5 text-blue-600 dark:text-blue-500 animate-pop-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="size-5 text-gray-300 dark:text-neutral-700 animate-pop-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <span className={included ? "text-gray-800 dark:text-neutral-300" : "text-gray-500 dark:text-neutral-500"}>
      {text}
    </span>
  </li>
);

// --- Animated Price Component ---
const AnimatedPrice = ({ amount }) => {
    const [currentAmount, setCurrentAmount] = useState(amount);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (amount !== currentAmount) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentAmount(amount);
                setIsAnimating(false);
            }, 150); // Half of the transition duration
        }
    }, [amount, currentAmount]);

    return (
        <span className={`font-bold text-4xl md:text-5xl text-gray-800 dark:text-neutral-200 transition-all duration-300 ${isAnimating ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
            {currentAmount}
        </span>
    );
};


// --- Main Pricing Section Component ---
const PricingSection = () => {
  const { data: session, status } = useSession();
  const [billingCycle, setBillingCycle] = useState('monthly');

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

  // --- UPDATED: Plan data with separated support features ---
  const plans = [
    {
      name: "Monthly Plan",
      description: "Pay month-to-month",
      price: { monthly: 99, annual: 89 },
      pricePeriod: "/month",
      isPopular: false,
      features: [
        { text: "Vendor Profile Listing", included: true },
        { text: "100 MB Storage", included: true },
        { text: "Display Reviews & Ratings", included: true },
        { text: "Analytics Dashboard", included: true },
        { text: "Social Media Promotion", included: false },
        { text: "Email Support", included: true },
        { text: "WhatsApp Support", included: false },
        { text: "Call Support", included: false },
      ],
      buttonStyle: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    },
    {
      name: "6 Months Plan",
      description: "Commit for half a year",
      price: { monthly: 499, annual: 449 },
      pricePeriod: "/6 months",
      isPopular: true,
      features: [
        { text: "Vendor Profile Listing", included: true },
        { text: "500 MB Storage", included: true },
        { text: "Display Reviews & Ratings", included: true },
        { text: "Analytics Dashboard", included: true },
        { text: "Social Media Promotion", included: true },
        { text: "Email Support", included: true },
        { text: "WhatsApp Support", included: true },
        { text: "Call Support", included: false },
      ],
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700 transform group-hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-blue-500/40",
    },
    {
      name: "Annual Plan",
      description: "Save with an annual commitment",
      price: { monthly: 999, annual: 899 },
      pricePeriod: "/year",
      isPopular: false,
      features: [
        { text: "Vendor Profile Listing", included: true },
        { text: "2 GB Storage", included: true },
        { text: "Display Reviews & Ratings", included: true },
        { text: "Analytics Dashboard", included: true },
        { text: "Social Media Promotion", included: true },
        { text: "Email Support", included: true },
        { text: "WhatsApp Support", included: true },
        { text: "Call Support", included: true },
      ],
      buttonStyle: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    },
  ];

  const isAnnual = billingCycle === 'annual';

  return (
    <>
      <CustomHead />
      <Header />
      <SecondaryNav />
      <AnimationStyles />
        
      <div className="relative py-10 md:py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-black animate-aurora-pan"></div>
        <div className="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-12 max-w-2xl mx-auto text-center">
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-5 text-sm md:text-lg text-gray-600 dark:text-gray-300">
              Whatever your status, our offers evolve according to your needs.
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-4 mb-12">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAnnual} onChange={() => setBillingCycle(isAnnual ? 'monthly' : 'annual')} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              Annual <span className="text-xs text-green-600 dark:text-green-500">(Save 10%)</span>
            </span>
          </div>
        </div>

        <div className="my-8">
          <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`pricing-card card-3d opacity-0 animate-fadeIn-down p-1 h-full flex flex-col rounded-2xl transition-all duration-300 ease-in-out group relative ${plan.isPopular ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg' : 'bg-white/50 dark:bg-neutral-900/50 shadow-sm'}`} 
                  onMouseMove={handleMouseMove} 
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white dark:bg-neutral-900 rounded-xl h-full flex flex-col p-6">
                    <header className={plan.isPopular ? "flex justify-between items-center" : ""}>
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">{plan.name}</h4>
                      {plan.isPopular && <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-100 rounded-full dark:bg-blue-500/20 dark:text-blue-400 animate-pulse">Most popular</span>}
                    </header>
                    {!plan.isPopular && <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">{plan.description}</p>}
                    
                    <div className="flex flex-col mt-auto">
                      <div className="mt-4 flex items-baseline gap-x-1">
                        <span className="font-semibold text-gray-800 text-2xl dark:text-neutral-200">₹</span>
                        <AnimatedPrice amount={plan.price[billingCycle]} />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">{plan.pricePeriod} for your {session?.user?.vendor_profile?.subcategory?.category?.name}</p>
                      <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
                        <Link href="/vendor/payment_success" passHref>
                          <button type="button" className={`py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-shadow ${plan.buttonStyle}`}>
                            Get started
                          </button>
                        </Link>
                      </div>
                      <ul className="mt-7 space-y-3 text-sm">
                        {plan.features.map((feature, idx) => <FeatureListItem key={idx} text={feature.text} included={feature.included} />)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl px-4 sm:px-6 lg:px-8 mx-auto mt-16">
          {/* ... */}
        </div>
      </div>
    </>
  );
};

export default PricingSection;
