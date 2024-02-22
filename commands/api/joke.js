const { SlashCommandBuilder } = require("discord.js");

async function fetchRandomJoke() {
  const { default: fetch } = await import('node-fetch');

  const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit&format=txt');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const jokeText = await response.text();
  return jokeText;
}


module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Replies with a random joke!"),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const joke = await fetchRandomJoke();
      await interaction.editReply(joke)
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a joke right now.');
    }
  },
};
