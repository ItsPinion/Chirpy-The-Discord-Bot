import { SlashCommandBuilder, ChannelType } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import { executeStart } from "./action/start";
import { executeChannel } from "./action/channel";

module.exports = {
  cooldown: 15,
  data: new SlashCommandBuilder()
    .setName("story")
    .setDescription("Create an story with the help of everyone!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("channel")
        .setDescription(
          "Set or update the channel dedicated for welcoming members."
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel dedicated for welcoming members.")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("start").setDescription("Start a new story!")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "channel":
        await executeChannel(interaction);
        break;

      case "start":
        await executeStart(interaction);
        break;

      default:
        await interaction.reply(
          "Unknown subcommand. Please use `/welcome channel` or `/welcome role`."
        );
    }
  },
};
