import { z } from 'zod';

export const createServerSchema = z.object({
    guildId: z.string().min(1, 'Guild ID is required'),
    name: z.string().min(3, 'Server name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    inviteLink: z.string().url('Invalid invite link'),
    icon: z.string().optional(),
    banner: z.string().optional(),
    memberCount: z.number().optional(),
    onlineCount: z.number().optional()
});

export const updateServerSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    category: z.string().optional(),
    tags: z.string().optional(),
    inviteLink: z.string().url().optional(),
    ip: z.string().optional(),
});
