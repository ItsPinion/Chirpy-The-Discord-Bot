import { getUserInfoByID } from "../../api/get";
import { createUser } from "../../api/post";
import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from 'discord.js';

const message = "```\nI am under maintenance 🚧\n```";
module.exports = {
 cooldown: 5,
 data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Provides information about a user's balance!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to retrieve information about")
        .setRequired(false)
    ),
 async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user") || interaction.user;

    let Info: any;
    let balance = 0;

    try {
      Info = await getUserInfoByID(targetUser.id);

      if (!Info) {
        await createUser(targetUser.id);
      } else {
        balance = Info[0].balance;
      }
    } catch (error) {
      console.error(error);
    }

    await interaction.editReply(
      `<@${targetUser.id}> have ${balance}<:one_taka:1210564051915116634> in their bank account.`
    );
 },
};
