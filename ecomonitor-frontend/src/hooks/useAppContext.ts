import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// Hook customizado para facilitar o uso do contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
};
