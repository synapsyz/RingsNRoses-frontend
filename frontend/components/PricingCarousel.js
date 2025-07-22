import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

// This component receives the configured 'api' instance as a prop
export default function PricingCarousel({ api }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [pricingData, setPricingData] = useState([]);
  const [current, setCurrent] = useState(0); // Start at the first plan
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  // Effect to load the Razorpay checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Effect to fetch pricing plans from the backend
  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await api.get("/plans/");
        setPricingData(res.data.results || []);
        // Set initial card to a popular one if available
        const popularIndex = res.data.results.findIndex(p => p.is_popular);
        if (popularIndex !== -1) {
            setCurrent(popularIndex);
        }
      } catch (error) {
        console.error("Failed to fetch pricing plans:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, [api]);

  const handleNext = () => {
    if (!pricingData.length) return;
    setCurrent((prev) => (prev + 1) % pricingData.length);
  };

  const handlePrev = () => {
    if (!pricingData.length) return;
    setCurrent((prev) => (prev - 1 + pricingData.length) % pricingData.length);
  };

  const getCardPosition = (index) => {
    if (pricingData.length <= 1) return "center";
    const prevIndex = (current - 1 + pricingData.length) % pricingData.length;
    const nextIndex = (current + 1) % pricingData.length;

    if (index === current) return "center";
    if (index === prevIndex) return "left";
    if (index === nextIndex) return "right";
    return "hidden";
  };

  const handlePayment = async (plan) => {
    if (paymentInProgress) return;
    setPaymentInProgress(true);

    const amount = billingCycle === "monthly" ? plan.monthly_price : plan.annual_price;
     let accessToken = session?.accessToken;

  
  const storedDataString = sessionStorage.getItem('session');
  if (storedDataString) {
    try {
      const storedData = JSON.parse(storedDataString);
   
      if (storedData && storedData.tokens && storedData.tokens.access) {
        accessToken = storedData.tokens.access;
      }
    } catch (error) {
      console.error("Failed to parse session data from sessionStorage:", error);
    }
  }

 
  if (!accessToken) {
    alert('Authentication error. Your session may have expired. Please log in again.');
    setIsLoading(false);
    return;
  }

    try {
      const res = await api.post(
        "/payment/create-order/",
        { plan_id: plan.id, amount },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const data = res.data;

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Rings N Roses",
        description: `Payment for ${plan.name} Plan`,
        order_id: data.order_id,
        handler: async function (response) {
          try {
            const verificationRes = await api.post(
              "/payment/verify/",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            
            if (verificationRes.data.status === 'success') {
              // On successful verification, redirect to the success page
              router.push(`/payment/success?subscription_id=${verificationRes.data.subscription_id}`);
            } else {
              alert("Payment verification failed. Please contact support.");
              setPaymentInProgress(false);
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("An error occurred during payment verification. Please contact support.");
            setPaymentInProgress(false);
          }
        },
        prefill: {
          name: session?.user?.name || "Valued Customer",
          email: session?.user?.email,
        },
        theme: { color: "#4f46e5" },
        modal: {
            ondismiss: function() {
                setPaymentInProgress(false); // Re-enable button if user closes modal
            }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while initiating payment. Please try again.");
      setPaymentInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <p className="text-lg text-gray-800 animate-pulse">Loading Plans...</p>
      </div>
    );
  }

  if (pricingData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <p className="text-lg text-gray-800">No subscription plans are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 relative">
        <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-[-20%] right-[0] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="z-10 mb-8 text-center max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
            <p className="text-gray-600">Select the perfect plan to unlock exclusive features.</p>
        </div>

        {pricingData.length > 1 && (
            <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-10 md:left-40 z-40 p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
                <FaChevronLeft />
            </button>
        )}

        <div className="relative w-full max-w-7xl flex items-center justify-center">
            <div className="flex items-center justify-center w-full h-[650px] relative overflow-hidden">
                {pricingData.map((plan, index) => {
                    const position = getCardPosition(index);
                    const baseClasses = "absolute transition-all duration-500 ease-in-out w-[90%] max-w-[420px] min-h-[560px] p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-sm flex flex-col transform";
                    let style = "";

                    switch (position) {
                        case "center": style = "z-30 scale-100 opacity-100 translate-x-0"; break;
                        case "left": style = "z-20 scale-90 opacity-40 blur-sm -translate-x-full md:-translate-x-[480px]"; break;
                        case "right": style = "z-20 scale-90 opacity-40 blur-sm translate-x-full md:translate-x-[480px]"; break;
                        default: style = "z-10 opacity-0 scale-75 pointer-events-none";
                    }

                    const price = billingCycle === "monthly" ? plan.monthly_price : plan.annual_price;

                    return (
                        <div key={plan.id} className={`${baseClasses} ${style}`}>
                            <header className="flex justify-between items-center">
                                <h4 className="font-semibold text-xl text-gray-800">{plan.name}</h4>
                                {plan.is_popular && (
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-800 uppercase bg-indigo-100 rounded-full">Most Popular</span>
                                )}
                            </header>

                            <p className="mt-2 text-sm text-gray-500 flex-grow">{plan.description}</p>
                            
                            <div className="my-6">
                                <p className="text-5xl font-bold text-gray-900">₹{price}</p>
                                <p className="text-sm text-gray-400">{plan.price_period}</p>
                            </div>

                            <div className="pb-7 border-b border-gray-200">
                                <button
                                    onClick={() => handlePayment(plan)}
                                    disabled={paymentInProgress}
                                    className={`py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition ${
                                        paymentInProgress ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                                >
                                    {paymentInProgress ? 'Processing...' : 'Get Started'}
                                </button>
                            </div>

                            <ul className="space-y-4 text-sm mt-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className={`flex items-center gap-3 ${feature.included ? "text-gray-800" : "text-gray-400 line-through"}`}>
                                        {feature.included ? <BsCheckCircleFill className="text-green-500 flex-shrink-0" /> : <BsXCircleFill className="text-red-300 flex-shrink-0" />}
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>

        {pricingData.length > 1 && (
            <button
                onClick={handleNext}
                className="absolute right-4 sm:right-10 md:right-40 z-40 p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
                <FaChevronRight />
            </button>
        )}
    </div>
  );
}
