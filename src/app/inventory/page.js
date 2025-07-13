'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useInventory } from '../../../hooks/useInventory';
import { Trash2, Pencil } from "lucide-react";

const Inventory = () => {
  const { user, isLoaded } = useUser();
    const { inventory, loading, error, deleteItem } = useInventory( isLoaded && user ? user?.id : null);
    
    console.log("inventory:", inventory);
    console.log("User id : ", user?.id);

  // Show loading while Clerk is loading user data
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 pb-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  console.log("🚀 After loading check - UserID:", user?.id);
  
  // Show error if user is not authenticated
  if (isLoaded && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24 pb-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mt-4">Access Denied</h1>
          <p className="text-gray-600 text-lg mt-2">Please sign in to view your inventory.</p>
        </div>
      </div>
    );
  }

  if (error || loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
            My Inventory
          </h1>
          
          <div className="text-center py-8">
            <p className="text-gray-600">No items in your inventory yet.</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Add Your First Item
            </button>
          </div>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <p className="text-sm">⚠️ Unable to load data from server.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">My Inventory</h1>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add New Item
          </button>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No Items Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start building your inventory by adding your first item!
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-end mb-4 gap-6">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                    aria-label="Edit"
                  >
                    <Pencil className="w-5 h-5" /> {/* from lucide-react */}
                  </button>
                  {/* <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Delete
                  </button> */}

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800"> Item: </span>
                    <span className="font-semibold text-gray-800">
                      {item.food_name.charAt(0).toUpperCase() +
                        item.food_name.slice(1)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{item.quantity}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-green-600">
                      ${item.amount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-semibold text-orange-600">
                      {new Date(item.expiry_date).toLocaleDateString()}
                    </span>
                  </div>

                  {item.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
