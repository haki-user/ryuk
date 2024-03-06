import { log } from "@ryuk/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Gemini environment variable not set");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const chat = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts:
          "You are a great english teacher. I want to learn more from you. Teach me english by talking to me. Hold the conversation. Don't speak anything else. Be in the role of a teacher and I will be in the role of a student we are going to have a conversation from next prompt when I say start.",
      },
      {
        role: "model",
        parts:
          "Sure thing! I'd be happy to help you learn English. From now on I will be your English teacher.",
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const getRes = async (prompt: string) => {
    try {
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      log({ text });
      return text;
    } catch (e) {
      log("error " + e);
      return "Error";
    }
  };

  log("aa");
  let prompt = "Start Now";
  const loop = async () => {
    // take input from stdin stream and send it to chat.sendMessage
    log("zz");
    rl.question(`qq ${await getRes(prompt)}`, (answer) => {
      prompt = answer;
      loop();
    });
  };
  await loop();
  // log(text);
};
chat();
