import dotenv from "dotenv";
dotenv.config();

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const clientID: string = process.env.DISCORD_CLIENT_ID as string;
const token: string = process.env.DISCORD_BOT_TOKEN as string;

const rest = new REST({ version: "9" }).setToken(token);

async function deleteCommands(): Promise<void> {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientID), { body: [] });

    console.log("Successfully deleted global commands.");

    interface Guild {
      id: string;
      name: string;
    }
    const guilds = (await rest.get(Routes.userGuilds())) as Guild[];

    for (const guild of guilds) {
      await rest.put(Routes.applicationGuildCommands(clientID, guild.id), {
        body: [],
      });
      console.log(
        `Successfully deleted commands for guild: ${guild.name} (${guild.id})`
      );
    }

    console.log("Successfully deleted all commands for all guilds.");
  } catch (error) {
    console.error(error);
  }
}

deleteCommands();
