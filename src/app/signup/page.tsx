"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    type: "Organization",
    companyName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [step, setStep] = useState<"SIGNUP" | "OTP">("SIGNUP");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.retypePassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = captchaRef.current?.getValue();
    if (!token) {
      setError("Please complete the reCAPTCHA validation verification.");
      return;
    }

    try {
      const res = await fetch("/api/dashboards/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup submission failed.");
        captchaRef.current?.reset();
        return;
      }

      setSuccessMessage("An OTP code has been successfully sent to your email.");
      setStep("OTP");
    } catch (err) {
      setError("Something went wrong. Please check your network connection.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/dashboards/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: otpCode,
          isVerifying: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "OTP verification failed.");
        return;
      }

      setSuccessMessage("Account verified perfectly! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err) {
      setError("Failed to verify OTP token code.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Clean Unified Image Path to Public Folder Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/WhatsApp Image 2026-03-03 at 3.36.25 PM (1).jpeg" alt="Logo" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold tracking-wider text-slate-800">SAAMPARK</span>
        </div>
        <h2 className="text-2xl font-normal text-gray-700 tracking-tight">
          {step === "SIGNUP" ? "Sign up" : "Verify Email Address"}
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">{error}</div>}
          {successMessage && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md">{successMessage}</div>}

          {step === "SIGNUP" ? (
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">First name</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Last name</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
                <div className="flex items-center space-x-6 text-sm">
                  <label className="flex items-center cursor-pointer text-gray-700 font-normal">
                    <input type="radio" name="type" checked={formData.type === "Organization"} onChange={() => setFormData(p => ({...p, type: "Organization"}))} className="mr-2 h-4 w-4 text-blue-600 border-gray-300" />
                    Organization
                  </label>
                  <label className="flex items-center cursor-pointer text-gray-700 font-normal">
                    <input type="radio" name="type" checked={formData.type === "Individual"} onChange={() => setFormData(p => ({...p, type: "Individual"}))} className="mr-2 h-4 w-4 text-blue-600 border-gray-300" />
                    Individual
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Company name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-800" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Retype password</label>
                <input type="password" name="retypePassword" required value={formData.retypePassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm" />
              </div>

              <div className="pt-2 flex justify-center">
                <ReCAPTCHA ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} />
              </div>

              <button type="submit" className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Sign up
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleOtpSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 text-center mb-2">
                  Enter the 6-digit verification code sent to {formData.email}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="mt-1 block w-full text-center px-3 py-3 tracking-widest font-bold text-xl bg-gray-50 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-gray-800"
                />
              </div>

              <button type="submit" className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Confirm OTP Verification
              </button>
            </form>
          )}

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}