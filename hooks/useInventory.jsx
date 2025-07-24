// react custom hook file
import { useState, useEffect } from 'react';



const API_URL = 'https://smarteat-8iec.onrender.com/api';

export const useInventory = (userId) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadData = async () => {
      console.log("UserID being used:", userId); 
    if (!userId) {
      setError('User ID is required');
      setLoading(false);
      return;
    }


    // const fetchInventory = async () => {
      try {
          setLoading(true);
          setError(null);
        const response = await fetch(`${API_URL}/food_inventory/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  //   fetchInventory();
  // }, [userId]);

    
 // Auto-load inventory on mount or when userId changes
  useEffect(() => {
    if (userId) { 
    loadData();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userId]);

    
  // Add the deleteItem function that your page.js is expecting
  const deleteItem = async (itemId) => {
    try {
          
          setError(null);
      const response = await fetch(`${API_URL}/food_inventory/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      // Remove item from local state
      setInventory(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };
  


 // Add editItem here
  const editItem = async (itemId, updatedData) => {
    // Capitalise category before sending
    if (updatedData.category) {
      updatedData.category = updatedData.category.charAt(0).toUpperCase() + updatedData.category.slice(1).toLowerCase();
    }
    try {
      const response = await fetch(`${API_URL}/food_inventory/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  food_name: updatedData.food_name,
  category: updatedData.category,
  expiry_date: updatedData.expiry_date,
  quantity: updatedData.quantity,
  amount: updatedData.amount,
  store: updatedData.store
}),
      });
      if (!response.ok) throw new Error('Failed to update item');
      const updatedItem = await response.json();
      setInventory(prev =>
        prev.map(item => (item.id === itemId ? updatedItem.updatedItem : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };
    
  return { inventory, loading, error, deleteItem, loadData, editItem };
}