// import type { RequestHandler } from "express";
// import { chat } from "../services/gemini";
// import { transcribeAudio } from "../services/stt";
// import { uploadAudio } from "../services/storage";
// import { log } from "@ryuk/logger";

// // export const transcribeAudioController: RequestHandler = async (req, res) => {};

// export const responseController: RequestHandler = async (req, res) => {
//   if (!req.file || !req.file.path)
//     return res.status(400).json({ error: "No audio file provided" });
//   const { filename } = req.file;
//   try {
//     const url = await uploadAudio(filename);
//     const transcript = await transcribeAudio(url);
//     const response = await chat({ prompt: transcript });
//     console.log(response);
//     return res.json({ response, transcript });
//   } catch (e) {
//     log(e);
//     return res.status(500).json({ error: "Failed to generate response" });
//   }
//   // const { prompt } = req.body;
//   // res.json({ response });
// };

import type { RequestHandler } from "express";
import { chat } from "../services/gemini";
import { transcribeAudio } from "../services/stt";
import { uploadAudio } from "../services/storage";
import { log } from "@ryuk/logger";
import { generateAudioFromTranscription } from "../services/tts";

export const responseController: RequestHandler = async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "No audio file provided" });
  }

  try {
    // Upload audio file
    const { filename } = req.file;
    const audioUrl = await uploadAudio(filename);

    // Transcribe audio
    const transcript = await transcribeAudio(audioUrl);

    // Generate response using Gemini
    const response = await chat({ prompt: transcript });

    // Generate response audio from transcript
    const audioData: any = await generateAudioFromTranscription(
      String(response)
    );

    // // Send the audio file, transcript, and response as JSON response
    const base64AudioData = arrayBufferToBase64(audioData);
    // Send the audio file, transcript, and response as JSON response
    res.json({ base64AudioData, transcript, response });
  } catch (error) {
    log(error);
    return res.status(500).json({ error: "Failed to generate response" });
  }
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
