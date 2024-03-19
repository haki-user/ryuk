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

export const generateSummary = async (transcript: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Generate summary of the given transcript from an audio file. Just give the summary of the given transcript no need to add any extra information. Response should only include the summary no other words than text from transcript e.g. the response should the summary only. structure: heading, then points",
      },
      {
        role: "user",
        content: transcript,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log("summary", chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
};
