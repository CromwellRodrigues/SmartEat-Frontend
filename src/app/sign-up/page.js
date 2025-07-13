"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center px-4 mt-18 mb-20">
      <div className="max-w-md w-full">
        {/* Custom Header */}
        <div className="text-center mt-8">
          {/* <Image
            src="/images/boy.png"
            alt="Pantry Pal Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-full"
          /> */}
          <h1 className="text-3xl font-bold text-green-800 mt-8">
            Create Account{" "}
          </h1>
          <p className="text-gray-600">
            Start managing your food inventory smarter
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="bg-yellow-200 rounded-2xl shadow-xl p-8">
          <SignUp
            routing="hash"
            appearance={{
              elements: {
                rootBox:
                  "w-full max-w-full overflow-hidden rounded-lg bg-pink-400",
                card: "shadow-none ",
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
            localization={{
                          signUp: {
                             start: {
                               formButtonPrimary: "Sign Up",
                             },
                           },
                        }}
          />
        </div>

        {/* Custom Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
