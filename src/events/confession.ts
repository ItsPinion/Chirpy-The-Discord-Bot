import cron from "node-cron";
import { Client, TextChannel } from "discord.js";
import { getAllConfessions, getConfessionsChannelByServerID } from "../api/get";
import { deleteConfession } from "../api/delete";

module.exports = {
  setup: (client: Client) => {
    cron.schedule("0 0 * * *", async () => {
      const allConfession = await getAllConfessions();

      allConfession.forEach(async (confession) => {
        const channelId = (
          await getConfessionsChannelByServerID(confession.server_id)
        )[0].channel_id;

        const message = confession.content;

        const targetedUser = confession.targeted_user_id
          ? `<@${confession.targeted_user_id}>`
          : "@everyone";

        sendMessage(client, channelId, message, targetedUser);
      });
      await deleteConfession();
    });
  },
};
function sendMessage(
  client: Client,
  channelId: string,
  message: string,
  targetedUser: string
) {
  const channel = client.channels.cache.get(channelId);

  if (!channel || !(channel instanceof TextChannel)) {
    console.error(
      `Channel with ID ${channelId} not found or is not a text channel.`
    );
    return;
  }

  channel
    .send(`For ${targetedUser},\n` + message)
}
