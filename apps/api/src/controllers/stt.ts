import { log } from "@ryuk/logger";
import { RequestHandler } from "express";
import { transcribeAudio } from "../services/stt";
import { uploadAudio } from "../services/storage";

export const transcribeAudioController: RequestHandler = async (req, res) => {
  if (!req.file || !req.file.path)
    return res.status(400).json({ error: "No audio file provided" });
  const { filename } = req.file;
  try {
    const url = await uploadAudio(filename);
    const transcript = await transcribeAudio(url);
    return res.json({ transcript });
  } catch (e) {
    log(e);
    return res.status(500).json({ error: "Failed to transcribe audio" });
  }
};
