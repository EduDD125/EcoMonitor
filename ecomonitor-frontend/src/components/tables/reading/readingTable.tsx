import "./../tablesStyle.css";
import React, { useState } from "react";
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
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { useDeleteItem } from "../../../hooks/useDeleteItem";
import { GetReadingDTO } from "../../dtos/GetReadingDTO";
import TableFilter from "src/components/filters/tableFilter";

const ReadingTable: React.FC = () => {
  const { data: readings, loading, error, setData } = useFetchTablesData<GetReadingDTO>("/api/leituras");
  const { deleteItem, status } = useDeleteItem("/api/leituras");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Selecionar/deselecionar um único item
  const handleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  // Selecionar/deselecionar todos os itens
  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === readings.length ? [] : readings.map((reading) => reading.id));
  };

  // Deletar itens selecionados
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    selectedIds.map( async item => {
        await deleteItem(item); 
        if (status == "error") setSelectedIds((prev) => prev.filter((reading) => !reading.includes(item)))
    });
  
    setData((prev) => prev.filter((reading) => !selectedIds.includes(reading.id)));
    setSelectedIds([]);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="entity-table__container">
      <TableFilter
        onChange={() => console.log()}
        options1={["São Paulo", "Rio de Janeiro"]}
        options2={["Humidade do Ar", "Temperatura", "CO2 na atmosfera"]}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 440, width: "100%", backgroundColor: "#333" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "#333" }}>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>
                <Checkbox
                  checked={selectedIds.length === readings.length && readings.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < readings.length}
                  onChange={handleSelectAll}
                />
                <IconButton onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
                  <DeleteIcon color={selectedIds.length > 0 ? "error" : "disabled"} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Localização</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Data/Hora</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Tipo de Medida</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff" }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#fff" }}>
            {readings.map((reading) => (
              <TableRow hover role="checkbox" key={reading.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(reading.id)}
                    onChange={() => handleSelectItem(reading.id)}
                  />
                </TableCell>
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
