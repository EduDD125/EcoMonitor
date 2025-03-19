import { useState } from "react";
import api from "../services/api";

interface Reading {
  location: string;
  dateTime: string;
  measurementType: string;
  value: string;
}

export const useSaveReading = (id?: string) => {
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveReading = async (reading: Reading) => {
    setLoading(true);
    try {
      if (isEditing) {
        await api.put(`/api/leituras/${id}`, reading);
      } else {
        await api.post(`/api/leituras`, reading);
      }
    } catch (err) {
      setError("Erro ao salvar leitura.");
      console.error("Erro ao salvar leitura:", err);
    } finally {
      setLoading(false);
    }
  };

  return { saveReading, loading, error };
};
