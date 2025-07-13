import  { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://smarteat-8iec.onrender.com/api/food_inventory/summary';

export const useSummary = (userId) => {
    const [summary, setSummary] = useState({
        
        total_expiring_soon: 0,
        total_out_of_stock: 0,
        total_items: 0,
        total_amount: 0,
    });

  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        if (!userId) {
            setError('User ID is required');
            console.log("❌ No userId provided, skipping API call");
            setLoading(false);
            return;
          }

          console.log("✅ Making API call with userId:", userId);
        
        const fetchSummary = async () => {
            setLoading(true);
                setError(null);
            try {
                
                const response = await fetch(`${API_URL}/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch summary');
                }
                const data = await response.json();
                console.log("📡 API response data:", data);
                setSummary(data);
            } catch (err) {
                console.error("❌ API call failed:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    fetchSummary();
  }, [ userId]);

  return { summary, loading, error };
}