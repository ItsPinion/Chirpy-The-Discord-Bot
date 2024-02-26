const {
  getAllConfessions,
  getConfessionsChannelByServerID,
} = require("../api/get");

const { deleteConfession } = require("../api/delete");

const cron = require("node-cron");

module.exports = {
  setup: (client) => {
    cron.schedule("0 7 * * *", async () => {
      const allConfession = await getAllConfessions();
      console.log(allConfession);

      allConfession.forEach(async (confession) => {
        const channelId = (
          await getConfessionsChannelByServerID(confession.server_id)
        )[0].channel_id;

        const message = confession.content;

        const targetedUser = confession.targeted_user_id
          ? `<@${confession.targeted_user_id}>`
          : "@everyone";

        console.log(channelId, message);
        sendMessage(client, channelId, message, targetedUser);
      });
      await deleteConfession();
    });
  },
};

function sendMessage(client, channelId, message, targetedUser) {
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.error(`Channel with ID ${channelId} not found.`);
    return;
  }

  channel
    .send(`For ${targetedUser},\n` + message)
    .then(() => console.log("Good morning message sent successfully."))
    .catch(console.error);
}
