const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Provides information about a user!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to retrieve information about')
        .setRequired(false)),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(targetUser.id);
    const roles = member.roles.cache
      .filter(role => role.name !== '@everyone')
      .map(role => `<@&${role.id}>`);

    await interaction.reply({
      embeds: [{
        title: 'User Information',
        description: `Basic information about: <@${targetUser.id}>`,
        fields: [
          { name: 'Username:', value: targetUser.username },
          { name: 'User ID:', value: targetUser.id },
          { name: 'User Tag:', value: targetUser.tag },
          { name: 'Discriminator:', value: targetUser.discriminator },
          { name: 'Mention:', value: targetUser.toString() },
          { name: 'Account Creation Date:', value: targetUser.createdAt.toDateString() },
          { name: 'Is Bot Account:', value: targetUser.bot },
          { name: 'Client Status:', value: 'Online' },
          { name: 'Is System Account:', value: targetUser.system },
          { name: 'Partial User:', value: targetUser.partial },
          { name: 'Joined At:', value: member.joinedAt.toDateString() },
          { name: 'Roles:', value: roles.length ? roles.join(' ') : 'None' }
        ],
        color: 0xffe668,
        author: {
          name: targetUser.username,
          iconURL: targetUser.displayAvatarURL({ dynamic: true, size: 1024 }),
        },
        thumbnail: {
          url: targetUser.displayAvatarURL({ dynamic: true, size: 1024 }),
        }
      }]
    });
  },
};
