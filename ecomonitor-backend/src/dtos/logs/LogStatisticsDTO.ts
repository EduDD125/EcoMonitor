export interface LogStatisticsDTO {
    level: string; // Nível do log (INFO, WARN, ERROR, DEBUG)
    count_per_level: number; // Quantidade de logs por nível
  
    method: string; // Método HTTP (GET, POST, PUT, DELETE, REQUEST)
    count_per_method: number; // Quantidade de logs por método HTTP
  
    httpStatus: number; // Código de status HTTP (200, 404, 500, etc.)
    count_per_status: number; // Quantidade de logs por status HTTP
  
    endpoint: string; // Endpoint da API acessado
    count_per_endpoint: number; // Quantidade de logs por endpoint
  }