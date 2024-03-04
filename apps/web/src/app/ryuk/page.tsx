// audio record play stop, upload, transcribe backed localhost:30001/audio/transcribe
"use client";
import { useState, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Page() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  const handleAudio = (blob: any) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  const handleAudioUpload = async (audio: any) => {
    const formData = new FormData();
    formData.append("audio", audio);
    const response = await fetch("http://localhost:3001/audio/transcribe", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  // useEffect(() => {

  // })

  return (
    <div>
      <h1>Audio Transcription</h1>
      {/* <form
        action="http://localhost:30001/audio/transcribe"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="audio" accept="audio/*" />
        <button type="submit">Submit</button>
      </form> */}
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
          <button onClick={() => handleAudioUpload(audioUrl)}>
            Transcribe
          </button>
        </div>
      )}
    </div>
  );
}
