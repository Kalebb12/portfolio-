import { useEffect, useState } from "react";
import { sanityClient } from "../client";

export const useFetcher = (query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await sanityClient.fetch(query);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { data, isLoading, error };
};
