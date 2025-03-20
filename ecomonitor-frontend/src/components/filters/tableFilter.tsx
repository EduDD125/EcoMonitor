import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  Button,
} from "@mui/material";
import { useFetchFilteredReadings } from "../../hooks/useFetchFilterReadings";

interface TableFilterProps {
  onUpdateTable: (data: any[]) => void;
  options1: string[];
  options2: string[];
}

const TableFilter: React.FC<TableFilterProps> = ({ onUpdateTable, options1, options2 }) => {
  const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
  const [selectedOptions2, setSelectedOptions2] = useState<string[]>([]);
  
  const { fetchFilteredData } = useFetchFilteredReadings();

  const handleSelectAll1 = () => {
    setSelectedOptions1(selectedOptions1.length === options1.length ? [] :  [...options1]);
  };

  const handleSelectChange1 = (event: any) => {
    setSelectedOptions1(event.target.value);
  };

  const handleSelectAll2 = () => {
    setSelectedOptions2(selectedOptions2.length === options2.length ? [] :  [...options2]);
  };

  const handleSelectChange2 = (event: any) => {
    setSelectedOptions2(event.target.value);
  };

  const handleSearch = async () => {
    const filters: { locations?: string[], measurementTypes?: string[] } = {};

  if (selectedOptions1.length > 0) {
    filters.locations = selectedOptions1;
  }
  
  if (selectedOptions2.length > 0) {
    filters.measurementTypes = selectedOptions2;
  }

    const filteredData = await fetchFilteredData(filters);
    //onUpdateTable(filteredData as any[]); // Atualiza a tabela com os novos dados
  };

  useEffect(() => {
    console.log("novos valores");
    console.log("selectedOptions1:",selectedOptions1);
    console.log("selectedOptions2:",selectedOptions2);
  },[selectedOptions1,selectedOptions2])

  return (
    <Box 
      display="flex" 
      flexDirection="row" 
      alignItems="center" 
      gap={2} 
      padding={2} 
      borderRadius={2} 
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      
      <FormControl>
        <InputLabel>Localizações</InputLabel>
        <Select
          multiple
          value={selectedOptions1}
          onChange={handleSelectChange1}
          renderValue={(selected) => selected.join(", ")}
        >
          {options1.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions1.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl>
        <InputLabel>Tipos de Medida</InputLabel>
        <Select
          multiple
          value={selectedOptions2}
          onChange={handleSelectChange2}
          renderValue={(selected) => selected.join(", ")}
        >
          {options2.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions2.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Pesquisar
      </Button>
    </Box>
  );
};

export default TableFilter;
