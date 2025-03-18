import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { GetLogDTO } from "../../dtos/GetLogDTO";

const LogTable: React.FC = () => {
  const { data: logs, loading, error } = useFetchTablesData<GetLogDTO>("/api/logs");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nível</TableCell>
            <TableCell>Status HTTP</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Endpoint</TableCell>
            <TableCell>Mensagem</TableCell>
            <TableCell>IP de Requisição</TableCell>
            <TableCell>Origem</TableCell>
            <TableCell>User Agent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
  );
};

export default LogTable;
