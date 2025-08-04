const fs = require('fs');
const path = require('path');

const recordings_path = path.join(__dirname, '../recordings');

const save_audio_file = async (audio, filename) => {
    // Might need this for use with elevenlabs instead of openAI. Ran out of credits to test. 
    // const chunks = [];
    // const reader = audio.getReader();
    // while (true) {
    //     const { done, value } = await reader.read();
    //     if (done) break;
    //     chunks.push(value);
    // }
    // const audioBuffer = Buffer.concat(chunks);
    // const audioPath = `${recordings_path}/${filename}.wav`;
    // fs.writeFileSync(audioPath, audioBuffer);


    const buffer = Buffer.from(await audio.arrayBuffer());
    const audioPath = `${recordings_path}/${filename}.wav`;
    fs.writeFileSync(audioPath, buffer);

    return audioPath;
}

module.exports = {
    save_audio_file
}