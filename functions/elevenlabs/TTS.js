const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
const config = require('../../config.json');

const generate_audio_response = async (text, voice_id) => {
    const elevenlabs = new ElevenLabsClient({
        apiKey: config.elevenlabs_api_key,
    });

    const audio = await elevenlabs.textToSpeech.convert(voice_id,{
        text: text,
        modelId: "eleven_multilingual_v2"
    });

    return audio;
}

module.exports = {
    generate_audio_response
}