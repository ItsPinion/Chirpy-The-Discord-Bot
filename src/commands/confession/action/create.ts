import { createConfession } from "../../../api/post";
import {
  getConfessionsByUserID,
  getConfessionsChannelByServerID,
} from "../../../api/get";
import { ChatInputCommandInteraction, User } from "discord.js";

async function executeCreate(interaction: ChatInputCommandInteraction) {
  const confession = interaction.options.getString("confession");
  const targetUser = interaction.options.getUser("for") || null;
  const userID = interaction.user.id;
  const serverId = interaction.guildId as string;

  const existingConfessions = await getConfessionsByUserID(userID, serverId);

  if (existingConfessions[0]) {
    await interaction.editReply({
      content: "You have already submitted a confession. Try again tomorrow.",
    });
    return;
  }

  const confessionChannel = await getConfessionsChannelByServerID(serverId);

  if (!confessionChannel[0]) {
    await interaction.editReply({
      content:
        "A confession dedicated channel has not been created for this server. \nPlease contact the server owner or administrator to set it up.",
    });
    return;
  }

  if (confession) {
    const targetUserId = targetUser ? targetUser.id : null;
    await createConfession(userID, targetUserId, confession, serverId);
    await interaction.editReply({
      content: `Your confession has been submitted. It will be published in <#${confessionChannel[0].channel_id}> anonymously within 24 Hours :) `,
    });
  } else {
    await interaction.editReply({
      content: "Please provide a confession.",
    });
  }
}

export { executeCreate };
