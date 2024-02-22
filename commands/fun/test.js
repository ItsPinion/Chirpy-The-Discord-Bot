const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 name: 'input',
 description: 'Asks for user input and responds with it',
 data: new SlashCommandBuilder()
     .setName('input')
     .setDescription('Asks for user input and responds with it'),
 async execute(interaction) {
   const row = new MessageActionRow()
     .addComponents(
       new MessageButton()
         .setCustomId('input')
         .setLabel('Click to input')
         .setStyle('PRIMARY'),
     );

   await interaction.reply({ content: 'Please click the button to input your text.', components: [row] });

   const filter = i => i.user.id === interaction.user.id;
   const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

   collector.on('collect', async i => {
     if (i.customId === 'input') {
       await i.reply('Please send your input as a message.');

       const collected = await interaction.channel.awaitMessages({ filter: m => m.author.id === interaction.user.id, max: 1, time: 60000, errors: ['time'] });

       const input = collected.first().content;
       await i.followUp(`You entered: ${input}`);
     }
   });

   collector.on('end', collected => {
     console.log(`Collected ${collected.size} items`);
   });
 },
};
