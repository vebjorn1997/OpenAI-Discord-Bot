const fs = require('fs');
const path = require('path');

const save_character_prompt = async (character_prompt, filename, response_id) => {
    const character_prompt_path = path.join(__dirname, `../prompts/characters/${filename}.js`);
    
    const updated_character_prompt = `const character_prompt = {
        name: "${character_prompt.name}",
        previous_response_id: ${response_id ? `"${response_id}"` : 'null'},
        instructions: \`${character_prompt.instructions}\`,
        audio_instructions: \`${character_prompt.audio_instructions}\`
    }

    module.exports = character_prompt;`;
    
    fs.writeFileSync(character_prompt_path, updated_character_prompt);
}

module.exports = {
    save_character_prompt
}