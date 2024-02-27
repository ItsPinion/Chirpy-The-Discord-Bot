const { SlashCommandBuilder } = require("discord.js");
const { executeChannel } = require("./action/channel");
const { executeCreate } = require("./action/create");

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
            .setName("user")
            .setDescription(
              "This user will be mentioned while broadcasting this confession."
            )
            .setRequired(false)
        )
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "channel":
        // Fetch the channel from the interaction options
        const channel = interaction.options.getChannel("channel");

        // Check if the bot has permission to send messages and view the channel
        if (
          !channel
            .permissionsFor(interaction.client.user)
            .has(["SendMessages", "ViewChannel"])
        ) {
          await interaction.editReply({
            content:
              `I do not have permission to send messages to <#${channel.id}>\n` +
              "```elm\nPermission Required: ['SendMessages', 'ViewChannel']\n```",
            ephemeral: true,
          });
          return;
        }

        if (interaction.member.permissions.has("Administrator")) {
          await executeChannel(interaction);
        } else {
          await interaction.editReply({
            content: "You do not have permission to use this command.",
            ephemeral: true,
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
          ephemeral: true,
        });
    }
  },
};
