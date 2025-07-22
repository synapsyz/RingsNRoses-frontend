import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import LoadingSpinner from "@/components/payment/LoadingSpinner";
import NoPlans from "@/components/payment/NoPlans";
import Header from "@/components/payment/Header";
import Carousel from "@/components/payment/Carousel";
import { useRouter } from "next/router";      // 👈 NEW
import AlertBox from "@/components/AlertBox"; // Adjust path if needed

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
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();    
                           


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
    setIsProcessing(true);
    const amount =
      billingCycle === "monthly" ? plan.monthly_price : plan.annual_price;
   
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
            router.push("/vendor/my-subscription/");
          } catch (err) {
            alert("❌ Payment verification failed");
          }
        },
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
        },
        theme: {
          color: "#6366f1",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: false,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error", error);
      alert("Something went wrong while processing payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (pricingData.length === 0) {
    return <NoPlans />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12 relative">
      <Header />
      <Carousel
        pricingData={pricingData}
        handlePayment={handlePayment}
        isProcessing={isProcessing}
        billingCycle={billingCycle}
        current={current}
        handlePrev={handlePrev}
        handleNext={handleNext}
        getCardPosition={getCardPosition}
      />
    </div>
  );
}