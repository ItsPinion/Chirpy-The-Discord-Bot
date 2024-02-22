const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 15,
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Provides information about the server!'),
	async execute(interaction) {
     const guild = interaction.guild;
		await interaction.reply({
      embeds: [{
        title: 'Server Information:',
        description: ``,
        fields: [
          { name: 'Guild Name:', value: `${guild.name}`},
          { name: 'Guild ID:', value: `${guild.id}`},
          { name: 'Member Count:', value: `${guild.memberCount}`},
          { name: 'Bot Count:', value: `${guild.members.cache.filter((member) => member.user.bot).size}`},
          { name: 'Created At:', value: `${guild.createdAt.toString()}`},
          { name: 'Channels:', value: `${guild.channels.cache.size}`},
          { name: 'Roles:', value: `${guild.roles.cache.size}`},
          { name: 'Emojis:', value: `${guild.emojis.cache.size}`},
          { name: 'Verification Level:', value: `${guild.verificationLevel}`},
          { name: 'Default Message Notifications:', value: `${guild.defaultMessageNotifications}`},
          { name: 'MFA Level:', value: `${guild.mfaLevel}`},
          { name: 'Premium Subscription Count:', value: `${guild.premiumSubscriptionCount}`},
          { name: 'Premium Tier:', value: `${guild.premiumTier}`},
          { name: 'Is Large:', value: `${guild.large}`},
          { name: 'Is Available:', value: `${guild.available}`},
          { name: 'Features:', value: `${guild.features.join(', ')}`},
          { name: 'Embed Channel ID:', value: `${guild.embedChannelID}`},
          { name: 'Members:', value: `${guild.members.cache.size}`},
          { name: 'Voice States:', value: `${guild.voiceStates.cache.size}`},
          { name: 'Preferred Locale:', value: `${guild.preferredLocale}`},
          { name: 'Maximum Members:', value: `${guild.maximumMembers}`},
          { name: 'Verified:', value: `${guild.verified}`},
        ],
        color: 0xffe668,
        author: {
          name: guild.name  ,
          iconURL: guild.iconURL({ dynamic: true, size: 1024 }),
        },
        thumbnail: {
          url: guild.iconURL({ dynamic: true, size: 1024 }),
        }
      }]
    });
	},
};