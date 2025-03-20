import { useEffect, useState } from "react";
import api from "../services/api";



export function useFetchStatistics(): { stats: any, setStats: React.Dispatch<any>, loading: boolean, error: any } {
    const [stats, setStats] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        api.get("/api/leituras/estatisticas")
            .then((response) => {
                console.log("response:", response)
                setStats(response.data);
            })
            .catch((err) => {
            console.error("Erro ao buscar leitura:", err);
            setError("Erro ao buscar leitura.");
            })
            .finally(() => setLoading(false));
    }, []);

    return { stats, setStats, loading, error };
}
