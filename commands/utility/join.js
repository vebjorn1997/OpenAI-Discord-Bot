const { SlashCommandBuilder } = require('discord.js');
const { connect } = require('../../functions/connect');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join the voice channel'),
    async execute(interaction) {
        await connect(interaction);
    },
}