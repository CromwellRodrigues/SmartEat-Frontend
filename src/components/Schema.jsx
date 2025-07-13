import { Store } from "lucide-react";
import React from "react";

import *  as Yup from 'yup';

const initialValues = {
    food_name: '',
    quantity: '',
    amount: '',
    expiry_date: '',
    category: '',
    store: '',
    
}


// define the regex pattern for the food name
const textPattern = /^[a-zA-Z0-9\s]*$/;


// define the validation schema
export const validationSchema = Yup.object().shape({

    food_name: Yup.string()
        .transform(value => {
            if (value) {
                const trimmedValue = value.trim();
                return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1).toLowerCase();
            }
            return value;
        })
        .required('Food name is required') 
        .matches(textPattern, 'Food name can only contain letters, numbers, and spaces')
        .min(2, 'Food name must be at least 2 characters long') 
        .max(20, 'Food name must be at most 20 characters long'),
    
    
    quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be a positive number')
        .integer('Quantity must be an integer')
        .min(1, 'Quantity must be at least 1')
        .max(99, 'Quantity must be at most 99'),

    
    
    amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be a positive number')
        .min(0.01, 'Amount must be at least 0.01')
        .max(999.99, 'Amount must be at most 999.99'),
    
    expiry_date: Yup.date()
        .required('Expiry date is required')
        .min(new Date(), 'Expiry date must be in the future'),
      
    
    category   : Yup.string()
        .required('Category is required')
        .oneOf(['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Seafood', 'Grains', 'Snacks', 'Staples', 'Beverages', 'Others'], 'Invalid category'),
    
    store: Yup.string()
        .required('Store is required')
        .matches(textPattern, 'Food name can only contain letters, numbers, and spaces')
        .min(2, 'Store name must be at least 2 characters')
        .max(20, 'Store name must be at most 20 characters'),
    
})