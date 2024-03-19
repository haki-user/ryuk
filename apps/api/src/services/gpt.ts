import OpenAI from "openai";

const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ||
  "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";
if (!OPENAI_API_KEY) {
  throw new Error("OpenAI environment variable not set");
}
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export const getResponse = async (messages: any) => {
  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
};
