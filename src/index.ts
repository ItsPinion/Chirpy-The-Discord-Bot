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

const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });

const commandFoldersPath = path.join(__dirname, "commands");
const automationFilesPath = path.join(__dirname, "automation");

const commandFolders = fs.readdirSync(commandFoldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(commandFoldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
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

const automationFiles = fs
  .readdirSync(automationFilesPath)
  .filter((file) => file.endsWith(".js"));
for (const file of automationFiles) {
  const filePath = path.join(automationFilesPath, file);
  const automation = require(filePath);
  if ("setup" in automation) {
    automation.setup(client);
  } else {
    console.log(
      `[WARNING] The automation file at ${filePath} is missing a required "setup" function.`
    );
  }
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
