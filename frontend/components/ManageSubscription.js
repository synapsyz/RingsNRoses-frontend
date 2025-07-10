import React from 'react';
import { useRouter } from 'next/router';

export default function ManageSubscription({ subscription }) {
  const router = useRouter();

  if (!subscription) return null;

  // This function would deactivate the current plan and show the pricing carousel again
  const handleChangePlan = () => {
    // A simple way is to just redirect back to the main subscribe page.
    // The logic there will see no active plan (if you deactivate it) and show options.
    // For now, we'll just simulate this by reloading.
    alert("Functionality to change plan will take you back to the pricing page.");
    router.reload(); // Or router.push('/subscribe');
  };

  // This requires a backend endpoint to cancel the subscription
  const handleCancel = async () => {
      if (window.confirm("Are you sure you want to cancel your subscription? This action cannot be undone.")) {
        // Example: await api.post('/subscriptions/cancel/');
        alert("Cancellation feature not implemented yet. Your subscription remains active.");
      }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Your Subscription</h1>
        
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <h2 className="text-2xl font-semibold text-indigo-800">{subscription.plan.name}</h2>
            <p className="text-gray-600 mt-2">{subscription.plan.description}</p>
            
            <div className="mt-5 pt-5 border-t border-indigo-200 space-y-2">
                <p className="text-sm text-gray-800">
                    Active From: <span className="font-medium text-gray-900">{new Date(subscription.valid_from).toLocaleDateString()}</span>
                </p>
                <p className="text-sm text-gray-800">
                    Active Until: <span className="font-medium text-red-600">{new Date(subscription.valid_upto).toLocaleDateString()}</span>
                </p>
            </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
           <button 
             onClick={handleChangePlan}
             className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
             Change / Upgrade Plan
           </button>
           <button 
             onClick={handleCancel}
             className="w-full py-3 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-red-200 hover:text-red-800 transition"
            >
             Cancel Subscription
           </button>
        </div>
      </div>
    </div>
  );
}
