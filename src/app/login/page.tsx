"use client";

import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuthActions } from '@/hook/useAuthActions';
import Link from "next/link";

export default function LoginPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  // Destructure everything from your custom hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    setCaptchaToken,
    error,
    isLoading,
    handleSignIn
  } = useAuthActions(recaptchaRef);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans justify-between">
      {/* Main Container */}
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12">
          
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/WhatsApp Image 2026-03-03 at 3.36.25 PM (1).jpeg" alt="Logo" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold tracking-wider text-slate-800">SAAMPARK</span>
        </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-xs font-medium border border-red-100">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={isLoading}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-700 disabled:opacity-60"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={isLoading}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-700 disabled:opacity-60"
              />
            </div>

            {/* Google reCAPTCHA Container */}
            <div className="flex justify-center my-4 overflow-hidden rounded border border-gray-200 bg-gray-50 p-1">
              <ReCAPTCHA
                ref={recaptchaRef}
                // Fallback to demo key if env variable isn't set up yet
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqy0H71UMIEGNQ_MXjiZKhI"}
                onChange={setCaptchaToken}
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Links Section */}
          <div className="mt-6 text-left space-y-2">
            <a href="#forgot" className="block text-xs text-gray-500 hover:underline">
              Forgot password?
            </a>
            <div className="text-xs text-gray-500">
              You don't have an account?{' '}
              <a href="#signup" className="text-blue-500 hover:underline">
                <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
                 </Link>
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <footer className="w-full px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 bg-transparent">
        <div>Copyright © 2016 - 2026 SAAMPARK</div>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#store" className="hover:underline">Store</a>
          <a href="#kb" className="hover:underline">Knowledge base</a>
          <a href="#custom" className="hover:underline">Custom page</a>
        </div>
      </footer>
    </div>
  );
}