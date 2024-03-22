import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import { getUserInfoByID } from "../../api/get";
import { createUser } from "../../api/post";
import { updateBalance } from "../../api/update";

let message = "```\nI am under maintenance 🚧\n```";
let feeMessage = "```\nThere is a 10% remittance fee. 💸\n```";
let taka = "<:one_taka:1210564051915116634>";
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
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const receiverID = interaction.options.getUser("user")?.id as string;
    const userID = interaction.user.id;
    const amount = +(interaction.options.getNumber("amount") || 0);
    let userInfo: any;
    let receiverInfo: any;

    let userBalance = 0;
    let receiverBalance = 0;

    try {
      [userInfo, receiverInfo] = await Promise.all([
        getUserInfoByID(userID),
        getUserInfoByID(receiverID),
      ]);

      userBalance = userInfo[0]?.balance || 0;
      receiverBalance = receiverInfo[0]?.balance || 0;

      if (!receiverInfo[0]) {
        await createUser(receiverID);
      }
    } catch (error) {
      console.error(error);
    }

    const totalAmountRequired = Math.floor(amount * 1.1);

    if (userBalance < 20 || amount < 20 || userBalance < totalAmountRequired) {
      const lowBalance = userBalance < 20;
      message = `<@${userID}>, you must ${
        lowBalance ? "have" : "send"
      } more than 20${taka}${
        lowBalance ? " in your bank to make any transaction." : "."
      }`;
    } else {
      sendMoney(userID, receiverID, amount, userBalance, receiverBalance);
    }

    await interaction.editReply(message);
  },
};

function sendMoney(
  userID: string,
  receiverID: string,
  amount: number,
  userBalance: number,
  receiverBalance: number
) {
  try {
    if (userID === receiverID) {
      message = `<@${userID}>, you can't send money to yourself.`;
      return;
    }
    updateBalance(userID, userBalance, -Math.floor(amount * 1.1));
    updateBalance(receiverID, receiverBalance, amount);
  } catch (error) {
    console.error(error);
  }
  message = `<@${userID}> have successfully transferred ${amount}<:one_taka:1210564051915116634> to <@${receiverID}>${feeMessage}`;
}
