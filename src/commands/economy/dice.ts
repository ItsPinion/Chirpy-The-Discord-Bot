import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from 'discord.js';
import { setTimeout } from "node:timers/promises";

const dice = [
 "<:1:1123946030577225880>",
 "<:2:1123946021970522173>",
 "<:3:1123946013888090122>",
 "<:4:1123946005516263464>",
 "<:5:1123945997035393054>",
 "<:6:1123945985727541358>",
];

module.exports = {
 cooldown: 5,
 data: new SlashCommandBuilder()
    .setName("diceroll")
    .setDescription("Rolls a dice with 6 sides!"),
 async execute(interaction: CommandInteraction) {
    const rollMessage = `Rolling <@${interaction.user.id}>'s dice: [<a:dice:1123940385098584114>]`;
    const x = Math.floor(Math.random() * dice.length);
    await interaction.reply(rollMessage);
    await interaction.editReply(rollMessage);
    await setTimeout(5000);
    await interaction.editReply(`Rolling <@${interaction.user.id}>'s dice: [${dice[x]}]`);
    await setTimeout(1000);
    await interaction.editReply(`<@${interaction.user.id}>'s dice landed on a **${x + 1}** [${dice[x]}]`);
 },
};

 
