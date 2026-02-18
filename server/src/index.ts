import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport';
import authRoutes from './routes/auth.routes';
import serverRoutes from './routes/server.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true // Allow cookies from frontend
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize()); // Initialize passport

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/disboard-lite';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/servers', serverRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Disboard Lite API is running');
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
