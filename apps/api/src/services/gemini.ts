import { log } from "@ryuk/logger";
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";
import { get } from "http";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Gemini environment variable not set");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const chat = async ({ prompt }: { prompt: string }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log({ prompt });
  console.log("chat");
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts:
          "You are my AI assistant like jarvis (but you don't have to say your say is jarvis) you have to talk to me so that I can become fluent in english. Teach me english by talking to me. Hold the conversation. Don't speak anything else. start conversation. correct me if I am wrong, or if my sentence doesn't make or grammar is incorrect. size of response should be small less than 50 words. You have to keep the conversation going",
      },
      {
        role: "model",
        parts:
          "Sure thing! I'd be happy to help you learn English. From now on I will keep conversation going in english.",
      },
    ],
    generationConfig: {
      maxOutputTokens: 300,
      candidateCount: 1,
    },
  });

  const getRes = async (prompt: string) => {
    try {
      log("getRes");
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text();
      const history = await chat.getHistory();
      console.log("zz", ...history);
      if (!text) return response.text;
      return text;
    } catch (e) {
      log("error " + e);
      return "Error";
    }
  };

  // log("aa");
  // // let prompt = "Start Now";
  // const loop = async () => {
  //   // take input from stdin stream and send it to chat.sendMessage
  //   log("zz");
  //   rl.question(`qq ${await getRes(prompt)}`, (answer) => {
  //     prompt = answer;
  //     loop();
  //   });
  // };
  // await loop();
  // log(text);
  return getRes(prompt);
};
// chat({
// prompt:
// "I am adding new component of text every time I get a response from server. How can I let browser speak it?",
// });
