import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiAward, FiCalendar, FiRefreshCw, FiAlertCircle, FiClock } from "react-icons/fi";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV !== "development";
const getApiUrl = () => isNgrok
  ? process.env.NEXT_PUBLIC_HOST
  : process.env.NEXT_PUBLIC_API_LOCALHOST;

const api = axios.create({
  baseURL: `${getApiUrl()}/api/v1`,
  headers: {
    ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
  },
});

export default function MySubscription() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  
  // --- CHANGE 1: State now holds an array of subscriptions ---
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


// MySubscription.js

useEffect(() => {
    // ... other code in useEffect is fine

    const fetchSubscriptions = async () => {
      try {
        const res = await api.get("/subscriptions/me/", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        
        // --- THE FIX IS HERE ---
        // Access the .results array from the paginated response
        setSubscriptions(res.data.results); 

      } catch (err) {
        setError("Failed to fetch subscription details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchSubscriptions();
}, [session, sessionStatus, router]);


  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full" role="status"></div>
      </div>
    );
  }

  // --- CHANGE 3: Rendering logic is updated to handle an array ---
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">My Subscriptions</h1>
          <p className="text-gray-600 text-lg mt-2">
            Here are your active and upcoming plans.
          </p>
        </div>

        {/* If there are no subscriptions, show the message */}
        {!loading && subscriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-lg mx-auto"
          >
            <FiAlertCircle className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Subscriptions Found</h2>
            <p className="text-gray-500 mb-6">
              Explore our plans to unlock exclusive features.
            </p>
            <button
              onClick={() => router.push("/vendor/payment")}
              className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Choose a Plan
            </button>
          </motion.div>
        )}
        
        {/* If there are subscriptions, map over them and render a card for each */}
        {subscriptions.length > 0 && (
          <div className="space-y-8">
            {subscriptions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-white rounded-2xl shadow-2xl p-8"
              >
                <div className="flex justify-between items-start pb-6 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">{sub.is_active ? "Current Plan" : "Queued Plan"}</p>
                    <h2 className="text-3xl font-bold text-gray-900">{sub.plan.name}</h2>
                  </div>
                  
                  {/* --- CHANGE 4: Differentiate between Active and Queued plans --- */}
                  {sub.is_active ? (
                    <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      <FiAward />
                      <span className="font-semibold text-sm">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      <FiClock />
                      <span className="font-semibold text-sm">Queued</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <FiCalendar className="text-2xl text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">{sub.is_active ? "Active From" : "Starts On"}</p>
                      <p className="font-semibold text-gray-700">{formatDate(sub.valid_from)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FiCalendar className="text-2xl text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Expires On</p>
                      <p className="font-semibold text-gray-700">{formatDate(sub.valid_upto)}</p>
                    </div>
                  </div>
                </div>

                {sub.plan.features?.length > 0 && (
                  <div className="py-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Plan Features</h3>
                    <ul className="space-y-3 columns-1 md:columns-2">
                      {sub.plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          {feature.included ? <BsCheckCircleFill className="text-green-500 flex-shrink-0" /> : <BsXCircleFill className="text-red-300 flex-shrink-0" />}
                          <span className={feature.included ? "text-gray-700" : "text-gray-400 line-through"}>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="pt-4 text-center">
              <button
                onClick={() => router.push("/vendor/payment")}
                className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg hover:shadow-blue-300"
              >
                <FiRefreshCw className="mr-2" />
                Purchase Another Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}