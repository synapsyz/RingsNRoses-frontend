import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AccessDeniedModal({ isOpen, userType }) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleSignOut = () => {
    // Sign out and redirect to the login page
    signOut({ callbackUrl: '/vendor/login' });
  };

  const handleGoHome = () => {
    // Redirect to the homepage
    router.push('/');
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
      {/* Modal Dialog */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 sm:p-8 transform transition-all">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
            <h3 className="text-2xl font-bold text-gray-800">Access Restricted</h3>
            <svg 
                onClick={handleGoHome}
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-800" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </div>

        {/* Modal Body */}
        <div className="mt-4">
          <p className="text-md text-gray-600">
            This dashboard is for <span className="font-semibold">vendors</span> only.
          </p>
          <p className="text-md text-gray-600 mt-2">
            You are currently logged in as a <span className="font-semibold">{userType}</span>. Please sign out and log in with a vendor account to continue.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleSignOut}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
          >
            Sign Out & Log In
          </button>
          <button
            onClick={handleGoHome}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
