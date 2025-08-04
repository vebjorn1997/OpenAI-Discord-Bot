const { SlashCommandBuilder } = require('discord.js');

const character_prompt = require('../../prompts/characters/tyrone');
const { talk } = require('../../functions/talk');

const name = "tyrone";
const OpenAI_audio_name = "onyx";

module.exports = {
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Talk with Tyrone'),
    async execute(interaction) {
        await interaction.reply('Recording a message');
        talk(interaction, interaction.user.id, character_prompt, name, OpenAI_audio_name);
    },
}