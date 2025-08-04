const fs = require('fs');
const wav = require('wav');
const prism = require('prism-media');
const config = require('../config.json');
const { transcrib_text } = require('./openAI/transcrib_text');
const { generate_text_response } = require('./openAI/generate_text_response');
const { generate_audio_response_openAI } = require('./openAI/OpenAI_TTS');
const { save_audio_file } = require('./save_audio_file');
const { play_audio } = require('./play_audio');
const { save_character_prompt } = require('./save_character_prompt');
const { connect } = require('./connect');

const talk_start = (connection, interaction, userId, duration = 1000) => {
	const opusStream = connection.receiver.subscribe(userId, {
        end: {
          behavior: 'silence',
          duration: duration
        }
      });

      const pcmStream = new prism.opus.Decoder({ 
        frameSize: 960,
        channels: 2,
        rate: 48000,
      });

      const wavPath = `./recordings/${interaction.client.users.cache.get(userId).username}.wav`;
      
      // Create WAV writer
      const wavWriter = new wav.Writer({
        sampleRate: 48000,
        channels: 2,
        bitDepth: 16
      });

      const out = fs.createWriteStream(wavPath);
      wavWriter.pipe(out);

      opusStream.pipe(pcmStream).pipe(wavWriter);
}

const talk_end = async (interaction, userId, character_prompt, name, OpenAI_audio_name) => {
	const channel = await interaction.client.channels.fetch(config.general_text_channel);
	console.log(`Recording Finished`);
	console.log(`Sending to OpenAI`);

	// TRANSCRIPTION
	// Send the recording to OpenAI for transcription
	const transcription = await transcrib_text(interaction.client.users.cache.get(userId).username);

	console.log("Transcription: ", transcription);
	await channel.send(`${interaction.client.users.cache.get(userId).username}: ${transcription.text}`);

	// RESPONSE
	// Send the transcription to the OpenAI API to generate a response
	const response = await generate_text_response(character_prompt, transcription.text);

	// Store the frank_response_id in the frank.js file, to keep a history of the conversation
	await save_character_prompt(character_prompt, name, response.id);

	console.log("OpenAI Response: ", response);
	await channel.send(`${character_prompt.name}: ${response.output_text}`);

	// GENERATE AUDIO RESPONSE
	console.log("Generating audio response");
	// const audio = await generate_audio_response(response.output_text, "wo6udizrrtpIxWGp2qJk");
	const audio = await generate_audio_response_openAI(response.output_text, OpenAI_audio_name, character_prompt.audio_instructions);

	// Save the audio to a file
	console.log("Saving audio file");
	const audioPath = await save_audio_file(audio, `response_${character_prompt.name}`);

	// Play the audio
	console.log("Playing audio");
	await play_audio(interaction, audioPath);
}

const talk = async (interaction, userId, character_prompt, name, OpenAI_audio_name) => {
	const connection = await connect(interaction);
	let message_recorded = false;
	let can_talk = false;

	connection.receiver.speaking.on('start', (userId) => {
		if (!message_recorded) {
			talk_start(connection, interaction, userId);
			can_talk = true;
		}
		message_recorded = true;
	});

	// When the user stops speaking, save the recording and send it to OpenAI
	connection.receiver.speaking.on('end', async (userId) => {
		if (can_talk) {
			talk_end(interaction, userId, character_prompt, name, OpenAI_audio_name);
			can_talk = false;
		}
	});
}

module.exports = {
	talk
}