import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3000", "https://seu-dominio.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
