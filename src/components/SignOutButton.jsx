'use client';

import React, { useState }  from 'react';
import { useClerk } from '@clerk/nextjs';
import { LogOut } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const SignOutButton = ({ className = "", children }) => {
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
  
      try {
        await signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`bg-red-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-red-700 transition-colors ${className}`}
          type="button"
        >
          <LogOut className="inline w-4 h-4 mr-2" />
          {children || 'Sign Out'}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutButton;