/** @format */

import { useEffect, useState } from "react";

type useGetDataProps = string;

export const useGetData = (queryString: useGetDataProps) => {
  // store data, status
  const [dataRes, setDataRes] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData(query: string) {
        try {
          // while loading
          setLoading(true);
          setError("");

          // featch and convert data
          const res = await fetch(`http://127.0.0.1:3000/api/v1/${query}`);
          const data = await res.json();

          // store to state
          setDataRes(data);
        } catch (err) {
          // throw err
          setError(err.message);
          throw Error(err.message);
        } finally {
          // stop loading
          setLoading(false);
        }
      }

      fetchData(queryString);
    },
    [queryString]
  );

  return { dataRes, error, isLoading };
};
