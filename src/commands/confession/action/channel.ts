import { ChatInputCommandInteraction } from "discord.js";
import { getConfessionsChannelByServerID } from "../../../api/get";
import { createConfessionChannel } from "../../../api/post";
import { updateConfessionChannel } from "../../../api/update";

export async function executeChannel(interaction: ChatInputCommandInteraction) {
  const channel = interaction.options.getChannel("channel");
  if (!channel) {
    await interaction.editReply({
      content: "Channel not provided or could not be retrieved.",
    });
    return;
  }

  const channelID = channel.id;
  const serverId = interaction.guildId as string;

  const alreadyExist = await getConfessionsChannelByServerID(serverId);

  if (!alreadyExist[0]) {
    await createConfessionChannel(serverId, channelID);
    await interaction.editReply({
      content: "Confession channel set successfully.",
    });
  } else {
    await updateConfessionChannel(serverId, channelID);
    await interaction.editReply({
      content: "Confession channel updated successfully.",
    });
  }
}
