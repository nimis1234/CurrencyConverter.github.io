import axios from "axios";
import { useEffect, useState } from "react";

function UseCurrencyInfo(fromCurrency) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCompUnmounted = false; // To prevent updating state after component unmount

    // Immediately set loading state to true and clear previous error
    setLoading(true);
    setError(null);

    // Define the async function to fetch data
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        // Check if component is still mounted before setting data
        if (!isCompUnmounted) {
          setData(response.data.rates); // Set the fetched data
        }
      } catch (err) {
        // Handle errors and ensure the component is still mounted before updating state
        if (!isCompUnmounted) {
          setError("Error fetching data");
          console.log(err);
        }
      } finally {
        // Set loading state to false when the fetch is complete
        if (!isCompUnmounted) {
          setLoading(false);
        }
      }
    };

    // Call the async fetch function
    fetchdata();

    // Cleanup function
    return () => {
      isCompUnmounted = true;
    };
  }, [fromCurrency]); // Re-run the effect if fromCurrency changes

  // Return data, loading, and error so the parent component can use them
  return { data, loading, error };
}

export default UseCurrencyInfo;
