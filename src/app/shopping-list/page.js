"use client";

import React from "react";
import SafeScreen from "../../components/SafeScreen";
import PageTransition from "../../components/PageTransition";

const ShoppingListPage = () => {
  return (
    <SafeScreen>
      <PageTransition>
        <div className="min-h-screen items-center justify-center bg-gray-50 px-4 py-8 mt-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-green-800 mt-8 text-center">
              Shopping List
            </h1>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">
                  Your Shopping List
                </h2>
                <p className="text-gray-600 mb-6">
                  Keep track of items you need to buy
                </p>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    🔜 Shopping list functionality coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </SafeScreen>
  );
};

export default ShoppingListPage;
