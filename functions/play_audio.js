const { getVoiceConnection, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const config = require('../config.json');

const play_audio = async (interaction, audio_path) => {
    const channel = await interaction.client.channels.fetch(config.general_text_channel);
    const connection = await getVoiceConnection(interaction.guild.id);
    const player = createAudioPlayer()
    const resource = createAudioResource(audio_path)

    player.play(resource)
    connection.subscribe(player)

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
    
    player.on('error', error => {
        console.error('Error:', error);
    });

    await channel.send('Playing audio');
}

module.exports = {
    play_audio
}