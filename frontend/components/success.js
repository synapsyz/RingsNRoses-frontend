import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// --- Axios Instance Setup ---
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
// --- End Axios Setup ---

export default function SuccessPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { subscription_id } = router.query;

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch details only if we have the ID and the user session
    if (subscription_id && session) {
      const fetchSubscriptionDetails = async () => {
        try {
          // Note: You might want a specific endpoint `/subscriptions/{id}` for security,
          // but re-using `/subscriptions/me/` works fine as it will return the new active plan.
          const res = await api.get(`/subscriptions/me/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
          });
          setSubscription(res.data);
        } catch (err) {
          console.error("Failed to fetch subscription details:", err);
          setError('Could not verify your new subscription. Please check your dashboard or contact support.');
        } finally {
          setLoading(false);
        }
      };
      fetchSubscriptionDetails();
    } else if (router.isReady && !subscription_id) {
        // Handle case where user lands here without a subscription_id
        setLoading(false);
        setError('No subscription details found.');
    }
  }, [subscription_id, session, router.isReady]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-lg text-gray-700 animate-pulse">Finalizing your subscription...</p>
        </div>
    );
  }
  
  if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
                <p className="mt-2 text-gray-600">{error}</p>
                <Link href="/dashboard" className="inline-block mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                    Go to Dashboard
                </Link>
            </div>
        </div>
      );
  }

  if (!subscription) {
      return null; // Should be covered by loading/error states
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
       <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-2xl text-center transform transition-all hover:scale-105">
            <div className="text-6xl text-green-500 mb-4">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Thank you! Your subscription is now active.</p>

            <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-800">Subscription Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Plan:</span>
                        <span className="font-medium text-gray-900">{subscription.plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Start Date:</span>
                        <span className="font-medium text-gray-900">{new Date(subscription.valid_from).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Valid Until:</span>
                        <span className="font-medium text-gray-900">{new Date(subscription.valid_upto).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <Link href="/dashboard" className="inline-block mt-8 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                Go to Your Dashboard
            </Link>
       </div>
    </div>
  );
}
