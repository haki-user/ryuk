// audio record play stop, upload, transcribe backed localhost:30001/audio/transcribe
"use client";
import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

interface Conversation {
  id?: string;
  // user or bot, // propmt and response
  speaker: "user" | "ai";
  text: string;
  audio?: Blob;
}

export default function Page() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [conversation, setConversation] = useState<Conversation[]>([
    {
      speaker: "user",
      text: "Hello, how are you doing today?",
    },
    {
      speaker: "ai",
      text: "I'm doing well, thank you for asking.",
    },
  ]);

  const handleAudio = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    const response = await fetch("http://localhost:3001/audio/transcribe", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setConversation((prev) => [
      ...prev,
      {
        speaker: "user",
        text: data.transcript,
      },
    ]);
    console.log(data);
  };

  return (
    <div className="w-full h-full bg-red-500">
      <nav className="w-full h-16 bg-black px-6 text-text_light">
        <div className="w-full h-full flex items-center justify-between">
          <div>Ryuk</div>
          <div>Menu</div>
        </div>
      </nav>
      <div className="w-full h-full bg-black text-text_light">
        <h1 className="text-center">Audio Transcription</h1>
        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-col gap-2">
            {conversation.map((c, i) => {
              return (
                <div key={i} className="flex border-[1px] p-1 border-white">
                  <div className="mr-4 capitalize">{c.speaker}:</div>
                  <div>{c.text}</div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-4">
            <AudioRecorder
              classes={{
                AudioRecorderClass:
                  "max-w-10 max-h-10 hidden text-white invert",
              }}
              onRecordingComplete={handleAudio}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={false}
              downloadFileExtension="webm"
            />
          </div>
        </div>
        {audioBlob && (
          <div className="w-full flex flex-col items-center justify-center mt-4 gap-2">
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <button
              onClick={() => handleAudioUpload(audioBlob)}
              className="px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] shadow-gray-700 bg-black cursor-pointer hover:bg-zinc-900 rounded-full text-text_light"
            >
              Transcribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
