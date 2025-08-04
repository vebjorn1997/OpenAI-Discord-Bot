const { OpenAI } = require('openai');
const config = require('../../config.json');

const generate_text_response = async (character_file, text) => {
    const openai = new OpenAI({
        apiKey: config.openai_api_key,
    });

    const response = await openai.responses.create({
        model: "gpt-4o-mini",
        store: true,
        previous_response_id: character_file.previous_response_id,
        input: [
          { role: "developer", content: character_file.instructions },
          { role: "user", content: text }
        ]
    });

    return response;
}

module.exports = {
    generate_text_response
}