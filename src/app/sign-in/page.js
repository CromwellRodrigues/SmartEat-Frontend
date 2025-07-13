"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Custom Header */}
        <div className="text-center mb-8">
          <Image
            src="/images/boy.png"
            alt="Pantry Pal Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your Pantry Pal account</p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="bg-yellow-200 rounded-2xl shadow-xl p-8">
          <SignIn
            routing="hash"
            appearance={{
              elements: {
                rootBox:
                  "w-full max-w-full overflow-hidden rounded-lg bg-pink-400",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "bg-white border-2 border-gray-200 hover:border-green-300 text-gray-700",
                formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
                footerActionLink: "text-green-600 hover:text-green-700",
                formFieldInput:
                  "border-gray-300 focus:border-green-500 focus:ring-green-500",
                identityPreviewEditButton:
                  "text-green-600 hover:text-green-700",
              },
            }}
          />
        </div>

        {/* Custom Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
