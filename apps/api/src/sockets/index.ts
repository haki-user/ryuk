import { chat } from "../services/gemini";
import { transcribeAudio } from "../services/stt";
import { uploadAudio } from "../services/storage";
import { log } from "@ryuk/logger";
import { generateAudioFromTranscription } from "../services/tts";
import type { Server as SocketServer } from "socket.io";
// import { saveAudioFile } from "../utils/multer";
import { getResponse } from "../services/gpt";
import fs from "fs";

// Define a WebSocket server instance
let io;

// Set up WebSocket connection
export const initSocket = (socketIo: SocketServer) => {
  io = socketIo;
  io.on("connection", (socket) => {
    console.log("Client connected");
    const messages = [
      {
        role: "system",
        content:
          "I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let’s start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to remember that I am speaking so ignore the punctuation errors",
      },
      { role: "user", content: "Nothing much" },
    ];

    // Handle incoming audio messages
    socket.on("audio", async (blob: any) => {
      try {
        // audio blob to array buffer
        const buffer = Buffer.from(blob);
        fs.writeFileSync("./uploads/audio.webm", buffer);
        // console.log({ fileName });
        const audioUrl = await uploadAudio("audio.webm");
        const transcript = await transcribeAudio(audioUrl);
        messages.push({ role: "user", content: transcript });

        // // Generate response using Gemini
        // const response = await chat({ prompt: transcript });

        const response =
          (await getResponse(messages)) ||
          "I am sorry, I am not able to understand you";
        messages.push({ role: "assistant", content: response });

        // Generate response audio from transcript
        const audioData = (await generateAudioFromTranscription(
          String(response)
        )) as Buffer;

        // Send the audio file, transcript, and response to the client
        const base64AudioData = arrayBufferToBase64(audioData);
        // console.log({ base64AudioData, transcript, response });
        socket.emit("message", { base64AudioData, transcript, response });
      } catch (error) {
        log(error);
        socket.emit("error", { message: "Failed to generate response" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: Buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
