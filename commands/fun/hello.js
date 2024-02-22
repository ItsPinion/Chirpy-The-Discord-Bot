const { SlashCommandBuilder } = require("discord.js");

// Function to fetch a random joke and return it as a promise
async function fetchRandomJoke() {
  const fetch = await import('node-fetch'); // Use dynamic import to load the ESM module

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
    .setName("hello")
    .setDescription("Replies with a random joke!"),
  async execute(interaction) {
    await interaction.deferReply(); // Defer the reply without sending a message

    try {
      const joke = await fetchRandomJoke(); // Use await to get the joke
      await interaction.editReply(joke); // Send the joke as a reply
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a joke right now.');
    }
  },
};
