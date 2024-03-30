import { SlashCommandBuilder, PermissionsBitField } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import { executeChannel } from "./action/channel";
import { executeCreate } from "./action/create";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("confession")
    .setDescription("Manage confessions and confession channels")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("channel")
        .setDescription(
          "Set or update the channel dedicated for confession broadcast."
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel dedicated for confession broadcast.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Submit an anonymous confession.")
        .addStringOption((option) =>
          option
            .setName("confession")
            .setDescription("Your confession.")
            .setRequired(true)
        )
        .addUserOption((option) =>
          option
            .setName("for")
            .setDescription(
              "This user will be mentioned while broadcasting this confession."
            )
            .setRequired(false)
        )
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "channel":
        const channel = interaction.options.getChannel("channel");

        if (!channel) {
          await interaction.editReply({
            content: "Channel not provided or could not be retrieved.",
          });
          return;
        }

        if (
          !interaction.guild?.members.me
            ?.permissionsIn(channel.id)
            .has(PermissionsBitField.Flags.SendMessages) ||
          !interaction.guild?.members.me
            ?.permissionsIn(channel.id)
            .has(PermissionsBitField.Flags.ViewChannel)
        ) {
          await interaction.editReply({
            content:
              `I do not have permission to send messages to <#${channel.id}>\n` +
              "```elm\nPermission Required: ['SEND_MESSAGES', 'VIEW_CHANNEL']\n```",
          });
          return;
        }

        const permission = interaction.member
          ?.permissions as Readonly<PermissionsBitField>;

        if (permission.has("Administrator")) {
          await executeChannel(interaction);
        } else {
          await interaction.editReply({
            content: "You do not have permission to use this command.",
          });
        }
        break;
      case "create":
        await executeCreate(interaction);
        break;
      default:
        await interaction.editReply({
          content:
            "Unknown subcommand. Please use `/confession channel` or `/confession create`.",
        });
    }
  },
};
