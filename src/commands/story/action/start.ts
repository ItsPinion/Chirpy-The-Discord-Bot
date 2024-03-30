import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { getStoryByStoryID, getStoryChannelByServerID } from "../../../api/get";

export async function executeStart(interaction: ChatInputCommandInteraction) {
  const serverID = interaction.guild?.id || "DM";
  const userID = interaction.user.id;
  const storyID = serverID + userID;

  const alreadyExist = await getStoryByStoryID(storyID);
  if (alreadyExist[0]) {
    await interaction.reply({
      content: "You already have a running story!",
    });

    return;
  }

  const channel = await getStoryChannelByServerID(serverID);

  if (!channel[0]) {
    await interaction.reply({
      content:
        "A Story dedicated channel has not been created for this server. \nPlease contact the server owner or administrator to set it up.",
    });
    return;
  }

  const modal = new ModalBuilder()
    .setCustomId("storyModal")
    .setTitle("Story Modal");

  const storyTitle = new TextInputBuilder()
    .setCustomId("storyTitle")
    .setLabel("Title:")
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setMaxLength(50)
    .setPlaceholder("Enter story title")
    .setRequired(true);

  const storyDescription = new TextInputBuilder()
    .setCustomId("storyDescription")
    .setLabel("Description:")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(200)
    .setPlaceholder("Enter story Description")
    .setRequired(true);

  const storyStart = new TextInputBuilder()
    .setCustomId("storyStart")
    .setLabel("Start your story:")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(10)
    .setMaxLength(100)
    .setPlaceholder("Enter first scene/part or the story")
    .setRequired(true);

  const ActionRow1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
    storyTitle
  );
  const ActionRow2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
    storyDescription
  );
  const ActionRow3 = new ActionRowBuilder<TextInputBuilder>().addComponents(
    storyStart
  );
  console.log(ActionRow1, ActionRow2, ActionRow3);
  modal.addComponents(ActionRow1, ActionRow2, ActionRow3);

  await interaction.showModal(modal);
}
