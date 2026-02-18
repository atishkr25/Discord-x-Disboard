import { Request, Response } from 'express';
import { serverService } from '../services/server.service';
import { discordService } from '../services/discord.service';
import { createServerSchema, updateServerSchema } from '../utils/validation';

// Create a new server
export const createServer = async (req: Request, res: Response) => {
    try {
        // Validate input
        const validation = createServerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
        }

        const { guildId, name, description, category, tags, inviteLink, icon, banner, memberCount, onlineCount } = req.body;
        const ownerId = (req as any).user.id;

        // Check if server already exists
        const existing = await serverService.findAll({ guildId });
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Server already registered' });
        }

        // Verify Bot is in the Guild
        const isBotInGuild = await discordService.checkBotInGuild(guildId);
        if (!isBotInGuild) {
            return res.status(400).json({ message: 'Bot must be added to the server before registration' });
        }

        const savedServer = await serverService.create({
            guildId,
            name,
            description,
            category,
            // tags are handled by validation transformation or need manual split if string
            tags: typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags,
            inviteLink,
            icon,
            banner,
            ownerId,
            memberCount: memberCount || 0,
            onlineCount: onlineCount || 0,
            status: 'pending',
            bumpAt: new Date(0) // Initialize to past
        } as any);

        res.status(201).json(savedServer);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating server', error: error.message });
    }
};

// Get all approved servers (with optional filtering)
export const getServers = async (req: Request, res: Response) => {
    try {
        const { category, search, tag } = req.query;
        let query: any = { status: 'approved' };

        if (category) query.category = category as string;
        if (tag) query.tags = tag as string;
        if (search) {
            query.$text = { $search: search as string };
        }

        const servers = await serverService.findAll(query);
        res.status(200).json(servers);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching servers', error: error.message });
    }
};

export const getTrendingServers = async (req: Request, res: Response) => {
    try {
        const servers = await serverService.getTrending();
        res.status(200).json(servers);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching trending servers', error: error.message });
    }
};

export const getRecentServers = async (req: Request, res: Response) => {
    try {
        const servers = await serverService.getRecent();
        res.status(200).json(servers);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching recent servers', error: error.message });
    }
};

// Get single server by ID
export const getServerById = async (req: Request, res: Response) => {
    try {
        const server = await serverService.findById(req.params.id as string);
        if (!server) return res.status(404).json({ message: 'Server not found' });
        res.status(200).json(server);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching server', error: error.message });
    }
};

// Get servers owned by current user
export const getMyServers = async (req: Request, res: Response) => {
    try {
        const ownerId = (req as any).user.id;
        const servers = await serverService.findByOwner(ownerId);
        res.status(200).json(servers);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching my servers', error: error.message });
    }
};

// Update a server
export const updateServer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;

        const server = await serverService.findById(id as string);
        if (!server) return res.status(404).json({ message: 'Server not found' });

        if (server.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this server' });
        }

        // Validate input
        const validation = updateServerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ message: 'Validation Error', errors: validation.error.format() });
        }

        const updatedServer = await serverService.update(id as string, req.body);
        res.status(200).json(updatedServer);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating server', error: error.message });
    }
};

// Delete a server
export const deleteServer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;

        const server = await serverService.findById(id as string);
        if (!server) return res.status(404).json({ message: 'Server not found' });

        if (server.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You do not own this server' });
        }

        await serverService.delete(id as string);
        res.status(200).json({ message: 'Server deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting server', error: error.message });
    }
};
