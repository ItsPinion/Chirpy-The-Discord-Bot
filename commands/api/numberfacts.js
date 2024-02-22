const { SlashCommandBuilder } = require("discord.js");

// Function to fetch a random joke and return it as a promise
async function fetchRandomNumberFact() {
  const { default: fetch } = await import('node-fetch'); // Destructure the default export

  const response = await fetch('http://numbersapi.com/random');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const factText = await response.text(); // Use .text() instead of .json() for plain text
  return factText;
}


module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("numberfects")
    .setDescription("Replies with a random Number fact!"),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const joke = await fetchRandomNumberFact();
      await interaction.editReply(joke);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a fact right now.');
    }
  },
};
