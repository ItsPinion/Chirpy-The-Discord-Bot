import { ChatInputCommandInteraction } from "discord.js";
import { getWelcomeInfoByServerID } from "../../../api/get";
import { createWelcome } from "../../../api/post";
import { updateWelcomeChannel, updateWelcomeRole } from "../../../api/update";
import { deleteWelcome } from "../../../api/delete";

export async function executeDelete(interaction: ChatInputCommandInteraction) {
  const option = interaction.options.getString("option");
  if (!option) {
    await interaction.editReply("role not provided or could not be retrieved.");
    return;
  }
  const serverId = interaction.guildId as string;

  const welcomeInfo = await getWelcomeInfoByServerID(serverId);

  if (!welcomeInfo[0]) {
    await interaction.editReply(
      "You havent set your welcome (channel or role)"
    );
    return;
  }

  switch (option) {
    case "channel":
      await updateWelcomeChannel(serverId, null);
      if (!welcomeInfo[0].role_id) await deleteWelcome(serverId);
      await interaction.editReply("Welcome channel removed successfully.");

      break;
    case "role":
      await updateWelcomeRole(serverId, null);
      if (!welcomeInfo[0].channel_id) await deleteWelcome(serverId);
      await interaction.editReply("Welcome role removed successfully.");

      break;
    case "both":
      await deleteWelcome(serverId);
      await interaction.editReply(
        "Welcome role & channel removed successfully."
      );

      break;
    default:
      await interaction.editReply(
        "Invalid delete option. Please specify 'channel' or 'role'."
      );
  }
}
