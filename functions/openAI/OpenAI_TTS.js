const { OpenAI } = require('openai');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');

const generate_audio_response_openAI = async (text, voice, instructions) => {
    const openai = new OpenAI({
        apiKey: config.openai_api_key,
    });

    const audio = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: voice,
        input: text, 
        instructions: instructions,
        response_format: "wav"
    });

    return audio;
}

module.exports = {
    generate_audio_response_openAI
}