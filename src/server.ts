import express from 'express';
import path from 'path';
import measurementRoutes from './routes/measurementRoutes';
import { connectDB } from './database';

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); 

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rotas da API
app.use('/api/measurements', measurementRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
