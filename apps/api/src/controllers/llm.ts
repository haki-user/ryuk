import type { RequestHandler } from "express";
import { chat } from "../services/gemini";
import { transcribeAudio } from "../services/stt";
import { uploadAudio } from "../services/storage";
import { log } from "@ryuk/logger";

// export const transcribeAudioController: RequestHandler = async (req, res) => {};

export const responseController: RequestHandler = async (req, res) => {
  if (!req.file || !req.file.path)
    return res.status(400).json({ error: "No audio file provided" });
  const { filename } = req.file;
  try {
    const url = await uploadAudio(filename);
    const transcript = await transcribeAudio(url);
    const response = await chat({ prompt: transcript });
    console.log(response);
    return res.json({ response, transcript });
  } catch (e) {
    log(e);
    return res.status(500).json({ error: "Failed to generate response" });
  }
  // const { prompt } = req.body;
  // res.json({ response });
};
