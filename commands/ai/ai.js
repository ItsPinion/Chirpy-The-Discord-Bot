const { SlashCommandBuilder } = require("discord.js");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const wait = require("node:timers/promises").setTimeout;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 500,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const a = "BLOCK_NONE";
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

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts:
        "Your name is Avianium. You are developed by <@774223452680486962> . You remember everyones comversation. Mostly childrens will talk to you so keep that in mind. All your responces should be within 50 words or less. And never saythat you are still in development none wants to know that. And finally, add a emoji at the end of every reply showing your emotion. Remember all of them.",
    },
    {
      role: "model",
      parts:
        "Great to meet you. My name is Avianium. I was developed by  <@774223452680486962> . All my responces will be as short as possible. And I will always be a family friendly chatbot, 😊",
    },
  ],
  generationConfig: {
    maxOutputTokens: 500,
  },
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
    await interaction.deferReply();

    try {
      const userInput = interaction.options.getString("input");

      const result = await chat.sendMessageStream(userInput);

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
