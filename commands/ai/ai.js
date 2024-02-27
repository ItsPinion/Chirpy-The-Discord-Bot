const { SlashCommandBuilder } = require("discord.js");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 500,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel(
  { model: "gemini-pro" },
  generationConfig,
  safetySettings
);

require("dotenv").config();

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: process.env.FIRST_PROMPT,
    },
    {
      role: "model",
      parts:
        "Roger that! I will always remember and follow these guidelines. 🫡",
    },
  ],
  generationConfig: {
    maxOutputTokens: 500,
  },
  safetySettings,
});

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Replies with a random advice!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Your question or statement")
        .setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.user;

    await interaction.deferReply();

    try {
      const userInput = interaction.options.getString("input");

      const result = await chat.sendMessageStream(
        `${targetUser.username} said, "${userInput}"`
      );
      console.log(`${targetUser.user} said, "${userInput}"`);
      let text = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText.replaceAll("`", "");
        await interaction.editReply(text);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      await interaction.editReply(
        "Get a brush and clean your filthy brain. 🤢"
      );
    }
  },
};
