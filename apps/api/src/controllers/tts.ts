import { RequestHandler } from "express";
import { generateAudioFromTranscription } from "../services/tts";

export const sttController: RequestHandler = async (req, res) => {
  try {
    const { transcription } = req.body;

    if (!transcription) {
      return res.status(400).json({ error: "Transcription is required" });
    }

    const audioData = await generateAudioFromTranscription(transcription);

    // Set the response content type to audio/mpeg
    res.setHeader("Content-Type", "audio/mpeg");
    // Send the audio data as response
    res.send(audioData);
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "An error occurred while generating audio" });
  }
};
