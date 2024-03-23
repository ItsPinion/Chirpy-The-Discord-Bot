import {
  SlashCommandBuilder,
  GuildChannel,
  PermissionsBitField,
  GuildChannelType,
  Channel,
  PermissionFlagsBits,
  ChannelType,
} from "discord.js";
import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { executeChannel } from "./action/channel";
import { executeRole } from "./action/role";
import { executeDelete } from "./action/delete";

module.exports = {
  cooldown: 15,
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Manage welcome channel and role!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
      subcommand
        .setName("role")
        .setDescription("Set or update the role dedicated for new members.")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role dedicated for new members.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Delete the welcome channel or role.")
        .addStringOption((option) =>
          option
            .setName("option")
            .setDescription("Delete welcome (channel or role).")
            .setRequired(true)
            .addChoices(
              { name: "Channel", value: "channel" },
              { name: "Role", value: "role" },
              { name: "Both", value: "both" }
            )
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "channel":
        const channel = interaction.options.getChannel("channel");
        if (!channel) {
          await interaction.editReply(
            "Channel not provided or could not be retrieved."
          );
          return;
        }

        if (
          !interaction.guild?.members.me
            ?.permissionsIn(channel.id)
            .has("SendMessages") ||
          !interaction.guild?.members.me
            ?.permissionsIn(channel.id)
            .has("ViewChannel")
        ) {
          await interaction.editReply(
            `I do not have permission to send messages to <#${channel.id}>\n` +
              "```elm\nPermission Required: ['SEND_MESSAGES', 'VIEW_CHANNEL']\n```"
          );
          return;
        }

        await executeChannel(interaction);
        break;
      case "role":
        await executeRole(interaction);
        break;

      case "remove":
        await executeDelete(interaction);

        break;

      default:
        await interaction.editReply(
          "Unknown subcommand. Please use `/welcome channel` or `/welcome role`."
        );
    }
  },
};
