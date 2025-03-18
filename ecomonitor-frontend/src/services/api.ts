import axios from "axios";

// Criando uma instância do Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5433", // Defina a URL da API no .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição (antes de enviar a requisição)
api.interceptors.request.use(
  (config) => {
    console.log(`🔵 [REQUEST] ${config.method?.toUpperCase()} ${config.url}`);

    /* Se houver um token salvo, adicioná-lo ao cabeçalho
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } */

    return config;
  },
  (error) => {
    console.error("❌ [REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta (depois de receber a resposta)
api.interceptors.response.use(
  (response) => {
    console.log(`🟢 [RESPONSE] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("🔴 [RESPONSE ERROR]", error.response?.status, error.response?.data);

    // Se a resposta indicar não autorizado, redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default api;
