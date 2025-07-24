'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useSummary } from '../../../hooks/useSummary';
import Link from 'next/link';

const Summary = () => {
  const { user, isLoaded } = useUser();
  const userId = isLoaded && user ? user.id : null;
  const { summary, loading, error } = useSummary(userId);


  // Add these debug logs
  console.log("Summary Debug:");
  console.log("- isLoaded:", isLoaded);
  console.log("- user:", user?.id);
  console.log("- loading:", loading);
  console.log("- error:", error);
  console.log("- summary:", summary);

  
  // Show loading while Clerk is loading user data
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 pb-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading summary...</p>
        </div>
      </div>
    );
  }

  // Show error if user is not authenticated
  if (isLoaded && !user) {
    return (
      <div className="flex items-center justify-center bg-gray-100 pt-6 pb-6 min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mt-4">Summary</h1>
          <p className="text-gray-600 text-lg mt-2">
            Please sign in to view your summary.
          </p>
          {/* Add this button */}
          <div className="mt-6">
            <Link href="/sign-in">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error || loading) {
    // Instead of showing error, show the summary page with empty cards
    return (
      <div className="min-h-[20vh] bg-gray-100 pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-4xl font-bold text-green-600 text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Inventory Summary
          </motion.h1>

          {/* Summary Cards with empty/default values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Items */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Total Items</div>
            </motion.div>

            {/* Total Amount */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                $0.00
              </div>
              <div className="text-gray-600">Total Value</div>
            </motion.div>

            {/* Expiring Soon */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
              <div className="text-gray-600">Expiring Soon</div>
            </motion.div>

            {/* Out of Stock */}
            <motion.div
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="text-3xl font-bold text-red-600 mb-2">0</div>
              <div className="text-gray-600">Out of Stock</div>
            </motion.div>
          </div>

          {error && (
            <motion.div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center min-h-[10vh] bg-gray-100 pt-2 pb-2">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-red-600 mt-2">
                    Summary
                  </h1>
                  <p className="text-gray-600 text-lg mt-2">
                    Please sign in to view your summary.
                  </p>

                  {/* Add login button here */}
                  <div className="mt-2">
                    <Link href="/sign-in">
                      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Sign In
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-green-600 text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Inventory Summary
        </motion.h1>

        {/* Summary Cards - Moved from home page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Items */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {loading ? 0 : summary.total_items || 0}
            </div>
            <div className="text-gray-600">Total Items</div>
          </motion.div>

          {/* Total Amount */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${loading ? "0.00" : Number(summary.total_amount || 0).toFixed(2)}
            </div>
            <div className="text-gray-600">Total Value</div>
          </motion.div>

          {/* Expiring Soon */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {loading ? 0 : summary.total_expiring_soon || 0}
            </div>
            {/* <div className="text-lg font-semibold text-green-600 mt-1">
              $
              {loading
                ? "0.00"
                : Number(summary.amount_expiring_soon || 0).toFixed(2)}
            </div> */}
            <div className="text-gray-600">Expiring Soon</div>
          </motion.div>

          {/* Out of Stock */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="text-3xl font-bold text-red-600 mb-2">
              {loading ? 0 : summary.total_out_of_stock || 0}
            </div>
            <div className="text-gray-600">Out of Stock</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Summary