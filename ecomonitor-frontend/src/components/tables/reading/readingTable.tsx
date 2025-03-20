import "./../tablesStyle.css";
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useFetchTablesData from "../../../hooks/useFetchTablesData";
import { useDeleteItem } from "../../../hooks/useDeleteItem";
import { GetReadingDTO } from "../../dtos/GetReadingDTO";
import TableFilter from "src/components/filters/tableFilter";
import ToastNotification from "src/components/toasts/toastNotification";

const ReadingTable: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação
  const { data: readings, loading, error, setData } = useFetchTablesData<GetReadingDTO>("/api/leituras");
  const { deleteItem } = useDeleteItem("/api/leituras");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    status: 200,
  });

  const handleShowToast = (message: string, status: number) => {
    setToast({ open: true, message, status });
  };

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
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      await Promise.all(selectedIds.map((id) => deleteItem(id)));

      setData((prev) => prev.filter((reading) => !selectedIds.includes(reading.id)));
      setSelectedIds([]);
      handleShowToast(`Deleção de leitura bem sucedida`, 200);
    } catch (error) {
      console.error("Erro ao deletar leituras:", error);
      handleShowToast(`Erro durante deleção`, 500);
    }
  };

  // Navegar para detalhes da leitura ao clicar na linha (exceto no checkbox)
  const handleRowClick = (event: React.MouseEvent, id: string) => {
    if ((event.target as HTMLElement).tagName.toLowerCase() === "input") return; // Ignora clique no checkbox
    navigate(`/leituras/${id}`); // Navega para a página de detalhes da leitura
  };
  
  useEffect(() => {console.log(readings)},[readings]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="entity-table__container">
      <TableFilter 
        onUpdateTable={setData} 
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
              <TableRow hover role="checkbox" key={reading.id} onClick={(event) => handleRowClick(event, reading.id)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
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
      <ToastNotification
        open={toast.open}
        message={toast.message}
        status={toast.status}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default ReadingTable;
