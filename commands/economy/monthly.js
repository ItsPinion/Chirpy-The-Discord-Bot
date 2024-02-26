const { updateBalance, updateMonthly } = require("../../api/update");
const { getUserInfoByID } = require("../../api/get");
const { checkMonthlyRewardClaim } = require("../../lib/rewardClaim");
const { createUser } = require("../../api/post");
const { SlashCommandBuilder } = require("discord.js");

const reward = 1000;
let message = "```\nI am under maintenance 🚧\n```";

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Claim your mnthly reward!"),
  async execute(interaction) {
    await interaction.deferReply();

    const UserID = interaction.user.id;
    let Info;

    try {
      userExist = await getUserInfoByID(UserID);

      !userExist[0] ? createUser(UserID) : (Info = userExist[0]);
    } catch (error) {
      console.error(error);
    }

    const alreadyTaken = checkMonthlyRewardClaim(new Date(), Info?.monthly);

    !alreadyTaken && handleUpdate(UserID, Info);

    message = !alreadyTaken
      ? `${reward}<:one_taka:1210564051915116634> has been added to <@${UserID}>'s bank account`
      : `<@${UserID}>, It seems you have already claimed this month's reward.`;

    await interaction.editReply(message);
  },
};

function handleUpdate(UserID, Info) {
  try {
    updateBalance(UserID, Info?.balance, reward);
    updateMonthly(UserID, Date.now());
  } catch (error) {
    console.error(error);
  }
}
