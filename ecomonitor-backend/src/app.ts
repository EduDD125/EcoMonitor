import express from 'express';
import readingRouter from './routes/reading/ReadingRoutes';
import logRouter from './routes/log/LogRoutes';
import dotenv from 'dotenv';
import corsMiddleware from './middlewares/cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(readingRouter);
app.use(logRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}.`);
})
