const { SlashCommandBuilder } = require('discord.js');

const character_prompt = require('../../prompts/characters/skippy');
const { talk } = require('../../functions/talk');

const name = "skippy";
const OpenAI_audio_name = "onyx";

module.exports = {
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Talk with Skippy'),
    async execute(interaction) {
        await interaction.reply('Recording a message');
        talk(interaction, interaction.user.id, character_prompt, name, OpenAI_audio_name);
    },
}