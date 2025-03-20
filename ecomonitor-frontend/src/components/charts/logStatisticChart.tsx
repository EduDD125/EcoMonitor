import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

interface LogStatistics {
  level: string;
  count_per_level: number;
  method: string;
  count_per_method: number;
  httpStatus: number;
  count_per_status: number;
  endpoint: string;
  count_per_endpoint: number;
}

const COLORS = ["#74C0FC", "#FFA94D", "#FF6B6B", "#51CF66", "#D0BFFF"];

const LogsDashboard: React.FC = () => {
  const [data, setData] = useState<LogStatistics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await api.get("/api/logs/estatisticas");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar estatísticas de logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <CircularProgress />;

  // Preparando os dados para os gráficos
  const logsByLevel = Object.values(
    data.reduce((acc, log) => {
      acc[log.level] = acc[log.level] || { name: log.level, count: 0 };
      acc[log.level].count += log.count_per_level;
      return acc;
    }, {} as Record<string, { name: string; count: number }>)
  );

  const logsByMethod = Object.values(
    data.reduce((acc, log) => {
      acc[log.method] = acc[log.method] || { name: log.method, count: 0 };
      acc[log.method].count += log.count_per_method;
      return acc;
    }, {} as Record<string, { name: string; count: number }>)
  );

  const logsByStatus = Object.values(
    data.reduce((acc, log) => {
      acc[log.httpStatus] = acc[log.httpStatus] || { name: log.httpStatus.toString(), count: 0 };
      acc[log.httpStatus].count += log.count_per_status;
      return acc;
    }, {} as Record<string, { name: string; count: number }>)
  );

  const logsByEndpoint = Object.values(
    data.reduce((acc, log) => {
      acc[log.endpoint] = acc[log.endpoint] || { name: log.endpoint, count: 0 };
      acc[log.endpoint].count += log.count_per_endpoint;
      return acc;
    }, {} as Record<string, { name: string; count: number }>)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 3 , width: "100%", height: "100%", background: "rgba(255,255,255,0.6)"}}>
      <Typography variant="h4" align="center">
        📊 Painel de Estatísticas de Logs
      </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", height: "100%", gap: 4, p: 3 , width: "100%"}}>
      {/* Logs por Nível */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, width: "30%" }}>
        <Typography variant="h6">Logs por Nível</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={logsByLevel} dataKey="count" nameKey="name" outerRadius={120}>
              {logsByLevel.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      {/* Logs por Método HTTP */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, width: "30%"}}>
        <Typography variant="h6">Logs por Método HTTP</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logsByMethod}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#74C0FC" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Logs por Código de Status HTTP */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, width: "30%" }}>
        <Typography variant="h6">Logs por Código de Status HTTP</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logsByStatus}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FFA94D" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Logs por Endpoint */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, width: "30%" }}>
        <Typography variant="h6">Endpoints Mais Acessados</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={logsByEndpoint}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#51CF66" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      </Box>
    </Box>
  );
};

export default LogsDashboard;
