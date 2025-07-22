"use client";

import { signIn } from "next-auth/react";

// You no longer need:
// - @react-oauth/google
// - useRouter
// - axios

export default function GoogleLoginButton({ userType }) {
  const handleGoogleSignIn = () => {
    // 1. Determine which NextAuth provider to use based on the userType prop.
    // These IDs must match the 'id' fields in your [...nextauth].js file.
    const providerId = userType === 'vendor' ? 'google-vendor' : 'google-customer';

    // 2. Determine where the user should be redirected after a successful login.
    const callbackUrl = userType === 'vendor' ? '/vendor/dashboard' : '/';

    // 3. This single function call now handles the entire Google Sign-In flow.
    // NextAuth will manage the pop-up, communicate with Google, and then
    // run the logic in your `callbacks.jwt` function to talk to your Django backend.
    signIn(providerId, { callbackUrl });
  };

  return (
    <div className="mt-6">
      {/* We replace the <GoogleLogin> component with a standard button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <img
          className="h-5 w-5 mr-2"
          src="https://www.svgrepo.com/show/50809/google.svg"
          alt="Google logo"
        />
        Sign in with Google
      </button>
    </div>
  );
}
