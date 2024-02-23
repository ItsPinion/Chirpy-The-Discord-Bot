// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Get client ID and token from environment variables
const clientId = process.env.clientId;
const token = process.env.token;

// Initialize REST with your token
const rest = new REST({ version: '9' }).setToken(token);

// Function to delete all commands for every guild the bot is in
async function deleteCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        // Delete global commands
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: [] },
        );

        console.log('Successfully deleted global commands.');

        // Fetch all guilds the bot is in
        const guilds = await rest.get(Routes.userGuilds());

        // Delete guild-specific commands for each guild
        for (const guild of guilds) {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guild.id),
                { body: [] },
            );
            console.log(`Successfully deleted commands for guild: ${guild.name} (${guild.id})`);
        }

        console.log('Successfully deleted all commands for all guilds.');
    } catch (error) {
        console.error(error);
    }
}

// Run the function to delete commands
deleteCommands();
