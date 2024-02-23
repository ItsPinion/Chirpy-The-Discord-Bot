const { readUserbyID } = require("../../api/get");
const { createUser } = require("../../api/post");
const { SlashCommandBuilder } = require("discord.js");

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
  async execute(interaction) {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user") || interaction.user;

    let Info;
    let balance = 0;

    try {
      Info = await readUserbyID(targetUser.id);

      !Info ? createUser(targetUser.id) : (balance = Info[0].balance);

      
    } catch (error) {
      console.log(error);
    }

    await interaction.editReply(
      `<@${targetUser.id}> have ${balance}<:one_taka:1210564051915116634> in their bank account.`
    );
  },
};
