import { useEffect, useState } from "react";
import api from "./../services/api";

const useFetchTablesData = <T,>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T[]>(endpoint);
        setData(response.data);
      } catch (err) {
        setError("Erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error, setData };
};

export default useFetchTablesData;
