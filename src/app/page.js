'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import SafeScreen from '../components/SafeScreen';
import PageTransition from '../components/PageTransition';
import { useInventory } from '../../hooks/useInventory';
import { useSummary } from '../../hooks/useSummary';
import PageLoader from '@/components/PageLoader';
import { AlertTriangle, Clock, Trash } from "lucide-react";
// import { FixedSizeList as List } from "react-window";
import { InventoryItem } from "@/components/InventoryItem";
import NoInventoryFound from '@/components/NoInventoryItemFound';
import AddItemButton from "@/components/AddItemButton";
import AddItemModal from "@/components/AddItemModal";

// This component renders the home page with a personalized dashboard
// const MyList = ({ items, renderItem }) => (
//   <List
//     height={600} // height of the list viewport
//     itemCount={items.length}
//     itemSize={220} // height of each card (adjust as needed)
//     width="100%"
//   >
//     {({ index, style }) => (
//       <div style={style}>{renderItem(items[index], index)}</div>
//     )}
//   </List>
// );

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://smarteat-8iec.onrender.com/api";


const Home = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  // const { inventory, loading: inventoryLoading, deleteItem, loadData } = useInventory(user?.id);
  const { summary, loading: summaryLoading } = useSummary(user?.id);
  const userId = isLoaded && isSignedIn ? user.id : null;
  const {
    inventory,
    loading: inventoryLoading,
    deleteItem,
    loadData,
    editItem
  } = useInventory(userId);

  // Remove this useEffect since the hook already auto-loads data
  // useEffect(() => {
  //   if (typeof loadData === "function") {
  //     loadData();
  //   }
  // }, [loadData]);

  console.log("UserID:", user);
  console.log("Inventory:", inventory);

if(!isLoaded) return <PageLoader />;

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <SafeScreen>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </PageTransition>
      </SafeScreen>
    );
  }

  // If user is not signed in, show welcome page with sign-in button
  if (!isSignedIn) {
    return (
      <SafeScreen>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 pt-0">
            <motion.div 
              className="text-center max-w-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <Image
                  src="/images/boy.png"
                  alt="hero image"
                  width={150}
                  height={150}
                  className="mx-auto mb-8 rounded-full shadow-lg"
                  priority
                />
              </motion.div>

              <motion.h1 
                className="text-4xl font-bold text-gray-800 mb-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Welcome to Pantry Pal!
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-1 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                Keep calm and Pantry Pal on!
              </motion.p>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                <Link href="/sign-up">
                  <motion.button 
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Sign Up to Get Started
                  </motion.button>
                </Link>

                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                >
                  Manage your food inventory and never let food expire again!
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </PageTransition>
      </SafeScreen>
    );
  }


  const handleAddItem = async (item) => {
    try {
      // Send the new item to your backend
      const response = await fetch(
        `${API_URL}/food_inventory/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, user_id: userId }),
        }
      );
      // Try to parse JSON only if response is JSON
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Backend did not return JSON");
      }

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      await loadData();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // If user is signed in, show personalized dashboard
  return (
    <SafeScreen>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8 overflow-auto pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              className="text-center mt-10 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1
                className="text-3xl font-bold text-gray-800 m
              pt-4 mb-2"
              >
                Hello,{" "}
                {user?.emailAddresses[0]?.emailAddress
                  ?.split("@")[0]
                  ?.replace(/^([a-zA-Z])/, (c) => c.toUpperCase())}
                ! 👋
              </h1>
            </motion.div>

            {/* <AddItemButton
              onClick={() => console.log("Add Item Button Clicked")}
            /> */}

            <AddItemModal onSubmit={handleAddItem} />

            {/*  Inventory Items List*/}
            <motion.div
              className="rounded-lg shadow-md p-6 mb-14  bg-yellow-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex justify-between items-center mb-4  ">
                <h2 className="text-xl font-bold text-gray-800">The Stash</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {inventory.map((item, index) => (
                  <InventoryItem
                    key={item.id}
                    item={item}
                    deleteItem={deleteItem}
                    editItem = {editItem}
                  />
                ))}
              </div>

              {inventoryLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading inventory...</p>
                </div>
              ) : inventory.length === 0 ? (
                <NoInventoryFound />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* {inventory.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Item: {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires:{" "}
                            {new Date(item.expiry_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            Price : £{item.price}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))} */}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </SafeScreen>
  );
};

export default Home;
