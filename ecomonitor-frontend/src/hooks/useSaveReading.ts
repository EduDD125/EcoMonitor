import { useState } from "react";
import api from "../services/api";
import { Reading } from "src/interfaces/reading";



export const useSaveReading = (id?: string) => {
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveReading = async (reading: Reading) => {
    setLoading(true);
    console.log("reading", reading);
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
