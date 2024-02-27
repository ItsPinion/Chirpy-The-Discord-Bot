const { createConfessionChannel } = require("../../../api/post");
const { getConfessionsChannelByServerID } = require("../../../api/get");
const { updateConfessionChannel } = require("../../../api/update");

async function executeChannel(interaction) {
  const channelID = interaction.options.getChannel("channel").id;
  const serverId = interaction.guildId;

  const alreadyExist = await getConfessionsChannelByServerID(serverId);
  console.log(alreadyExist);

  if (!alreadyExist[0]) {
    await createConfessionChannel(serverId, channelID);
    await interaction.editReply({
      content: "Confession channel set successfully.",
      ephemeral: true,
    });
  } else {
    await updateConfessionChannel(serverId, channelID);
    await interaction.editReply({
      content: "Confession channel updated successfully.",
      ephemeral: true,
    });
  }
}

module.exports = {
  executeChannel,
};
