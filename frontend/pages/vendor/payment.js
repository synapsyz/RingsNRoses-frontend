import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import axios from "axios";

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
  const { data: session } = useSession();
  const [pricingData, setPricingData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
    const prevIndex = (current - 1 + pricingData.length) % pricingData.length;
    const nextIndex = (current + 1) % pricingData.length;

    if (index === current) return "center";
    if (index === prevIndex) return "left";
    if (index === nextIndex) return "right";
    return "hidden";
  };

  const handlePayment = async (plan) => {
    const amount =
      billingCycle === "monthly" ? plan.monthly_price : plan.annual_price;
    const accessToken = session?.accessToken;

    try {
      const res = await api.post(
        "/payment/create-order/",
        {
          plan_id: plan.id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = res.data;

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Rings N Roses",
        description: `Payment for ${plan.name}`,
        order_id: data.order_id,
        handler: async function (response) {
          try {
            await api.post(
              "/payment/verify/",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan_id: plan.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            alert("✅ Payment successful!");
          } catch (err) {
            alert("❌ Payment verification failed");
          }
        },
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366f1",
        },
          method: {
    upi: true,
    card: true,
    netbanking: true,
    wallet: false, // Optional: set to true if you want wallets like Paytm
  },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Something went wrong while processing payment.");
    }
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

      <button
        onClick={handlePrev}
        className="absolute left-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaChevronLeft />
      </button>

      <div className="relative w-full max-w-7xl flex items-center justify-center">
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

            const price =
              billingCycle === "monthly"
                ? plan.monthly_price
                : plan.annual_price;

            return (
              <div key={plan.id} className={`${baseClasses} ${style}`}>
                <div className="bg-white rounded-xl h-full flex flex-col p-3">
                  <header
                    className={
                      plan.is_popular ? "flex justify-between items-center" : ""
                    }
                  >
                    <h4 className="font-semibold text-lg text-gray-800">
                      {plan.name}
                    </h4>
                    {plan.is_popular && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-100 rounded-full animate-pulse">
                        Most popular
                      </span>
                    )}
                  </header>

                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  <p className="text-4xl font-bold text-black-600 mt-4">
                    ₹{price}
                  </p>
                  <p className="text-sm text-gray-400">{plan.price_period}</p>

                  <div className="mt-5 pb-7 border-b border-gray-200">
                    <button
                      onClick={() => handlePayment(plan)}
                      className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition"
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

      <button
        onClick={handleNext}
        className="absolute right-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
