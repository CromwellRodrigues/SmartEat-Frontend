import { AlertTriangle, Clock, Trash, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {UpdateItemForm} from "./UpdateItemForm.jsx";


export const InventoryItem = ({ item, deleteItem, editItem }) => {

    const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  // Calculate days until expiry
  const today = new Date();
  const expiry = new Date(item.expiry_date);
  const diffTime = expiry.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Expiry status line
  let expiryStatus = "";
  if (diffDays < 0) {
    expiryStatus = (
      <span className="inline-flex items-center gap-1">
        <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
        Expired item
      </span>
    );
  } else if (diffDays === 0) {
    expiryStatus = (
      <span className="inline-flex items-center gap-1">
        <Clock className="w-4 h-4 text-red-500" />
        Expiry today
      </span>
    );
  } else if (diffDays === 1) {
    expiryStatus = (
      <span className="inline-flex items-center gap-1">
        <Clock className="w-4 h-4 text-orange-400" />
        Expiry in 1 day
      </span>
    );
  } else if (diffDays > 1 && diffDays <= 3) {
    expiryStatus = (
      <span className="inline-flex items-center gap-1">
        <Clock className="w-4 h-4 text-orange-400" />
        Expiry in {diffDays} days
      </span>
    );
  } else {
    expiryStatus = `Expiry in ${diffDays} days`;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative  w-4/5 md:w-4/5 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex justify-between absolute top-2 left-0 w-full px-2 z-10">
 {/* Edit Button */}
      <button
        className=" p-1 rounded bg-white hover:bg-blue-100 shadow"
        title="Edit item"
        onClick={() => setEditOpen(true)}
        type="button"
      >
        <Pencil className="w-5 h-5 text-blue-500" />
      </button>

         {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Edit Item</DialogTitle> */}
          </DialogHeader>
          <UpdateItemForm
            item={item}
            onSubmit={editItem}
            
          />
        </DialogContent>
      </Dialog>   


   
{/* delete */}
<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="p-1 rounded bg-white hover:bg-red-100 shadow"
            title="Delete item"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <b>{item.food_name}</b>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteItem(item.id);
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
          </Dialog>
       </div>     
          
      <div className="space-y-2">
        <div className="flex justify-center">
          <span className="font-semibold text-gray-800 bg-yellow-100 p-2 rounded">
            {item.food_name.charAt(0).toUpperCase() + item.food_name.slice(1)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-semibold">{item.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold text-green-600">
            £ {item.amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Expires:</span>
          <span className="font-semibold text-orange-600">
            {new Date(item.expiry_date).toLocaleDateString()}
          </span>
        </div>
        <div
          className={`text-sm text-right font-semibold ${
            diffDays <= 0
              ? "text-red-600"
              : diffDays <= 3
              ? "text-orange-500"
              : "text-gray-500"
          }`}
        >
          {expiryStatus}
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
    </motion.div>
  );
};