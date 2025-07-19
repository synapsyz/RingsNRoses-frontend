"use client";

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;

const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_APP_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();

const api = axios.create({
    baseURL: api_url + "/api/v1",
    headers: { 
        ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
    },
});

export default function GoogleLoginButton({ userType }) {
    const router = useRouter();

    const handleLoginSuccess = async (credentialResponse) => {
        console.log("✅ Google login success, credential received");

        const id_token = credentialResponse.credential;

        let apiUrl = '';
        let redirectUrl = '';

        if (userType === 'vendor') {
            apiUrl = '/vendor/google-login/';
            redirectUrl = '/vendor/dashboard';
        } else if (userType === 'customer') {
            apiUrl = '/customer/google-login/';
            redirectUrl = '/';
        } else {
            console.error("❌ Invalid userType prop:", userType);
            alert("Login configuration error: userType prop is missing or invalid.");
            return;
        }

        const requestBody = { token: id_token };

        try {
            console.log("📡 Sending token to backend:", apiUrl);
            const response = await api.post(apiUrl, requestBody);
            const data = response.data;

            console.log("✅ Backend login/registration successful", data);

            // Store session and token
            sessionStorage.setItem('session', JSON.stringify(data));
            localStorage.setItem('token', data.tokens.access);

            // Debug logging before redirect
            console.log("🚀 Redirecting to:", redirectUrl);

            // Delay slightly to avoid race conditions
            setTimeout(() => {
                router.push(redirectUrl);
            }, 100);

        } catch (error) {
            console.error("❌ Backend returned an error:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.error || 'An error occurred during login.';
            alert(errorMessage);
        }
    };

    const handleLoginError = () => {
        console.error('❌ Google login failed.');
        alert('Google Sign-In was cancelled or failed. Please try again.');
    };

    return (
        <div className="mt-6">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                width="364px"
                theme="outline"
            />
        </div>
    );
}
