import axios from 'axios';
import User from '../models/User';

export class DiscordService {
    async getUserGuilds(userId: string) {
        const user = await User.findById(userId).select('+accessToken');
        if (!user || !user.accessToken) {
            throw new Error('User not found or no access token');
        }

        try {
            const response = await axios.get('https://discord.com/api/users/@me/guilds', {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching Discord guilds:', error.response?.data || error.message);
            throw new Error('Failed to fetch guilds from Discord');
        }
    }
    async checkBotInGuild(guildId: string): Promise<boolean> {
        if (!process.env.DISCORD_TOKEN) {
            console.warn('DISCORD_TOKEN not set, skipping bot check (dev mode)');
            return true;
        }

        try {
            await axios.get(`https://discord.com/api/guilds/${guildId}`, {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            });
            return true;
        } catch (error: any) {
            // 403 or 404 means bot is likely not in guild or no permission
            return false;
        }
    }
}

export const discordService = new DiscordService();
