const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Displays a user's avatar!"),
  async execute(interaction) {
    await interaction.reply({
      embeds: [{
        title: "Avatar",
        description: `Here is <@${interaction.user.id}>'s avatar:`,
        image: {
          url: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
        },
        color: 0xffe668,
        author: {
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL()
        }
      }]
    });
  },
};
