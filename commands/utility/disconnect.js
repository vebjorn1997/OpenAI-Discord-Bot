const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect from the voice channel'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        connection.destroy();
        await interaction.reply('Disconnected from the voice channel');
    },
}