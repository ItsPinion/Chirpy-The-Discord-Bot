const { SlashCommandBuilder } = require("discord.js");
const { createConfession } = require("../../../api/post");
const {
  getConfessionsByUserID,
  getConfessionsChannelByServerID,
} = require("../../../api/get");

async function executeCreate(interaction) {
  const confession = interaction.options.getString("confession");
  const targetUser = interaction.options.getUser("user") || null;
  const userID = interaction.user.id;
  const serverId = interaction.guildId;

  try {
    const quality = await run(confession);
    if (quality.toLocaleLowerCase().includes(false)) {
      await interaction.editReply({
        content: "Your confession is not appropriate.",
        ephemeral: true,
      });
      return;
    }
  } catch (error) {
    await interaction.editReply({
      content: "Your confession is not appropriate.",
      ephemeral: true,
    });
    console.error(error, "weeee");
    return;
  }

  const existingConfessions = await getConfessionsByUserID(userID, serverId);

  if (existingConfessions[0]) {
    await interaction.editReply({
      content: "You have already submitted a confession. Try again tommorow.",
      ephemeral: true,
    });
    return;
  }

  const confessionChannel = await getConfessionsChannelByServerID(serverId);

  console.log(existingConfessions);
  if (!confessionChannel[0]) {
    await interaction.editReply({
      content:
        "A confession dedicated channel has not been created for this server. \nPlease contact the server owner or administrator to set it up.",
      ephemeral: true,
    });
    return;
  }

  if (confession) {
    const targetUserId = targetUser ? targetUser.id : null;
    await createConfession(userID, targetUserId, confession, serverId);
    await interaction.editReply({
      content: `Your confession has been submitted. It will be published in <#${confessionChannel[0].channel_id}> anonymously within  24 Hours :)`,
      ephemeral: true,
    });
  } else {
    await interaction.editReply({
      content: "Please provide a confession.",
      ephemeral: true,
    });
  }
}

module.exports = {
  executeCreate,
};
