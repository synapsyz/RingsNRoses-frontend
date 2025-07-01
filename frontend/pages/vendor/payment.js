import { useState } from "react"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import Link from "next/link";


const pricingData = [ { id: 1, name: "Monthly Plan", description: "Pay month-to-month", price: { monthly: 99, annual: 89 }, pricePeriod: "/month", isPopular: false, features: [ { text: "Vendor Profile Listing", included: true }, { text: "100 MB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: false }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: false }, { text: "Call Support", included: false }, ], }, { id: 2, name: "6 Months Plan", description: "Commit for half a year", price: { monthly: 499, annual: 449 }, pricePeriod: "/6 months", isPopular: true, features: [ { text: "Vendor Profile Listing", included: true }, { text: "500 MB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: true }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: true }, { text: "Call Support", included: false }, ], }, { id: 3, name: "Annual Plan", description: "Save with an annual commitment", price: { monthly: 999, annual: 899 }, pricePeriod: "/year", isPopular: false, features: [ { text: "Vendor Profile Listing", included: true }, { text: "2 GB Storage", included: true }, { text: "Display Reviews & Ratings", included: true }, { text: "Analytics Dashboard", included: true }, { text: "Social Media Promotion", included: true }, { text: "Email Support", included: true }, { text: "WhatsApp Support", included: true }, { text: "Call Support", included: true }, ], }, ];

export default function Payment() { const [current, setCurrent] = useState(1); const [billingCycle, setBillingCycle] = useState("monthly");

const handleNext = () => { setCurrent((prev) => (prev + 1) % pricingData.length); };

const handlePrev = () => { setCurrent((prev) => (prev === 0 ? pricingData.length - 1 : prev - 1)); };

const getCardPosition = (index) => { const prevIndex = (current - 1 + pricingData.length) % pricingData.length; const nextIndex = (current + 1) % pricingData.length;

if (index === current) return "center";
if (index === prevIndex) return "left";
if (index === nextIndex) return "right";
return "hidden";

};

return ( <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12"> 
<div className="mb-8 text-center max-w-2xl"> 
  <h1 className="text-3xl font-bold text-gray-800 mb-3"> Choose the Plan That Fits You </h1> 
  <p className="text-gray-600 text-sm"> Whatever your status, our offers evolve according to your needs. </p> 
  </div>
{/* Left Arrow */}
    <button
      onClick={handlePrev}
      className="absolute left-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
    >
      <FaChevronLeft />
    </button>

<div className="relative w-full max-w-7xl flex items-center justify-center">
    
    {/* Cards */}
    <div className="flex items-center justify-center w-full h-[700px] relative overflow-hidden">
      {pricingData.map((plan, index) => {
        const position = getCardPosition(index);

        const baseClasses =
          "absolute transition-all duration-500 ease-in-out w-[450px] min-h-[540px] p-8 rounded-2xl shadow-2xl bg-white flex flex-col transform";
        let style = "";

        switch (position) {
          case "center":
            style = "z-30 scale-100 opacity-100 translate-x-0";
            break;
          case "left":
            style =
              "z-20 scale-90 opacity-30 blur-sm -translate-x-[480px]";
            break;
          case "right":
            style =
              "z-20 scale-90 opacity-30 blur-sm translate-x-[480px]";
            break;
          default:
            style = "opacity-0 scale-75 pointer-events-none";
        }

        return (
          <div key={plan.id} className={`${baseClasses} ${style}`}>
<div className="bg-white dark:bg-neutral-900 rounded-xl h-full flex flex-col p-3">
  <header className={plan.isPopular ? 'flex justify-between items-center' : ''}>
    <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">{plan.name}</h4>
                                                    {plan.isPopular && (
                                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-100 rounded-full dark:bg-blue-500/20 dark:text-blue-400 animate-pulse">
                                                            Most popular
                                                        </span>
                                                    )}
                                                </header>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">{plan.description}</p>

              <p className="text-4xl font-bold text-black-600 mt-4">
                ₹{plan.price[billingCycle]}
              </p>
              <p className="text-sm text-gray-400">{plan.pricePeriod}</p>
              <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
              <button
  className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-shadow bg-blue-600 text-white hover:bg-blue-700 transition"
>
  Get started
</button>

            </div>
            </div>

            <ul className="space-y-3 text-sm mt-4">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    feature.included ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {feature.included ? (
                    <BsCheckCircleFill className="text-green-500" />
                  ) : (
                    <BsXCircleFill className="text-red-300" />
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    
  </div>
  {/* Right Arrow */}
    <button
      onClick={handleNext}
      className="absolute right-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
    >
      <FaChevronRight />
    </button>
</div>

); }