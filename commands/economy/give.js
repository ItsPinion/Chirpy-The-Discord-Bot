const { getUserInfoByID } = require("../../api/get");
const { createUser } = require("../../api/post");
const { SlashCommandBuilder } = require("discord.js");
const { updateBalance } = require("../../api/update");
const balance = require("./balance");

let message = "```\nI am under maintenance 🚧\n```";
let feeMessage = "```\nThere is a 10% remittance fee. 💸\n```";
module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("bkash")
    .setDescription("Send money to other users! [10% fee]")
    .addUserOption((option) =>
      option.setName("user").setDescription("The receiver").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Transfer amount")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const receiverID = interaction.options.getUser("user").id;
    const userID = interaction.user.id;
    const amount = +interaction.options.getNumber("amount");
    let userInfo;
    let receiverInfo;

    let userBalance = 0;
    let receiverBalance = 0;

    try {
      userInfo = await getUserInfoByID(userID);
      receiverInfo = await getUserInfoByID(receiverID);

      console.log(userID, receiverID, userInfo, receiverInfo);

      !userInfo[0] ? createUser(userID) : (userBalance = userInfo[0]?.balance);
      !receiverInfo[0]
        ? createUser(receiverID)
        : (receiverBalance = receiverInfo[0]?.balance);
    } catch (error) {
      console.log(error);
    }

    userBalance < Math.floor(amount * 1.1)
      ? (message = `<@${userID}>, you don't have sufficient money(${Math.floor(
          amount * 1.1
        )}<:one_taka:1210564051915116634>) in your back account.\n${feeMessage}`)
      : sendMoney(userID, receiverID, amount, userBalance, receiverBalance);

    await interaction.editReply(message);
  },
};

function sendMoney(userID, receiverID, amount, userBalance, receiverBalance) {
  try {
    updateBalance(userID, userBalance, -Math.floor(amount * 1.1));
    updateBalance(receiverID, receiverBalance, amount);
  } catch (error) {
    console.log(error);
  }
  message = `<@${userID}> have successfully transferred ${amount}<:one_taka:1210564051915116634> to <@${receiverID}>${feeMessage}`;
}
