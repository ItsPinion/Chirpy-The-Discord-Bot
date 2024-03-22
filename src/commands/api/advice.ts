import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction } from 'discord.js';

async function fetchRandomAdvice(): Promise<string> {
 const fetch = (await import('node-fetch')).default;

 const response = await fetch('https://api.adviceslip.com/advice');
 if (!response.ok) {
    throw new Error('Network response was not ok');
 }
 const advice = await response.json();
 return advice.slip.advice;
}
module.exports = {
 cooldown: 5,
 data: new SlashCommandBuilder()
    .setName("advice")
    .setDescription("Replies with a random advice!"),
 async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    try {
      const advice = await fetchRandomAdvice();
      await interaction.editReply(advice);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a advice right now.');
    }
 },
};
