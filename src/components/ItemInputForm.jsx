import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { validationSchema } from "./Schema";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";


export const ItemInputForm = ({ onSubmit, initialValues }) => { 
  const [formValues, setFormValues] = useState(initialValues || {
    food_name: "",
    quantity: "",
      expiry_date: "",
    amount: "",
    store: "",
    category: "Fruits ",
  });
    // fields from the contolles/food_inventoryController.js
    
    
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

    ]
// Formik handles all form state (values, errors, touched, etc.) internally.
    const [storeList, setStoreList] = useState([]);

    useEffect(() => {
        const stores = JSON.parse(localStorage.getItem("stores") || "[]");
        setStoreList(stores);
      }, []);

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
          // Save store to localStorage
  let stores = JSON.parse(localStorage.getItem("stores") || "[]");
  if (values.store && !stores.includes(values.store)) {
    stores.push(values.store);
    localStorage.setItem("stores", JSON.stringify(stores));
              }
              console.log("Form values sent to inventory:", values); // <-- Add this line
        onSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Card className="w-full max-w-md mx-auto mt-2 ">
          <CardHeader>
            <CardTitle className="text-2xl mb-4 font-semibold text-center text-green-600 ">ADD AN ITEM</CardTitle>
          </CardHeader>
          <CardContent>
                      <Form>
                          

                          {/* food name */}
            <label htmlFor="food_name" className="block text-md font-medium text-green-700 mb-1">
                FOOD NAME
            </label>
              <Field name="food_name">
                {({ field }) => (
                  <Input
                    {...field}
                                      placeholder="Item Name"
                                      id="food_name"
                                      type="text"
                                      name="food_name"
                   
                  />
                )}
                          </Field>
                          
                          <div className= "mt-[-2] mb-3">
                                {touched.food_name && errors.food_name &&
                                    <p className="text-red-500 text-sm ">
                                        {errors.food_name}
                                    </p>}
                          </div>

                          
                          {/* quantity & price */}
                          
                          <div className=" flex gap-4">

                              <div className="flex-1">
                                  
                              <label htmlFor="quantity" className="block text-md font-medium text-green-700 mb-1">
                                QUANTITY
                                </label>      
              <Field name="quantity">
                {({ field }) => (
                  <Input
                    {...field}
                    type="number"
                                      placeholder="Quantity"
                                      name="quantity"
                                      id="quantity"
                    
                  />
                )}
                          </Field>
                          

                          <div className= "mt-[-2] mb-3">
                              {touched.quantity && errors.quantity &&   
                                    <p className="text-red-500 text-sm ">   
                                        {errors.quantity}
                                  </p>}
                          </div>
                              </div>
                              

                              {/* price */}

                              <div className="flex-1" >
                                  
                              <label htmlFor="amount" className="block text-md font-medium text-green-700 mb-1">
      PRICE
    </label>

                              <Field name="amount">
                                  {({ field }) => (   
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Price"
                                            name="amount"
                                            id="amount"
                                        />
                                      )}
                                  </Field>
                                  
                                  <div  className= "mt-[-2] mb-3">
                                        {touched.amount && errors.amount &&
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.amount}
                                            </p>}
                                  </div>
                              
                              </div>

                          </div>


        {/* expiry date and category */}
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
                                              name="expiry_date"
                    min={new Date().toISOString().split("T")[0]} // disables past dates
                  />
                    )}
              </Field>


                <div className= "mt-[-2] mb-3">
                    {touched.expiry_date && errors.expiry_date &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.expiry_date}
                        </p>}
                </div>

            </div>
                       
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full mb-4">
                    {formValues.category}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onValueChange={(value) => setFormValues({ ...formValues, category: value })}>
                  {["Fruits & Vegetables", "Dairy", "Meat & Fish", "Grains", "Snacks"].map((category) => (
                    <DropdownMenuItem key={category} value={category}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}
                          

            {/* category */}

                <div className="flex-1">
                    <label htmlFor="category" className="block text-md font-medium text-green-700 mb-1">
                        CATEGORY
                    </label>
                          
                                  
                        <Field as="select" name="category" id="category"
                            className="mb-4"
                              style={{
                            display: "block"
                        }}>
                            <option value="" label="Select Category" > Select a category</option>
                            <option value="Fruits" label="Fruits">Fruits</option>
                            <option value="Vegetables" label="Vegetables">Vegetables</option>
                            <option value="Dairy" label="Dairy">Dairy</option>
                            <option value="Meat" label="Meat">Meat</option> 
                            <option value="Seafood" label="Seafood">Seafood</option>
                            <option value="Grains" label="Grains">Grains</option>
                            <option value="Snacks" label="Snacks">Snacks</option>
                            <option value="Staples" label="Staples">Staples</option>
                            <option value="Beverages" label="Beverages">Beverages</option>
                            <option value="Others" label="Others">Others</option>   
                    </Field>  


                          <div className= "mt-[-2] mb-3">
                              {touched.category && errors.category &&
                                  <p className="text-red-500 text-sm mt-1">
                                      {errors.category}
                                  </p>}
                        </div>


                    </div>
                    </div>          
                             
                          
                          {/* store  */}
                <div className="flex-1">
                <label htmlFor="amount" className="block text-md font-medium text-green-700 mb-1">
                    STORE
                </label>
                                          
                              
                <Field name="store">

                                  {({ field }) => (
                                    <>
                        <Input 
                            {...field}
                            type="text"
                            placeholder="Store Name"
                            name="store"
                                          id="store" 
                                          list="store-list"
                            autoComplete="off"              
                                          />
                                          
                                          <datalist id="store-list">
        {storeList.map((store) => (
          <option key={store} value={store} />
        ))}
      </datalist>          
                               </>                     
                    )}
                              </Field>   
                              
                <div className="mt-[-2] mb-3">
                    {touched.store && errors.store &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.store}
                        </p>}

                </div>
            </div>
                               
                          
                          <Button type="submit" className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white">  
                              ADD ITEM
                          </Button>
            
                         
                      </Form>
                  </CardContent>
              </Card>
    )}
    </Formik>
  );
};


