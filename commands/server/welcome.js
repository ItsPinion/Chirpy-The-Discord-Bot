const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Welcomes a user to the server!')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user to welcome')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    await interaction.reply(`Welcome <@${user.id}> to ${interaction.guild.name}!`);
  },
};
