import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 1. Redirect to Discord
router.get('/discord', passport.authenticate('discord'));

// 2. Callback from Discord
router.get(
    '/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/login/failed',
        session: false,
    }),
    (req, res) => {
        // Successful authentication
        const user: any = req.user;

        // Create JWT Token
        const token = jwt.sign(
            { id: user._id, discordId: user.discordId, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Redirect to frontend dashboard
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

// 3. Get Current User (Protected)
import { verifyToken } from '../middleware/auth.middleware';
import { discordService } from '../services/discord.service';

router.get('/me', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

router.get('/me/guilds', verifyToken, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const guilds = await discordService.getUserGuilds(userId);
        res.json(guilds);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

export default router;
