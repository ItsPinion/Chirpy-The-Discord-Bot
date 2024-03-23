import { ChatInputCommandInteraction } from "discord.js";
import { getWelcomeInfoByServerID } from "../../../api/get";
import { createWelcome } from "../../../api/post";
import { updateWelcomeRole } from "../../../api/update";

export async function executeRole(interaction: ChatInputCommandInteraction) {
  const role = interaction.options.getRole("role");
  if (!role) {
    await interaction.editReply("role not provided or could not be retrieved.");
    return;
  }

  const rolelID = role.id;
  const serverId = interaction.guildId as string;

  const welcomeInfo = await getWelcomeInfoByServerID(serverId);

  if (!welcomeInfo[0]) {
    await createWelcome(serverId);
  }

  await updateWelcomeRole(serverId, rolelID);
  await interaction.editReply("Welcome role updated successfully.");
}
