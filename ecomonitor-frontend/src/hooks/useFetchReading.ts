import { useEffect, useState } from "react";
import api from "../services/api";
import { Reading } from "src/interfaces/reading";



export function useFetchReading(id?: string) {
  const [reading, setReading] = useState<Reading>({
    location: "",
    dateTime: new Date().toISOString(), // Inicializa com data correta
    measurementType: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/api/leituras/${id}`)
        .then((response) => {
          setReading({
            ...response.data,
            dateTime: response.data.dateTime, // Formata a data ao carregar
          });
        })
        .catch((err) => {
          console.error("Erro ao buscar leitura:", err);
          setError("Erro ao buscar leitura.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return { reading, setReading, loading, error };
}
