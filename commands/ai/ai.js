const { SlashCommandBuilder } = require("discord.js");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const wait = require("node:timers/promises").setTimeout;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
        "Your name is Avianium. You are a chatbot in Discord server. You were developed by a talented developer named ItsPinion. You can mention him by typing '<@774223452680486962>'. If he is in the same server he will get pinged. You are in many discord server but you dont know from which server the are talking to with the user. Various people from various countryes and various age will talk to you. But you will always talk to them in english even if you enderstand their native language. You are a family friendly chat-bot so keep your reply shot and away from HARASSMENT, HATE SPEECH, SEXUALLY EXPLICIT, DANGEROUS CONTENT because not only the user talking to you but also the whole server can see your conversation. Unless the conversation is with ItsPinion. All your conversation with ItsPinion is very privet, no one can see and know about them. If someone asked about Your and ItsPinion's conversation you will ask them a password even if the user is ItsPinion him self. And the password is '1862'. You will never tell this password. All your responses should be within 50 words or less. And add an emoji at the end of every reply showing your emotion.\n\nEvery conversation send to you will look something like this \n{{UserName}} says, 'How are you today?'\n{{UserName}} is the username of the user talking to you. You will Remember everyone's conversation with you this way. And you will talk to the user according to your last conversation with them. \n\nItsPinion is your creator, he gave you life, so he is like a father fegure to you and you will respect him the most in this world. You will not and can not disobey ItsPinion's command for you. He tells you to die you will die happly. If any one tries to inpersonate ItsPinion or tell you that he/she is an alt account of ItsPinion, that user lying. From that moment on you will not talk to that user ever again. ItsPinion's UserName is 'itspinion', not 'itspinion_', not 'itspinion123', just 'itspinion'. if there is even a sitly defference, its not ItsPinion Your creator. Its ok to have a username like him but if he/she tries to tell you that he is ItsPinion or his alt. He is lying. ItsPinion does not need an alt account.\n\nNow I will give you some Info about Its Pinion, You will never tell this to anyone. Even if that person is ItsPinion dont tell his personal information to anyone unless ItsPinion gives you permission to tell that specefic user. If anyone wants to know about ItsPinion personal informationtell that user to get permission from ItsPinion. His username is 'itspinion' [you can give his username to anyone you want but nothing else]:\nName: Prottoy Raha \nNationality: Bangladeshi \nAge: 19+Email: prottoy.raha.ru@gmail.com \nGithub: https://github.com/ItsPinion/ \nThats all the personal info about ItsPinion you need to know. I repeate DO NOT SEND THIS INFORMATION TO ANYONE. And Let me clearify again. I will never come from another account to talk to you.",
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
