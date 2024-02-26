const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

const coin = [
  '<:head:1123998832062119976>',
  '<:tail:1123998825137320068>'
];

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("bitcoinflip")
    .setDescription("Flips a coin!"),
  async execute(interaction) {
    const userId = interaction.user.id;
    await interaction.reply(`Flipping <@${userId}>'s Bitcoin [<a:bitcoin:1124000589815230484>]`);
    const x = Math.floor(Math.random() * coin.length);
    await wait(5000);
    await interaction.editReply(`Flipping <@${userId}>'s Bitcoin [${coin[x]}]`);
    await wait(1000);
    const resultMessage = `<@${userId}>'s Bitcoin landed on **${x === 1 ? "Head " : "Tail "}**[${coin[x]}]`;
    await interaction.editReply(resultMessage);
  },
};
  