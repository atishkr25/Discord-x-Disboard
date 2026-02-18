import express from 'express';
import { createServer, getServers, getServerById, getMyServers, updateServer, deleteServer, getTrendingServers, getRecentServers } from '../controllers/server.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimit.middleware';

const router = express.Router();

// Public Routes
router.get('/', apiLimiter, getServers);
router.get('/trending', apiLimiter, getTrendingServers);
router.get('/recent', apiLimiter, getRecentServers);
router.get('/:id', apiLimiter, getServerById);

// Protected Routes
router.post('/', verifyToken, createServer);
router.put('/:id', verifyToken, updateServer);
router.delete('/:id', verifyToken, deleteServer);
router.get('/me/all', verifyToken, getMyServers);

export default router;
