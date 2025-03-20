import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IRoute } from "src/interfaces/routesInterfaces";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListAltIcon from "@mui/icons-material/ListAlt";


    // Definição do tipo para o contexto
interface AppContextType {
    isMobile: boolean;
    locations: string[];
    measurementTypes: string[];
    drawerMenuRoutes: IRoute[];
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
    const drawerMenuRoutes: IRoute[] = [
        {
          text: "Leituras",
          icon: <BarChartIcon />,
          subRoutes: [
            { path: "/leituras/", text: "Registros e Exportação" },
            { path: "/leituras/nova_leitura", text: "Adicionar registro" },
            { path: "/leituras/estatisticas", text: "Estatísticas" },
          ],
        },
        {
          text: "Logs do Sistema",
          icon: <ListAltIcon />,
          subRoutes: [
            { path: "/logs/", text: "Registros e Exportação" },
            { path: "/logs/estatisticas", text: "Estatísticas" },
          ],
        },
      ];
    

    // Adiciona um listener para atualizar isMobile ao redimensionar a tela
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 1025);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <AppContext.Provider value={{
        isMobile,
        locations,
        measurementTypes,
        drawerMenuRoutes, 
    }}>{children}</AppContext.Provider>;
};
