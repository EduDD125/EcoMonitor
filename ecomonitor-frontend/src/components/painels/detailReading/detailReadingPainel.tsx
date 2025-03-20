import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useFetchReading } from "../../../hooks/useFetchReading";
import { useSaveReading } from "../../../hooks/useSaveReading";
import ToastNotification from "src/components/toasts/toastNotification";

interface Reading {
    location: string;
    dateTime: string;
    measurementType: string;
    value: string;
  }

export default function DetailReadingPainel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { reading, setReading, loading, error } = useFetchReading(id);
  const { saveReading, loading: saving, error: saveError } = useSaveReading(id);

  function formatDateForInput(date: string) {
    const dt = new Date(date);
    return dt.toISOString().slice(0, 16); // Garante formato "YYYY-MM-DDTHH:MM"
  }

  const [toast, setToast] = useState({
      open: false,
      message: "",
      status: 200,
    });
  
    const handleShowToast = (message: string, status: number) => {
      setToast({ open: true, message, status });
    };
  

  // Atualizar estado dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReading({ ...reading, [e.target.name]: e.target.value });
  };


  const handleSave = async (reading: Reading) => {
    try {
      await saveReading(reading);
      handleShowToast(isEditing ? "Leitura editada com sucesso!" : "Leitura salva com sucesso" , 200);
      setTimeout(() => navigate("/leituras"), 1500); // Redirecionar após sucesso
    } catch (err) {
      handleShowToast(isEditing ? "Error ao editar leitura!" : "Erro ao salvar leitura", 500);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <Paper sx={{ 
      padding: 3, 
      width: "100%",
      borderRadius: "10px",
      boxSizing: "border-box",
      margin: "0px",
      maxWidth: "900px"
      }}
    >
      <Typography variant="h5" gutterBottom>
        {isEditing ? "Editar Leitura" : "Nova Leitura"}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Localização"
            name="location"
            value={reading.location}
            onChange={handleChange}
            fullWidth
          />

          {isEditing && (
            <TextField
              label="Data/Hora"
              name="dateTime"
              type="datetime-local"
              value={formatDateForInput(reading.dateTime)}
              onChange={handleChange}
              fullWidth
            />
          )}

          <TextField
            label="Tipo de Medida"
            name="measurementType"
            value={reading.measurementType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Valor"
            name="value"
            value={reading.value}
            onChange={handleChange}
            fullWidth
          />

          {saveError && <Typography color="error">{saveError}</Typography>}

          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(reading)}
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : isEditing ? "Editar" : "Salvar"}
            </Button>
          </Box>
        </Box>
      )}
      <ToastNotification
              open={toast.open}
              message={toast.message}
              status={toast.status}
              onClose={() => setToast({ ...toast, open: false })}
            />
    </Paper>
  );
}
