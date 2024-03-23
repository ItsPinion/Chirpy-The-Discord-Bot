import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";

async function fetchRandomImage(contentType: string): Promise<string> {
  const fetch = (await import("node-fetch")).default;

  const response = await fetch(`https://nekos.pro/api/${contentType}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const jokeText = await response.json();
  return jokeText.url;
}

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Replies with a random NSFW pic!")
    .setNSFW(true)
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The NSFW category type")
        .addChoices(
          { name: "ai", value: "ai" },
          { name: "ass", value: "ass" },
          { name: "boobs", value: "boobs" },
          { name: "creampie", value: "creampie" },
          { name: "paizuri", value: "paizuri" },
          { name: "pussy", value: "pussy" },
          { name: "random", value: "random" },
          { name: "vtuber", value: "vtuber" },
          { name: "ecchi", value: "ecchi" },
          { name: "fucking", value: "fucking" },
          { name: "irl-ass", value: "irl-ass" },
          { name: "irl-boobs", value: "irl-boobs" },
          { name: "irl-creampie", value: "irl-creampie" },
          { name: "irl-fucking", value: "irl-fucking" },
          { name: "irl-pussy", value: "irl-pussy" },
          { name: "irl-random", value: "irl-random" }
        )
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const category = interaction.options.getString("category");
      const picUrl = await fetchRandomImage(category || "random");

      await interaction.editReply(picUrl);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      await interaction.editReply(
        "Get a brush and clean your filthy brain. 🤢"
      );
    }
  },
};
