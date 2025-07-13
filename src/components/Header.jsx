'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';

import SignOutButton from './SignOutButton';

const Header = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between bg-green-500 shadow-2xl drop-shadow-lg">
        {/* 0a6626 https://www.whocanuse.com/?bg=0a6626&fg=ffffff&fs=16&fw=*/}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo/logo.png" // Correct path for public assets
            alt="Pantry Pal Logo"
            width={80}
            height={80}
            className="rounded-full ml-[2rem] mr-4 inline-block text-xl"
            priority // Use priority for faster loading
          />
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Pantry Pal</span>
        </Link>
        
        {/* Authentication Section */}
        <div className="flex items-center gap-4">
          <SignedOut>
          <Link href="/sign-in">
  <button className="bg-white text-green-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
    Sign In
  </button>
</Link>
<Link href="/sign-up">
  <button className="bg-green-700 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-green-800 transition-colors">
    Sign Up
  </button>
</Link>
          </SignedOut>
          <SignedIn>
            {/* <UserButton 
                userProfileMode="navigation"
  userProfileUrl="/profile"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                
                userButtonPopoverActionButton__signOut: "hidden" // Hides the sign out button in the dropdown
              },
              }}
            /> */}
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}   

export default Header;