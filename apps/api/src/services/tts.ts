import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import readline from "readline";
// var readline = require("readline");
const tts = () => {
  // "use strict";

  // var sdk = require("microsoft-cognitiveservices-speech-sdk");
  // import ;
  const AZURE_SPEECH_SERVICE_KEY =
    process.env.AZURE_SPEECH_SERVICE_KEY || "6843c593038644ba8d2c9468f4028b4a";
  const AZURE_SPEECH_SERVICE_REGION =
    process.env.AZURE_SPEECH_REGION || "centralindia";
  if (!AZURE_SPEECH_SERVICE_KEY || !AZURE_SPEECH_SERVICE_REGION) {
    throw new Error(
      "AZURE_SPEECH_SERVICE_KEY or AZURE_SPEECH_REGION is not defined"
    );
  }

  var audioFile = "/mnt/hdd2/ryuk/apps/api/uploads/1709760062002.webm";
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    AZURE_SPEECH_SERVICE_KEY,
    AZURE_SPEECH_SERVICE_REGION
  );

  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

  speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter some text that you want to speak >\n> ", function (text) {
    rl.close();
    // Start the synthesizer and wait for a result.
    synthesizer.speakTextAsync(
      text,
      function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error(
            "Speech synthesis canceled, " +
              result.errorDetails +
              "\nDid you set the speech resource key and region values?"
          );
        }
        synthesizer.close();
        // synthesizer = null;
      },
      function (err) {
        console.trace("err - " + err);
        synthesizer.close();
        // synthesizer = null;
      }
    );
    console.log("Now synthesizing to: " + audioFile);
  });
};
tts();
