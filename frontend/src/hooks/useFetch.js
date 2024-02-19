import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue, ...params) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      
      try {
        const _fetchedData = await fetchFn(...params);
        setFetchedData(_fetchedData);
      } catch (e) {
        setIsFetching(false);
        setError({ message: e.message || "Failed to fetch data." });
      }
      
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {isFetching, error, fetchedData, setFetchedData};
}