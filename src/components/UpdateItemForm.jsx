import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { validationSchema } from "./Schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export const UpdateItemForm = ({ item, onSubmit, onClose }) => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const stores = JSON.parse(localStorage.getItem("stores") || "[]");
    setStoreList(stores);
  }, []);

    
   const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Meat",
    "Seafood",
    "Grains",
    "Snacks",
    "Staples",
    "Beverages",
    "Others",
    ];
    
    const formatDate = (date) => {
  if (!date) return "";
  // If already in YYYY-MM-DD, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  // Otherwise, convert to YYYY-MM-DD
  return new Date(date).toISOString().split("T")[0];
};

const initialValues = {
  ...item,
  expiry_date: formatDate(item.expiry_date),
  category: categories.find(
    cat => cat.toLowerCase() === (item.category || "").toLowerCase()
  ) || "",
};    

    console.log("UpdateItemForm initialValues:", initialValues);
    
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Optionally update store list in localStorage
        let stores = JSON.parse(localStorage.getItem("stores") || "[]");
        if (values.store && !stores.includes(values.store)) {
          stores.push(values.store);
          localStorage.setItem("stores", JSON.stringify(stores));
        }
              
        // Capitalise category before sending
        if (values.category) {
          values.category = values.category.charAt(0).toUpperCase() + values.category.slice(1).toLowerCase();
        }
        console.log("UpdateItemForm onSubmit called with:", item.id, typeof item.id, values);

        // Await the update and close the form only if successful
        try {
          await onSubmit(item.id, {
            food_name: values.food_name,
            category: values.category,
            expiry_date: values.expiry_date,
            quantity: values.quantity,
            amount: values.amount,
            store: values.store
          });
            
          // After successful update, close the form
          if (typeof onClose === "function") {
            onClose();
          }
          // Call editItem from your hook
        } catch (error) {
          console.error("Error updating item:", error);
        }
      }}
    >
      {({ errors, touched }) => (
        <Card className="bg-green-100  border border-green-300 w-full max-w-md mx-auto mt-2">

              <button 
      type="button"
      onClick={onClose}
      className="text-gray-400 flex justify-end pr-8 hover:text-red-600 text-xl font-bold ml-2"
      aria-label="Close"
    >
      ×
    </button>
          <CardHeader className="flex  items-center">
            <CardTitle className="flex-1 text-2xl mb-4 font-semibold text-center text-green-600">
              UPDATE AN ITEM
            </CardTitle>

        
          </CardHeader>
          <CardContent>
            <Form>
             
                          {/* food_name */}
              <label htmlFor="food_name" className="block text-md font-medium text-green-700 mb-1">
                FOOD NAME
              </label>
              <Field name="food_name">
                {({ field }) => (
                  <Input {...field} placeholder="Item Name" id="food_name" type="text" />
                )}
              </Field>
              <div className="mt-[-2] mb-3">
                {touched.food_name && errors.food_name && (
                  <p className="text-red-500 text-sm">{errors.food_name}</p>
                )}
              </div>

                          {/* quantity  & price */}
                         <div className="flex gap-4">
                <div className="flex-1">
              <label htmlFor="quantity" className="block text-md font-medium text-green-700 mb-1">
                QUANTITY
              </label>
              <Field name="quantity">
                {({ field }) => (
                  <Input {...field} type="number" placeholder="Quantity" id="quantity" />
                )}
              </Field>
              <div className="mt-[-2] mb-3">
                {touched.quantity && errors.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}
                                  </div>
                </div>
                <div className="flex-1">

              {/* amount */}
              <label htmlFor="amount" className="block text-md font-medium text-green-700 mb-1">
                PRICE
              </label>
              <Field name="amount">
                {({ field }) => (
                  <Input {...field} type="number" placeholder="Price" id="amount" />
                )}
              </Field>
              <div className="mt-[-2] mb-3">
                {touched.amount && errors.amount && (
                  <p className="text-red-500 text-sm">{errors.amount}</p>
                )}
                                  </div>
                </div>
              </div>

                          {/* expiry_date & category  */}
                <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="expiry_date" className="block text-md font-medium text-green-700 mb-1">
                    EXPIRY DATE
                  </label>
                  <Field name="expiry_date">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        id="expiry_date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    )}
                  </Field>
                  <div className="mt-[-2] mb-3">
                    {touched.expiry_date && errors.expiry_date && (
                      <p className="text-red-500 text-sm">{errors.expiry_date}</p>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label htmlFor="category" className="block text-md font-medium text-green-700 mb-1">
                    CATEGORY
                  </label>
                  <Field as="select" name="category" id="category" className="mb-4">
                    <option value="" label="Select Category">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Field>
                  <div className="mt-[-2] mb-3">
                    {touched.category && errors.category && (
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                  </div>
                </div>
              </div>


              {/* store */}
              <label htmlFor="store" className="block text-md font-medium text-green-700 mb-1">
                STORE
              </label>
              <Field name="store">
                {({ field }) => (
                  <>
                    <Input {...field} type="text" placeholder="Store Name" id="store" list="store-list" autoComplete="off" />
                    <datalist id="store-list">
                      {storeList.map((store) => (
                        <option key={store} value={store} />
                      ))}
                    </datalist>
                  </>
                )}
              </Field>
              <div className="mt-[-2] mb-3">
                {touched.store && errors.store && (
                  <p className="text-red-500 text-sm">{errors.store}</p>
                )}
              </div>

              <Button type="submit" className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white">
                UPDATE ITEM
              </Button>
            </Form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};