import React from "react";
import { Plus } from "lucide-react";

const AddItemButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 bg-green-500 hover:bg-green-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
    title="Add Item"
    aria-label="Add Item"
  >
    <Plus className="w-6 h-6" />
  </button>
);

export default AddItemButton;