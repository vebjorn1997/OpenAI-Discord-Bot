const { OpenAI } = require('openai');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');

// Path to the recordings folder
const recordings_path = path.join(__dirname, '../../recordings');

const transcrib_text = async (filename) => {
    const openai = new OpenAI({
        apiKey: config.openai_api_key,
    });

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(`${recordings_path}/${filename}.wav`),
        model: "gpt-4o-mini-transcribe",
        language: "en"
      });

    return transcription;
}

module.exports = {
    transcrib_text
}