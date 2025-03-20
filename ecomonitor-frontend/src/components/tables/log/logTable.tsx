import "./../tablesStyle.css";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { GetLogDTO } from "../../dtos/GetLogDTO";

const LogTable: React.FC = () => {
  const { data: logs, loading, error } = useFetchTablesData<GetLogDTO>("/api/logs");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="entity-table__container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        height: "100%"

      }}
    >
      <TableContainer component={Paper} sx={{ height: "100%", width: "100%", backgroundColor: "#333" }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Data</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Nível</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Status HTTP</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Método</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Endpoint</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Mensagem</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>IP de Requisição</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Origem</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>User Agent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fff" }}>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.level}</TableCell>
                <TableCell>{log.httpStatus}</TableCell>
                <TableCell>{log.method}</TableCell>
                <TableCell>{log.endpoint}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.requestIp}</TableCell>
                <TableCell>{log.origin}</TableCell>
                <TableCell>{log.userAgent || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LogTable;
