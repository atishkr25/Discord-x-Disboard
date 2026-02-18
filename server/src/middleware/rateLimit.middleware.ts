import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';

export const bumpLimiter = rateLimit({
    windowMs: 2 * 60 * 60 * 1000, // 2 hours
    limit: 1, // Limit each IP to 1 bump per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'You can only bump this server once every 2 hours.' }
});

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per 15 mins
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
