import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import Server from '../models/Server';

export default {
    data: new SlashCommandBuilder()
        .setName('bump')
        .setDescription('Bump this server to the top of the list!'),
    async execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.guildId) {
            return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        }

        try {
            const server = await Server.findOne({ guildId: interaction.guildId });

            if (!server) {
                return interaction.reply({ content: 'This server is not registered on Disboard Lite. Please register it on the dashboard first!', ephemeral: true });
            }

            const now = new Date();
            const lastBump = new Date(server.bumpAt);
            const diff = now.getTime() - lastBump.getTime();
            const twoHours = 2 * 60 * 60 * 1000;

            if (diff < twoHours) {
                const remaining = twoHours - diff;
                const minutes = Math.ceil(remaining / (60 * 1000));
                return interaction.reply({ content: `Please wait ${minutes} minutes before bumping again.`, ephemeral: true });
            }

            server.bumpAt = now;
            await server.save();

            return interaction.reply({ content: `**${server.name}** has been bumped! Check it out on Disboard Lite.`, ephemeral: false });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while bumping the server.', ephemeral: true });
        }
    },
};
