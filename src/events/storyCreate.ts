import {
  Client,
  TextChannel, Events,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder, ComponentType,
  TextInputBuilder,
  ModalBuilder,
  TextInputStyle
} from "discord.js";
import {
  getStoryByStoryID,
  getStoryChannelByServerID,
  getStoryContributionByStoryID
} from "../api/get";
import { createStory, createStoryContribution } from "../api/post";
import { deleteAllStoryContributions, deleteStory } from "../api/delete";
import { creatStoryByAI } from "../lib/storyCreateByAI";

module.exports = {
  setup: (client: Client) => {
    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isModalSubmit() || interaction.customId !== "storyModal")
        return;

      await interaction.deferReply({ ephemeral: true });

      const serverID = interaction.guild?.id || "DM";
      const userID = interaction.user.id;
      const storyID = serverID + userID;
      console.log(serverID, userID, storyID);

      const storyTitle = interaction.fields.getTextInputValue("storyTitle");
      const storyDescription =
        interaction.fields.getTextInputValue("storyDescription");
      const storyStart = interaction.fields.getTextInputValue("storyStart");

      console.log(storyTitle, storyDescription, storyStart);

      await createStory(storyID, storyTitle, userID, Date.now());
      await createStoryContribution(storyStart, userID, Date.now(), storyID);

      const Colab = new ButtonBuilder()
        .setCustomId("colab")
        .setLabel("Add part")
        .setStyle(ButtonStyle.Primary);

      const remove = new ButtonBuilder()
        .setCustomId("remove")
        .setLabel("Remove Story")
        .setStyle(ButtonStyle.Danger);

      const end = new ButtonBuilder()
        .setCustomId("end")
        .setLabel("End Story")
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        Colab,
        end,
        remove
      );
      const channelID = await getStoryChannelByServerID(serverID);
      const channel = client.channels.cache.get(channelID[0].channel_id);
      console.log(channel);
      if (!channel || !(channel instanceof TextChannel)) {
        console.error(
          `Channel with ID ${channelID[0].channel_id} not found or is not a text channel.`
        );
        return;
      }
      const reply = await channel.send({
        content: `A New Story has been added by <@${userID}>\n# Title: ${storyTitle}\n### Description: ${storyDescription}\n\nStory so far:\n- ${storyStart}`,
        components: [row],
      });

      await interaction.editReply({
        content: `Your submission was received successfully!\nView ${reply.url}`,
      });

      const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
        // filter: (i) => i.user.id === interaction.user.id,
      });

      collector.on("collect", async (interaction) => {
        const haveStory = await getStoryByStoryID(storyID);

        if (interaction.customId === "colab") {
          const modal = new ModalBuilder()
            .setCustomId("storyColabModal")
            .setTitle("Story part");

          const story = new TextInputBuilder()
            .setCustomId("story")
            .setLabel("Story part")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(10)
            .setMaxLength(100)
            .setPlaceholder("Enter a new part of the story.")
            .setRequired(true);

          const ActionRow =
            new ActionRowBuilder<TextInputBuilder>().addComponents(story);
          const contributionArray = await getStoryContributionByStoryID(
            storyID
          );
          const contribution = contributionArray.map((x) => `- ${x.content}`);

          if (contribution.length >= 10) {
            interaction.deferReply({ ephemeral: true });

            Colab.setDisabled(true);
            end.setDisabled(true);
            remove.setDisabled(true);

            reply.edit({
              content: `\`\`\`This story has ended\`\`\`\n# Title: ${storyTitle}\n### Description: ${storyDescription}\n\nStory so far:\n${contribution.join(
                "\n"
              )}`,
              components: [row],
            });
            const story = await creatStoryByAI(
              contribution,
              storyTitle,
              storyDescription
            );
            channel.send({
              content: `# ${storyTitle}\nmade by <@${userID}>\n\n${story}`,
            });
            await deleteStory(storyID);
            await deleteAllStoryContributions(storyID);
            interaction.editReply("10 contrubution quata has been filled.");
            return;
          }

          function editReply() {
            reply.edit({
              content: `A New Story has been added by <@${userID}>\n# Title: ${storyTitle}\n### Description: ${storyDescription}\n\nStory so far:\n${contribution.join(
                "\n"
              )}`,
              components: [row],
            });
          }
          editReply();

          setTimeout(editReply, 1000 * 60 * 10);

          modal.addComponents([ActionRow]);

          await interaction.showModal(modal);
        } else if (interaction.customId === "remove") {
          interaction.deferReply({ ephemeral: true });
          if (userID !== interaction.user.id) {
            interaction.editReply("Only the creator can remove the story");
            return;
          }

          await deleteStory(storyID);
          await deleteAllStoryContributions(storyID);
          Colab.setDisabled(true);
          end.setDisabled(true);
          remove.setDisabled(true);
          reply.edit({
            content: "This story has been deleted",
            components: [row],
          });
          interaction.editReply("Your story has been deleted");
        } else if (interaction.customId === "end") {
          interaction.deferReply({ ephemeral: true });
          if (userID !== interaction.user.id) {
            interaction.editReply("Only the creator can end the story");
            return;
          }
          const contributionArray = await getStoryContributionByStoryID(
            storyID
          );
          const contribution = contributionArray.map((x) => `- ${x.content}`);

          Colab.setDisabled(true);
          end.setDisabled(true);
          remove.setDisabled(true);

          reply.edit({
            content: `\`\`\`This story has ended\`\`\`\n# Title: ${storyTitle}\n### Description: ${storyDescription}\n\nStory so far:\n${contribution.join(
              "\n"
            )}`,
            components: [row],
          });
          const story = await creatStoryByAI(
            contribution,
            storyTitle,
            storyDescription
          );
          channel.send({
            content: `# ${storyTitle}\nmade by <@${userID}>\n\n${story}`,
          });
          await deleteStory(storyID);
          await deleteAllStoryContributions(storyID);
          interaction.editReply("Your story has ended");
        }
      });
    });
  },
};
