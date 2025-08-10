import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRouter from './routes/api.js';
import eventRoutes from './routes/eventRoutes.js';
import LeaderBoard from './routes/LeaderBoard.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);
app.use('/api/createEvents', eventRoutes);
app.use('/api/LeaderBoard', LeaderBoard);
// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
