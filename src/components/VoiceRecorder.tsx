"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useStore } from "@/store/store";
import { Quote } from "@/types/types";

// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right,
// }

// const DIRECTION = { UP: "UP", DOWN: "DOWN", left: 2, right: 3}

// DIRECTION.UP

// const baseBtn = "w-full sm:w-auto px-4 py-2 rounded transition text-white";

enum BtnType {
  Blue,
  Green,
  Red,
}

// pure function
const initBtnClasses = (btnType: BtnType): string => {
  const baseBtn =
    "w-full sm:w-auto px-6 py-3 m-3 rounded transition text-white";
  const blueBtn = "bg-blue-500 hover:bg-blue-600";
  const greenBtn = "bg-green-500 hover:bg-green-600";
  const redBtn = "bg-red-500 hover:bg-red-600";

  let specificBtn = " ";

  switch (btnType) {
    case BtnType.Blue:
      specificBtn += blueBtn;
      break;

    case BtnType.Green:
      specificBtn += greenBtn;
      break;

    case BtnType.Red:
      specificBtn += redBtn;
      break;
  }

  return baseBtn + specificBtn;
};

// prosty test jednostkowy dla funkcji
// initBtnClasses(BtnType.Blue) == "w-full sm:w-auto px-4 py-2 rounded transition text-white bg-blue-500 hover:bg-blue-600" // true

// Dynamically import ReactMic (avoids SSR)
const ReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  {
    ssr: false,
  }
);

function VoiceCounter() {
  const { voices, toggleAcceptance, currentQuoteId } = useStore();

  return (
    <div>
      <h1 className="text-center text-lg font-semibold mb-4">
        {voices.length} Voice{voices.length !== 1 ? "s" : ""} Recorded
      </h1>

      <div className="flex flex-col gap-4">
        {voices
          .filter((v) => v.quoteId == currentQuoteId)
          .map((v) => {
            return (
              <div
                key={v.id}
                className="flex flex-col md:flex-row items-center bg-white shadow p-4 rounded-lg"
              >
                <div className="flex-1 w-full">
                  <h3 className="text-md font-semibold mb-2">
                    Playback #{v.id}
                  </h3>
                  <audio
                    controls
                    src={URL.createObjectURL(v.blob)}
                    className="w-full"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto text-center">
                  <button
                    className={`w-full md:w-auto px-4 py-2 rounded ${
                      v.isAccepted ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                    onClick={() => toggleAcceptance(v.id)}
                  >
                    {v.isAccepted ? "Accepted" : "Not Accepted"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const VoiceRecorder = () => {
  const { addVoice, quotes, currentQuoteId, nextQuote, prevQuote } = useStore();
  const [recording, setRecording] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<Quote | undefined>(
    undefined
  );
  const [quoteUrl, setQuoteUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCurrentQuote(() => quotes.find((q) => q.id == currentQuoteId));
  }, [currentQuoteId, quotes]);

  useEffect(() => {
    if (audioRef.current && currentQuote) {
      onQuoteChange(currentQuote.url);
    }
  }, [currentQuote]);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);
  const onStop = (recordedBlob: { blob: Blob }) => addVoice(recordedBlob.blob);
  const onQuoteChange = (newQuoteUrl: string) => {
    setQuoteUrl(newQuoteUrl);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
      }
    }, 0); // delay to ensure state is updated before DOM interaction
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-20 p-4 bg-slate-100 border rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Voice Recorder</h2>

      <VoiceCounter />

      <ReactMic
        className="w-full m-2 p-2 rounded-lg bg-gray-200"
        record={recording}
        onStop={onStop}
        mimeType="audio/wav"
        strokeColor="#FF0000"
        backgroundColor="#E0E0E0"
      />

      {currentQuote ? (
        <>
          <div className="flex-row sm:flex-row justify-center items-center gap-4 mt-4">
            <h2 className="text-xl font-bold">{currentQuote.name}</h2>
            <blockquote className="border-2 border-gray-500 rounded-lg m-2 p-2 max-w-full sm:max-w-2xl lg:max-w-4xl">
              {currentQuote.text}
              <audio controls ref={audioRef}>
                {audioRef ? (
                  <source src={quoteUrl} type="audio/mpeg" />
                ) : (
                  <p>Loading audio...</p>
                )}
                Your browser does not support the audio element.
              </audio>
            </blockquote>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              // className={`${baseBtn} bg-blue-500 rounded hover:bg-blue-600`}
              // className={baseBtn + " bg-blue-500 rounded hover:bg-blue-600"}
              // className={initBtnClasses("bg-blue-500 rounded hover:bg-blue-600")}
              className={initBtnClasses(BtnType.Blue)}
              onClick={() => {
                prevQuote();
                onQuoteChange(currentQuote.url);
              }}
              disabled={currentQuoteId === 1}
            >
              Previous Quote
            </button>

            <button
              // className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              className={initBtnClasses(BtnType.Blue)}
              onClick={() => {
                nextQuote();
                onQuoteChange(currentQuote.url);
              }}
              disabled={currentQuoteId === quotes.length}
            >
              Next Quote
            </button>
          </div>
          <div>
            <p className="text-2xl font-bold">Record plerase your sentence!</p>
            <button
              // className="w-full sm:w-auto px-6 py-3 m-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
              className={initBtnClasses(BtnType.Green)}
              onClick={startRecording}
              disabled={recording}
            >
              Start Recording
            </button>
            <button
              // className="w-full sm:w-auto px-6 py-3 m-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
              className={initBtnClasses(BtnType.Red)}
              onClick={stopRecording}
              disabled={!recording}
            >
              Stop Recording
            </button>
          </div>
        </>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
};

export default VoiceRecorder;
