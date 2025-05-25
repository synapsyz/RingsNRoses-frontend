import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  
// const router = useRouter();
// const { uid, token } = router.query;
const [email, setemail] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/password-reset/`, {
      email: email,
    });

    setSuccess('Password reset link sent to your email...');
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.detail || 'Something went wrong.');
  }
};
  return (



    <div className="flex items-center justify-center min-h-screen bg-gray-100" >
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-600">
            Remember your password?{" "}
            <Link href="/login">
              <span className="text-blue-600 hover:underline font-medium">
                Sign in here
              </span>
            </Link>
          </p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          {/* <Link href="/login/resetpassword"> */}
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Reset password
            </button>
          {/* </Link> */}
        </form>

        <div className="mt-4 text-center">

        </div>
      </div>
    </div>
  );
}
