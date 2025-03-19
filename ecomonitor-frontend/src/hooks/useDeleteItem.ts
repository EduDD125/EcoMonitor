import api from "src/services/api";
import { useState } from "react";

export const useDeleteItem = (endpoint: string) => {
  const [status, setStatus] = useState< "sucess" | "error" >("error");

  const deleteItem = async (id: string) => {
    try {
        await api.delete(`${endpoint}/${id}`);
        console.log("Itens deletados com sucesso:", id);
        setStatus("sucess")
      } catch (error) {
        console.error(`Erro ao deletar item de id ${id}:`, error);
        throw error;
      }
  };

  return { deleteItem, status };
};
