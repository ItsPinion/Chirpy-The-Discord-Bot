# Chirpy The Discord Bot

![Discord Bot Project](https://i.ibb.co/k4nxjyK/a.png)

## Version

![Version](https://img.shields.io/badge/Version-0.4.0-purple.svg)

## Description

Welcome to the my Discord Bot Project named chirpy, a comprehensive Discord bot designed to revolutionize server interactions with its advanced features. Built with TypeScript and the Discord.js library, this bot is one of my passion projects.

## Features

- **AI-Powered Content Generation**: Leverages Google's Generative AI to create engaging content on-the-fly.
- **Dynamic Command Handling**: Dynamically loads commands from the `commands` directory, supporting subcommands, cooldowns, and more.
- **Event-Driven Programming**: Automatically registers event listeners from the `events` directory, ensuring seamless integration with Discord's API.
- **API Integration**: Fetches data from external APIs for a wide range of commands, enhancing user experience.
- **Confession**: Facilitates anonymous confessions fostering community engagement.
- **Welcome System**: Customizable welcome messages and roles for new members, enhancing the onboarding experience.
- **Modular Design**: Easily extendable, allowing for the addition of new commands and events as needed.
- **Database Integration**: Utilizes Drizzle ORM for database operations, supporting SQLite migrations and pushes.

## Slash Commands

- **/advice**: Returns a random advice
- **/talk**: Chat with Chirpy directly
- **/chucknorris**: Returns a random Chuck Norris Joke
- **/confession**: Manage confessions and confession channels
  - **channel**: Set or update the channel dedicated for confession broadcast
  - **create**: Submit an anonymous confession
- **/darkjoke**: Replies with a random dark joke
- **/dicerole**: Rolls a dice with 6 sides
- **/joke**: Replies with a random joke
- **/nsfw**: Returns a random nsfw image url
- **/numberfects**: Replies with a random Number fact
- **/welcome**: Manage welcome channel and role
  - **channel**: Set or update the channel dedicated for welcoming members
  - **role**: Set or update the role dedicated for new members


## Environment Variables

Before running the bot, ensure you have the following environment variables set in your `.env` file:

- `DISCORD_CLIENT_ID`: Your Discord application client ID.
- `DISCORD_BOT_TOKEN`: Your Discord bot token.
- `GEMINI_API_KEY`: Your [Gemini API](https://ai.google.dev/) key for the AI command.
- `FIRST_PROMPT`: The initial prompt for the AI command.
- `TURSO_CONNECTION_URL`: The connection URL for [Turso](https://turso.tech/).
- `TURSO_AUTH_TOKEN`: The authentication token for [Turso](https://turso.tech/).

## Scripts

The `package.json` file includes several scripts for development and deployment:

- `dev`: Runs the bot in development mode with hot reloading.
- `build`: Compiles TypeScript to JavaScript and runs the deployment script.
- `deploy`: Deploys the bot's commands to Discord.
- `start`: Starts the bot using the compiled JavaScript files.
- `reboot`: Removes the `dist` directory, effectively rebooting the bot by forcing a rebuild.
- `db:migrate`: Generates SQLite migrations using Drizzle Kit.
- `db:push`: Pushes SQLite migrations to the database using Drizzle Kit.

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/ItsPinion/Chirpy-The-Discord-Bot.git
   ```
2. **Install Dependencies**:
   ```
   npm install
   ```
3. **Environment Setup**: Create a `.env` file in the root directory with your Discord bot token and other necessary environment variables. View [.env.example](.env.example)
   ```.env
   DISCORD_CLIENT_ID =
   DISCORD_BOT_TOKEN =

   GEMINI_API_KEY = 
   FIRST_PROMPT =
   
   TURSO_CONNECTION_URL =
   TURSO_AUTH_TOKEN =
   ```
4. **Build the Bot**:
   ```
   npm run build
   ```
5. **Run the Bot**:
   ```
   npm start
   ```

## Contributing

We welcome contributions from the community! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---

> *Chirpy The Discord Bot* is a project by [ItsPinion](https://github.com/ItsPinion). 

## Special Features

- **Customizable Experience**: Offers a wide range of customizable features, from welcome messages to storytelling channels.
- **Community Engagement**: Designed to foster community engagement through anonymous confessions and collaborative storytelling(*comming soon*).
- **Advanced AI Integration**: Utilizes state-of-the-art AI to generate creative content, enhancing user interactions.
- **Open Source**: Encourages open-source contributions, making it a community-driven project.

## Support

For support, please open an issue on GitHub or join our [Discord server](https://discord.gg/5DAvDUS6EE).

## Acknowledgments

- **[Discord.js](https://discord.js.org/)**: A powerful library for interacting with the Discord API.
- **[Google's Generative AI](https://ai.google.dev/)**: Provides the AI-powered content generation capabilities.
- **[Node.js](https://nodejs.org/en)**: The runtime environment that powers the bot.
- **[Drizzle ORM](https://orm.drizzle.team/)**: Simplifies database operations and migrations.
- **[Advice Slip JSON API](https://api.adviceslip.com/)**: A free JSON API for over 10 million pieces of advice.
- **[Chuck Norris Joks Api](https://api.chucknorris.io/)**: A free JSON API for hand curated Chuck Norris facts.
- **[JokeAPI](https://v2.jokeapi.dev/)**: A free JSON API for uniformly and well formatted jokes.
- **[Nekos.Pro](https://nekos.pro/)**: A free JSON API for moderated, filtered, & ToS friendly hentai.
- **[Numbers API](http://numbersapi.com/)**: A free JSON API for facts about various numbers.
---

## Version

![Version](https://img.shields.io/badge/Version-0.4.0-green.svg)

This README is designed to showcase the Chirpy Discord Bot Project as a comprehensive and innovative Discord bot solution. If you have any suggestions or additional features you'd like to see, please let me know!

---

## Community Engagement

- **Discord Server**: Join our [Discord server](https://discord.gg/5DAvDUS6EE) to connect with other users and developers.
- **Feature Requests**: Have an idea for a new feature? Submit it through our [feature request form](https://your-feature-request-url.com).
- **Bug Reports**: Found a bug? Report it on our [issue tracker](https://github.com/ItsPinion/Chirpy-The-Discord-Bot/issues).

---

Join Chirpy the Discord Bot community and help us make it the coolest discord bot of all time!