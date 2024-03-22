import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

async function fetchRandomDarkJoke(): Promise<string> {
 const fetch = (await import('node-fetch')).default;

 const response = await fetch('https://v2.jokeapi.dev/joke/Dark?format=txt');
 if (!response.ok) {
    throw new Error('Network response was not ok');
 }
 const jokeText = await response.text();
 return jokeText;
}

module.exports = {
 cooldown: 5,
 data: new SlashCommandBuilder()
    .setName("darkjoke")
    .setDescription("Replies with a random dark joke!"),
 async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    try {
      const joke = await fetchRandomDarkJoke();
      await interaction.editReply(joke);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a joke right now.');
    }
 },
};
