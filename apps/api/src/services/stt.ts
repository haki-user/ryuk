/**
 * Transcribes audio to text using the AssemblyAI API.
 * @param {string} url - The URL of the audio file to transcribe.
 * @returns {Promise<string>} - A promise that resolves to the transcribed text.
 * @throws {Error} - If there is an error transcribing the audio.
 */
import { log } from "@ryuk/logger";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: "b1cc52f1568b47af80f2bbee69fa6de8",
});

const ex =
  "https://cloud.appwrite.io/v1/storage/buckets/65df67c6c811ff0d5711/files/65df7663e6d8d35260ce/view?project=65df676aaa7599f7b244";

export const transcribeAudio = async ({ audioUrl = ex }): Promise<string> => {
  const config = {
    audio_url: audioUrl,
  };
  try {
    const transcript = await client.transcripts.create(config);
    log("stt " + transcript);
    return transcript.text || "Couldn't transcribe audio";
  } catch (e: any) {
    log(e);
    throw new Error("Failed to transcribe audio" + e);
  }
};
