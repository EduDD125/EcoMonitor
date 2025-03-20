import React, { createContext, useState, useEffect, ReactNode } from "react";

    // Definição do tipo para o contexto
interface AppContextType {
    isMobile: boolean;
    locations: string[];
    measurementTypes: string[];
}

// Criando o Contexto com um valor padrão
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1025);
    const locations = ["São Paulo", "Rio de Janeiro"];
    const measurementTypes = ["Humidade do Ar", "Temperatura", "CO2 na atmosfera"];

    // Adiciona um listener para atualizar isMobile ao redimensionar a tela
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 1025);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <AppContext.Provider value={{
        isMobile, locations, measurementTypes 
    }}>{children}</AppContext.Provider>;
};
