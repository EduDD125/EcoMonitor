import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useFetchStatistics } from "src/hooks/useFetchStatistics";

const StatisticsChart: React.FC = () => {
    const { stats, setStats, loading, error } = useFetchStatistics();

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div style={{ 
        backgroundColor: "#fff", 
        borderRadius: "12px", 
        padding: "16px", 
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
        width: "100%", 
        height: "100%", 
        margin: "auto",
        boxSizing: "border-box"
        }}>
        <ResponsiveContainer width="100%" height={"100%"}>
            <BarChart data={stats}>
            <XAxis dataKey="measurementType" stroke="#333" />
            <YAxis stroke="#333" />
            <CartesianGrid strokeDasharray="3 3" stroke="#000" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avg_value" fill="#74c0fc" radius={[8, 8, 0, 0]} />
            <Bar dataKey="max_value" fill="#a5d8ff" radius={[8, 8, 0, 0]} />
            <Bar dataKey="min_value" fill="#c5e1ff" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default StatisticsChart;
