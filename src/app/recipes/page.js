"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import SafeScreen from "../../components/SafeScreen";
import PageTransition from "../../components/PageTransition";
import PageLoader from "../../components/PageLoader";

const RECIPE_CATEGORIES = [
  "Chicken",
  "Beef",
  "Pork",
  "Fish & Seafood",
  "Vegetarian",
  "Vegan",
  "Pasta",
  "Rice Dishes",
  "Salads",
  "Desserts",
  "Soups",
  "Breakfast",
  "Snacks",
  "Baking",
];

const RecipesPage = () => {
  const { user, isLoaded } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    recipe_name: "",
    recipe_url: "",
    category: "",
    notes: "",
  });

  // Show loading while user is loading
  if (!isLoaded) {
    return (
      <SafeScreen>
        <PageTransition>
          <div className="min-h-screen bg-gray-50 px-4 py-8">
            <PageLoader message="Loading recipes..." />
          </div>
        </PageTransition>
      </SafeScreen>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <SafeScreen>
        <PageTransition>
          <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-4xl mx-auto text-center py-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                My Recipes
              </h1>
              <p className="text-gray-600">
                Please sign in to save and view your recipes.
              </p>
            </div>
          </div>
        </PageTransition>
      </SafeScreen>
    );
  }

  const handleSaveRecipe = async () => {
    // TODO: Implement save recipe functionality
    console.log("Saving recipe:", formData);
    // Reset form
    setFormData({ recipe_name: "", recipe_url: "", category: "" });
    setShowAddForm(false);
  };

  const handleDeleteRecipe = async (recipeId) => {
    // TODO: Implement delete recipe functionality
    console.log("Deleting recipe:", recipeId);
  };

  return (
    <SafeScreen>
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Recipes Feature Coming Soon!
            </h1>
            <p className="text-gray-600">
              You’ll soon be able to save and browse your favorite recipes here.
            </p>
          </div>
        </div>
      </PageTransition>
    </SafeScreen>
  );
};

export default RecipesPage;
