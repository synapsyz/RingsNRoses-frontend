"use client";

import { useEffect, useState } from 'react'; // 1. Import useState
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useAuth = (redirectTo = '/vendor/login') => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // 2. Create state to safely hold the token and check status
  const [token, setToken] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  // 3. This useEffect runs *only* on the client-side after the page loads
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    setIsTokenChecked(true); // Mark that we have now checked localStorage
  }, []);

  const isAuthenticated = !!session || !!token;
  // The page is loading if next-auth is loading OR we haven't checked for our token yet
  const isLoading = sessionStatus === 'loading' || !isTokenChecked;

  // 4. This useEffect handles redirection after all checks are complete
  useEffect(() => {
    if (isLoading) {
      return; // Don't do anything while loading
    }
    if (!isAuthenticated) {
      router.push(redirectTo); // Redirect if not authenticated
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading, session };
};

export default useAuth;