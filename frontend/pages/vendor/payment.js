import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";

// Setup API based on environment variables
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();

const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

export default function Payment() {
  const [pricingData, setPricingData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await api.get("/plans/");
        setPricingData(res.data.results);
      } catch (error) {
        console.error("Failed to fetch pricing plans:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleNext = () => {
    if (!pricingData.length) return;
    setCurrent((prev) => (prev + 1) % pricingData.length);
  };

  const handlePrev = () => {
    if (!pricingData.length) return;
    setCurrent((prev) => (prev === 0 ? pricingData.length - 1 : prev - 1));
  };

  const getCardPosition = (index) => {
    if (!pricingData.length) return "hidden";

    const prevIndex = (current - 1 + pricingData.length) % pricingData.length;
    const nextIndex = (current + 1) % pricingData.length;

    if (index === current) return "center";
    if (index === prevIndex) return "left";
    if (index === nextIndex) return "right";
    return "hidden";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-lg text-gray-800">Loading plans...</p>
      </div>
    );
  }

  if (pricingData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-lg text-gray-800">No plans available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="mb-8 text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Choose the Plan That Fits You
        </h1>
        <p className="text-gray-600 text-sm">
          Whatever your status, our offers evolve according to your needs.
        </p>
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
                style = "z-20 scale-90 opacity-30 blur-sm -translate-x-[480px]";
                break;
              case "right":
                style = "z-20 scale-90 opacity-30 blur-sm translate-x-[480px]";
                break;
              default:
                style = "opacity-0 scale-75 pointer-events-none";
            }

            // Map API billing cycles to your billingCycle state keys (monthly/annual)
            // API keys: monthly_price, annual_price
            const price =
              billingCycle === "monthly"
                ? plan.monthly_price
                : plan.annual_price;

            return (
              <div key={plan.id} className={`${baseClasses} ${style}`}>
                <div className="bg-white dark:bg-neutral-900 rounded-xl h-full flex flex-col p-3">
                  <header className={plan.is_popular ? "flex justify-between items-center" : ""}>
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-neutral-200">{plan.name}</h4>
                    {plan.is_popular && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-100 rounded-full dark:bg-blue-500/20 dark:text-blue-400 animate-pulse">
                        Most popular
                      </span>
                    )}
                  </header>

                  <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">{plan.description}</p>

                  <p className="text-4xl font-bold text-black-600 mt-4">₹{price}</p>
                  <p className="text-sm text-gray-400">{plan.price_period}</p>

                  <div className="mt-5 pb-7 border-b border-gray-200 dark:border-neutral-700">
                    <button className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-shadow bg-blue-600 text-white hover:bg-blue-700 transition">
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
  );
}
