import { useState } from "react";
import api from "src/services/api";

export const useFetchFilteredReadings = () => {
  const [loading, setLoading] = useState(false);

  const fetchFilteredData = async (filters: { locations?: string[], measurementTypes?: string[] }) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (filters.locations && filters.locations.length > 0) {
        queryParams.append("locations", filters.locations.join(","));
      }
      if (filters.measurementTypes && filters.measurementTypes.length > 0) {
        queryParams.append("measurementTypes", filters.measurementTypes.join(","));
      }

      const url = `/api/leituras?${queryParams.toString()}`;

      console.log("url:", url);
      return
      //const response = await api.get(url);
      //return response.data;
    } catch (error) {
      console.error("Erro ao buscar leituras filtradas:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchFilteredData, loading };
};
