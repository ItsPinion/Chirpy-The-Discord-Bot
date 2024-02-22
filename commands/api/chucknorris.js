const { SlashCommandBuilder } = require("discord.js");

// Function to fetch a random joke and return it as a promise
async function fetchRandomJoke() {
  const { default: fetch } = await import('node-fetch'); // Destructure the default export

  const response = await fetch('https://api.chucknorris.io/jokes/random');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const jokeData = await response.json();
  return jokeData.value;
}

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("chucknorris")
    .setDescription("Replies with a random Chuck Norris joke!"),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const joke = await fetchRandomJoke();
      await interaction.editReply(joke);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a joke right now.');
    }
  },
};
