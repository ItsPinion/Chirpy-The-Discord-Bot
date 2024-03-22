import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from 'discord.js';
import { updateBalance, updateDaily } from "../../api/update";
import { getUserInfoByID } from "../../api/get";
import { checkDailyRewardClaim } from "../../lib/rewardClaim";
import { createUser } from "../../api/post";

const reward = 20;
let message = "```\nI am under maintenance 🚧\n```";

module.exports = {
 cooldown: 5,
 data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily reward!"),
 async execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const UserID = interaction.user.id;
    let Info: any;

    try {
      const userExist = await getUserInfoByID(UserID);

      if (!userExist[0]) {
        await createUser(UserID);
      } else {
        Info = userExist[0];
      }
    } catch (error) {
      console.error(error);
    }

    const alreadyTaken = checkDailyRewardClaim(new Date(), Info?.daily);

    if (!alreadyTaken) {
      handleUpdate(UserID, Info);
    }

    message = !alreadyTaken
      ? `${reward}<:one_taka:1210564051915116634> has been added to <@${UserID}>'s bank account`
      : `<@${UserID}>, It seems you have already claimed today's reward.`;

    await interaction.editReply(message);
 },
};

function handleUpdate(UserID: string, Info: any) {
 try {
    updateBalance(UserID, Info?.balance, reward);
    updateDaily(UserID, Date.now());
 } catch (error) {
    console.error(error);
 }
}

 