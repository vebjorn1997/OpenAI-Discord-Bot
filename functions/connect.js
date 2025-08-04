const { joinVoiceChannel } = require('@discordjs/voice');
const config = require('../config.json');

const connect = async (interaction) => {
    const connection = joinVoiceChannel({
        channelId: config.general_voice_channel,
        guildId: config.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false
    })
    const channel = await interaction.client.channels.fetch(config.general_text_channel);
    await channel.send('Joined the voice channel');
    return connection;
}

module.exports = {
    connect
}