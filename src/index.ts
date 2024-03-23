import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

class MyClient extends Client {
  cooldowns: Collection<string, Collection<string, number>>;
  commands: Collection<string, any>;

  constructor(options?: any) {
    super(options);
    this.cooldowns = new Collection();
    this.commands = new Collection();
  }
}

const client = new MyClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildMembers
  ],
});

const commandFoldersPath = path.join(__dirname, "commands");
const eventsFilesPath = path.join(__dirname, "events");

try {
  const commandFolders = fs.readdirSync(commandFoldersPath);
  console.log(`Command folders: ${commandFolders}`);
  for (const folder of commandFolders) {
    const commandsPath = path.join(commandFoldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    console.log(`Command files in ${folder}: ${commandFiles}`);
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
} catch (error) {
  console.error("Error loading command files:", error);
}

try {
  const eventsFiles = fs
    .readdirSync(eventsFilesPath)
    .filter((file) => file.endsWith(".js"));
  console.log(`events files: ${eventsFiles}`);
  for (const file of eventsFiles) {
    const filePath = path.join(eventsFilesPath, file);
    const events = require(filePath);
    if ("setup" in events) {
      events.setup(client);
    } else {
      console.log(
        `[WARNING] The events file at ${filePath} is missing a required "setup" function.`
      );
    }
  }
} catch (error) {
  console.error("Error loading events files:", error);
}

client.once(Events.ClientReady, () => {
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
