import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { GetReadingDTO } from "../../dtos/GetReadingDTO"

const ReadingTable: React.FC = () => {
  const { data: readings, loading, error } = useFetchTablesData<GetReadingDTO>("/api/leituras");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Localização</TableCell>
            <TableCell>Data/Hora</TableCell>
            <TableCell>Tipo de Medida</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {readings.map((reading, index) => (
            <TableRow key={index}>
              <TableCell>{reading.location}</TableCell>
              <TableCell>{new Date(reading.dateTime).toLocaleString()}</TableCell>
              <TableCell>{reading.measurementType}</TableCell>
              <TableCell>{reading.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReadingTable;
