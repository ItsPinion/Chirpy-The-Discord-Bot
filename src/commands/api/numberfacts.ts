import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";

async function fetchRandomNumberFact(): Promise<string> {
  const fetch = (await import("node-fetch")).default;

  const response = await fetch("http://numbersapi.com/random");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const factText = await response.text();
  return factText;
}

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("numberfects")
    .setDescription("Replies with a random Number fact!"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const fact = await fetchRandomNumberFact();
      await interaction.editReply(fact);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      await interaction.editReply("Sorry, I couldn't fetch a fact right now.");
    }
  },
};
