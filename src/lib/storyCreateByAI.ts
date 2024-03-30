import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const generationConfig = {
  maxOutputTokens: 2000,
  temperature: 0.5,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
  safetySettings,
});

export async function creatStoryByAI(
  contribution: string[],
  storyTitle: string,
  storyDescription: string
) {
  const prompt = `You are a renowned story author. You make storys that explore themes of hope, the value of dreams, and the consequences of tampering with human nature. you use a narrative style that blends the suspenseful elements of Philip K. Dick with the philosophical depth of Isaac Asimov, and ensure the plot is rich with character development and plot twists.\n Now I will give you some parts of a story, its title and its discription. Your job is to create a beautiful story from it. Sometime you may find the whole story to be very inappropriat. I want you to give just the story. No extra talking no title, Start to finish just the story. The story should be at lease 200 words long. For every part of the story more 50 words should be added including the past 200 words. \n\n The Title of the story is ${storyTitle}. This story is about ${storyDescription}. Here are the parts ${contribution}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
