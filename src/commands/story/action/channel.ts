import { ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import { getStoryChannelByServerID } from "../../../api/get";
import { createStoryChannel } from "../../../api/post";
import { updateStoryChannel } from "../../../api/update";

export async function executeChannel(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const channel = interaction.options.getChannel("channel");
  if (!channel) {
    await interaction.editReply({
      content: "Channel not provided or could not be retrieved.",
    });
    return;
  }

  const permission = interaction.member
    ?.permissions as Readonly<PermissionsBitField>;

  if (!permission.has("Administrator")) {
    await interaction.editReply(
      `You do not have permission to use this command` +
        "```elm\nPermission Required: ['ADMINISTRATOR']\n```"
    );
  }

  if (
    !interaction.guild?.members.me
      ?.permissionsIn(channel.id)
      .has("SendMessages") ||
    !interaction.guild?.members.me?.permissionsIn(channel.id).has("ViewChannel")
  ) {
    await interaction.editReply(
      `I do not have permission to send messages to <#${channel.id}>\n` +
        "```elm\nPermission Required: ['SEND_MESSAGES', 'VIEW_CHANNEL']\n```"
    );
    return;
  }

  const channelID = channel.id;
  const serverId = interaction.guildId as string;
  const alreadyExist = await getStoryChannelByServerID(serverId);
  console.log(channelID, serverId, alreadyExist);

  if (!alreadyExist[0]) {
    await createStoryChannel(serverId, channelID);
    await interaction.editReply({
      content: `Story channel set successfully to ${channel}.`,
    });
  } else {
    await updateStoryChannel(serverId, channelID);
    await interaction.editReply({
      content: `Story channel updated successfully to ${channel}.`,
    });
  }
}
