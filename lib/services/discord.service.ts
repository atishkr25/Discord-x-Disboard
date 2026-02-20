import axios from 'axios';
import { User } from '@/lib/db/models';

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

      const manageableGuilds = response.data.filter((guild: any) => {
        return (BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20);
      });

      return manageableGuilds;
    } catch (error: any) {
      console.error('Error fetching Discord guilds:', error.response?.data || error.message);
      throw new Error('Failed to fetch guilds from Discord');
    }
  }

  async getGuildDetails(guildId: string, botToken: string) {
    try {
      const response = await axios.get(`https://discord.com/api/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${botToken}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching details for guild ${guildId}:`, error.response?.data || error.message);
      return null;
    }
  }

  async checkBotInGuild(guildId: string): Promise<boolean> {
    if (!process.env.DISCORD_BOT_TOKEN) {
      console.warn('DISCORD_BOT_TOKEN not set, skipping bot check (dev mode)');
      return true;
    }

    try {
      await axios.get(`https://discord.com/api/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      });
      return true;
    } catch (error: any) {
      return false;
    }
  }
}

export const discordService = new DiscordService();
