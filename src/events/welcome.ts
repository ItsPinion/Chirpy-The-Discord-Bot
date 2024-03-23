import { Client, TextChannel, GuildMember } from "discord.js";
import { getWelcomeInfoByServerID } from "../api/get";

module.exports = {
  setup: (client: Client) => {
    client.on("guildMemberAdd", async (member: GuildMember) => {
      const server_id = member.guild.id;

      const welcomeInfo = (await getWelcomeInfoByServerID(server_id))[0];

      if (!welcomeInfo) return;

      const welcomeMessages = [
        `Welcome to the server, ${member}!`,
        `Hello and welcome, ${member}!`,
        `Glad to have you here, ${member}!`,
        `Hey there, ${member}! Welcome to the server!`,
        `Welcome aboard, ${member}!`,
        `${member}, we're glad you're here! Welcome to the server!`,
        `A big welcome to you, ${member}!`,
        `Welcome to the family, ${member}!`,
        `${member}, it's great to see you here! Welcome!`,
        `Hey ${member}, welcome to the server!`,
        `Welcome to the party, ${member}!`,
        `${member}, we're excited to have you join us! Welcome!`,
        `A warm welcome to you, ${member}!`,
        `${member}, we're thrilled to have you here! Welcome!`,
        `Welcome to the adventure, ${member}!`,
        `${member}, we're delighted to have you on board! Welcome!`,
        `A hearty welcome to you, ${member}!`,
        `${member}, we're overjoyed to have you here! Welcome!`,
        `Welcome to the community, ${member}!`,
        `${member}, we're pleased to have you join us! Welcome!`,
        `A joyful welcome to you, ${member}!`,
        `${member}, we're excited to have you with us! Welcome!`,
        `Welcome to the journey, ${member}!`,
        `${member}, we're delighted to have you here! Welcome!`,
        `A warm and welcoming greeting to you, ${member}!`,
        `${member}, we're thrilled to have you on board! Welcome!`,
        `Welcome to the gathering, ${member}!`,
        `${member}, we're pleased to have you join us! Welcome!`,
        `A hearty and joyful welcome to you, ${member}!`,
        `${member}, we're excited to have you with us! Welcome!`,
        `Welcome to the fellowship, ${member}!`,
        `${member}, we're delighted to have you here! Welcome!`,
        `A warm and welcoming greeting to you, ${member}!`,
        `${member}, we're thrilled to have you on board! Welcome!`,
        `Welcome to the assembly, ${member}!`,
        `${member}, we're pleased to have you join us! Welcome!`,
        `A hearty and joyful welcome to you, ${member}!`,
        `${member}, we're excited to have you with us! Welcome!`,
      ];
      const welcomeMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      const welcomeChannelId = welcomeInfo.channel_id;
      const channel = client.channels.cache.get(welcomeChannelId as string);

      const roleName = welcomeInfo.role_id;
      const role = member.guild.roles.cache.get(roleName as string);

      try {
        if (channel && channel instanceof TextChannel)
          await channel.send(welcomeMessage);
        if (role) await member.roles.add(role);
      } catch (error) {
        console.error(
          `Failed to add role ${roleName} to ${member.user.tag}:`,
          error
        );
      }
    });
  },
};
