import express from 'express';
import cors from 'cors';
import router from './routes/recipes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = [
  'http://localhost:5173',
  'https://rhuynh06.github.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());
app.get('/', (_, res) => res.send('Working'));
app.use('/api/recipes', router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));