// audio record play stop, upload, transcribe backed localhost:30001/audio/transcribe
"use client";
import { useState, useEffect, useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/auth-context";
// import Speech from 'speak-tts'

interface Conversation {
  id?: string;
  // user or bot, // propmt and response
  speaker: "user" | "AI";
  text: string;
  audio?: Blob;
}

export default function Page() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const { user } = useUserContext();

  const [conversation, setConversation] = useState<Conversation[]>([
    {
      speaker: "user",
      text: "Hello, how are you doing today?",
    },
    {
      speaker: "AI",
      text: "I'm doing well, thank you for asking.",
    },
  ]);
  const AIPlay = useRef<HTMLButtonElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const synth = window.speechSynthesis;
    console.log("use effect");
    if (AIPlay.current) {
      console.log("click", AIPlay.current);
      AIPlay.current.click();
    }
    // const speech = new Speech() // will throw an exception if not browser supported
    // if(speech.hasBrowserSupport()) { // returns a boolean
    // console.log("speech synthesis supported")
    // }
    // speech.speak({
    // text: 'Hello, how are you today ?',
    // queue: false, // current speech will be interrupted,
    // listeners: {
    // onstart: () => {
    // console.log("Start utterance")
    // },
    // onend: () => {
    // console.log("End utterance")
    // },
    // onresume: () => {
    // console.log("Resume utterance")
    // },
    // onboundary: (event) => {
    // console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
    // }
    // }
    // }).then(() => {
    // console.log("Success !")
    // }).catch(e => {
    // console.error("An error occurred :", e)
    // })
    if (conversationEndRef) {
      scrollToBottom();
    }
    return () => {
      synth.cancel();
    };
  }, [conversation, AIPlay.current]);

  const handleAudio = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleAudioUpload = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    const response = await fetch("http://localhost:3001/response", {
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
      {
        speaker: "AI",
        text: data.response,
      },
    ]);
    console.log(data);
  };

  const handlePlay = async () => {
    const synth = window.speechSynthesis;
    console.log("handle play", synth.getVoices());
    if (isPaused) {
      synth.resume();
    }
    const u = new SpeechSynthesisUtterance(
      conversation[conversation.length - 1].text
    );
    await synth.speak(u);
    setIsPaused(false);
  };

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;
  //   synth.pause();
  //   setIsPaused(true);
  // };

  // const handleStop = () => {
  //   const synth = window.speechSynthesis;
  //   synth.cancel();
  //   setIsPaused(false);
  // };
  console.log("dfsdf", { user })

  return (
    <div className="w-full h-full bg-red-500">
      <div className="w-full h-full bg-black text-text_light">
        {/* <h1 className="text-center">Audio Transcription</h1> */}
        <div className="pt-4 w-full pl-16 h-[62vh] overflow-y-scroll bg-zinc-800">
          <div className="flex flex-col h-full gap-2">
            {conversation.map((c, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${i !== conversation.length - 1 ? "border-b-[1px]" : "mb-2"} p-1 border-stone-400 gap-2 flex-wrap items-center`}
                >
                  {c.speaker === "user" ? (
                    <Avatar className={cn("w-4 h-4")}>
                      <AvatarImage
                        src={user.imageUrl || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ) : (
                    ""
                  )}
                  <div className="mr-4 capitalize text-[#cccc]">
                    {c.speaker==="AI"?"AI:":"You:"}
                  </div>
                  <div>{c.text}</div>
                </div>
              );
            })}
            <div ref={conversationEndRef} />
          </div>
        </div>
        <div className="border-t-2 h-[30%] border-stone-600 absolute bottom-0 left-0 w-full bg-black">
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
      <div className="hidden">
        <button id="play-button" ref={AIPlay} onClick={handlePlay}>
          {isPaused ? "Resume" : "Play"}
        </button>
        {/* <button onClick={handlePause}>Pause</button> */}
        {/* <button onClick={handleStop}>Stop</button> */}
      </div>
    </div>
  );
}
