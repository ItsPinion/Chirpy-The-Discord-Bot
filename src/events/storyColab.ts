import {
  Client, Events
} from "discord.js";
import { createStoryContribution } from "../api/post";

module.exports = {
  setup: (client: Client) => {
    client.on(Events.InteractionCreate, async (interaction): Promise<void> => {
      if (
        !interaction.isModalSubmit() ||
        interaction.customId !== "storyColabModal"
      )
        return;

      await interaction.deferReply({ephemeral:true});

      const userID = interaction.user.id;
      const storyID = (interaction.guild?.id || "DM") + userID;

      const story = interaction.fields.getTextInputValue("story");
      await createStoryContribution(story, userID, Date.now(), storyID);

      console.log(story);

      const reply = await interaction.editReply({
        content: "Your submission was received successfully!",
      });
    });
  },
};
