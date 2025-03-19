import "./../tablesStyle.css"
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { GetReadingDTO } from "../../dtos/GetReadingDTO"

const ReadingTable: React.FC = () => {
  const { data: readings, loading, error } = useFetchTablesData<GetReadingDTO>("/api/leituras");

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="entity-table__container">
      <TableContainer component={Paper} sx={{ maxHeight: 440, width: "min-content", backgroundColor: "#333" }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "#333" }}>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Localização</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Data/Hora</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Tipo de Medida</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fff" }}>
            {readings.map((reading, index) => (
              <TableRow hover role="checkbox" key={index}>
                <TableCell>{reading.location}</TableCell>
                <TableCell>{new Date(reading.dateTime).toLocaleString()}</TableCell>
                <TableCell>{reading.measurementType}</TableCell>
                <TableCell>{reading.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReadingTable;
