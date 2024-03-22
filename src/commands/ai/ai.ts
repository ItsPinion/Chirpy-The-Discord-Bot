import { SlashCommandBuilder,ChatInputCommandInteraction } from "discord.js";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
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
);

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: process.env.FIRST_PROMPT as string }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Roger that! I will always remember and follow these guidelines. 🫡",
        },
      ],
    },
  ],
  generationConfig,
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
  async execute(interaction:ChatInputCommandInteraction) {
    const targetUser = interaction.user;

    await interaction.deferReply();

    try {
      const userInput = interaction.options.getString("input", true);

      const result = await chat.sendMessageStream(
        `${targetUser.username} said, "${userInput}"`
      );
      console.log(`${targetUser.username} said, "${userInput}"`);
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
