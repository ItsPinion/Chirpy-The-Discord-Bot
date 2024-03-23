import { ChatInputCommandInteraction } from "discord.js";
import { getWelcomeInfoByServerID } from "../../../api/get";
import { createWelcome } from "../../../api/post";
import { updateWelcomeChannel } from "../../../api/update";

export async function executeChannel(interaction: ChatInputCommandInteraction) {
  const channel = interaction.options.getChannel("channel");
  if (!channel) {
    await interaction.editReply(
      "Channel not provided or could not be retrieved."
    );
    return;
  }

  const channelID = channel.id;
  const serverId = interaction.guildId as string;

  const alreadyExist = await getWelcomeInfoByServerID(serverId);

  if (!alreadyExist[0]) {
    await createWelcome(serverId);
  }
  
  await updateWelcomeChannel(serverId, channelID);
  await interaction.editReply("Welcome channel updated successfully.");
}
