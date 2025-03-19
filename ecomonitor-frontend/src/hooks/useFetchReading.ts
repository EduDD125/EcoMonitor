import { useEffect, useState } from "react";
import api from "../services/api";

interface Reading {
  location: string;
  dateTime: string;
  measurementType: string;
  value: string;
}

function formatDateForInput(date: string) {
  const dt = new Date(date);
  return dt.toISOString().slice(0, 16); // Garante formato "YYYY-MM-DDTHH:MM"
}

export function useFetchReading(id?: string) {
  const [reading, setReading] = useState<Reading>({
    location: "",
    dateTime: formatDateForInput(new Date().toISOString()), // Inicializa com data correta
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
            dateTime: formatDateForInput(response.data.dateTime), // Formata a data ao carregar
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
