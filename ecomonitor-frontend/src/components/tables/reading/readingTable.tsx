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
import { useAppContext } from "src/hooks/useAppContext";

const ReadingTable: React.FC = () => {
  const navigate = useNavigate(); 
  const { data: readings, loading, error, setData } = useFetchTablesData<GetReadingDTO>("/api/leituras");
  const { deleteItem } = useDeleteItem("/api/leituras");
  const { locations, measurementTypes } = useAppContext();

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
  
  useEffect(() => {console.log("carregando tabela...")},[readings]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="entity-table__container" 
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        height: "100%",
      }}>

        
      <TableFilter 
        onUpdateTable={setData} 
        options1={locations} 
        options2={measurementTypes} 
      />


      <TableContainer component={Paper} sx={{ maxHeight: "auto", width: "100%",backgroundColor: "rgba(255,255,255,0.8)" }}>
      <Table stickyHeader aria-label="sticky table" size="small">
          
          <TableHead sx={{ backgroundColor: "#333" }}>
            <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.1)", height: "40px" }}>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff", padding: "8px" }}>
                <Checkbox
                  checked={selectedIds.length === readings.length && readings.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < readings.length}
                  onChange={handleSelectAll}
                />
                <IconButton onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
                  <DeleteIcon color={selectedIds.length > 0 ? "error" : "disabled"} />
                </IconButton>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff", padding: "8px" }}>Localização</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff", padding: "8px" }}>Data/Hora</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff", padding: "8px" }}>Tipo de Medida</TableCell>
              <TableCell sx={{ backgroundColor: "#333", color: "#fff", padding: "8px" }}>Valor</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
            
          
            {readings.map((reading) => (
              <TableRow 
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", height: "40px" }} 
                hover 
                role="checkbox" 
                key={reading.id} 
                onClick={(event) => handleRowClick(event, reading.id)}
              >
                <TableCell sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }} onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.includes(reading.id)}
                    onChange={() => handleSelectItem(reading.id)}
                  />
                </TableCell>
                <TableCell sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}>{reading.location}</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}>{new Date(reading.dateTime).toLocaleString()}</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}>{reading.measurementType}</TableCell>
                <TableCell sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "8px" }}>{reading.value}</TableCell>
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
